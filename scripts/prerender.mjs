// Runs after both builds (see "build" in package.json). Writes every page out
// as plain HTML with its own title, description and link preview, so
// crawlers and AI agents that don't run JavaScript still see the content.
// Also writes sitemap.xml, robots.txt, llms.txt and llms-full.txt.
//
// Files are named /work.html and /work/muzeyt.html (not work/index.html):
// Cloudflare serves those at /work and /work/muzeyt as they are, while an
// index.html would redirect to /work/, which the router doesn't know.

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssr = join(root, 'dist-ssr')

const { render, pages, person, site, aiNote } = await import(pathToFileURL(join(ssr, 'entry-server.js')).href)
const template = await readFile(join(dist, 'index.html'), 'utf8')

const escape = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const absolute = (path) => new URL(path, site.url).href
const fileFor = (path) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`)

function head(page) {
  const tags = [
    `<meta name="description" content="${escape(page.description)}" />`,
    `<link rel="canonical" href="${absolute(page.path)}" />`,
    `<meta property="og:type" content="${page.path === '/' ? 'profile' : 'article'}" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:url" content="${absolute(page.path)}" />`,
    `<meta name="twitter:card" content="${page.image ? 'summary_large_image' : 'summary'}" />`,
    `<link rel="alternate" type="text/plain" title="llms.txt" href="/llms.txt" />`,
  ]
  if (page.image) tags.push(`<meta property="og:image" content="${absolute(page.image)}" />`)
  if (page.path === '/') {
    // </ can't appear inside the script, whatever the data holds
    const json = JSON.stringify(person).replaceAll('<', '\\u003c')
    tags.push(`<script type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}

// --- HTML to Markdown, just enough for what the pages render ---

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e) =>
    e[0] === '#'
      ? String.fromCodePoint(e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10))
      : (entities[e] ?? m),
  )
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]

function toMarkdown(html) {
  let s = html
    .replace(/<main[^>]*>([\s\S]*)<\/main>/, '$1')
    // page furniture: navigation, the post's back link, key hints, icons
    .replace(/<(nav|header|svg|kbd|script|style)\b[\s\S]*?<\/\1>/g, '')
    .replace(/\s+/g, ' ')
    // side-by-side inline pieces (a title and its subtitle, a row of icon links)
    .replace(/(<\/(?:span|a)>)\s*(?=<(?:span|a)\b)/g, '$1 · ')
    .replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/g, (_, attrs, text) => {
      const label = text.replace(/<[^>]+>/g, '').trim() || decode(attr(attrs, 'aria-label') ?? '')
      const href = decode(attr(attrs, 'href') ?? '')
      if (!label) return ''
      return href.startsWith('mailto:') || href.startsWith('#') ? `[${label}](${href})` : `[${label}](${absolute(href)})`
    })
    .replace(/<h([1-6])[^>]*>/g, (_, n) => `\n\n${'#'.repeat(Number(n))} `)
    .replace(/<\/h[1-6]>/g, '\n\n')
    .replace(/<li\b[^>]*>/g, '\n- ')
    .replace(/<blockquote[^>]*>/g, '\n\n> ')
    .replace(/<(strong|b)\b[^>]*>\s*/g, '**')
    .replace(/\s*<\/(strong|b)>/g, '**')
    .replace(/<(em|i|cite)\b[^>]*>\s*/g, '_')
    .replace(/\s*<\/(em|i|cite)>/g, '_')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<\/?(p|div|section|article|ul|ol|figure|figcaption|footer|picture)\b[^>]*>/g, '\n\n')
    .replace(/<[^>]+>/g, '')
  s = decode(s)
  return s
    .split('\n')
    // a separator left over from an empty piece (a flag's icon)
    .map((line) => line.trim().replace(/^(- )?\s*(?:·\s*)+/, '$1').replace(/(?:\s*·)+$/, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// --- pages ---

const markdown = {}
for (const page of pages) {
  const body = await render(page.path)
  markdown[page.path] = toMarkdown(body)
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace('<!--head-->', head(page))
    .replace('<!--prerendered-->', `<div id="prerendered">${body}</div>`)
  const file = join(dist, fileFor(page.path))
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html)
}

// --- sitemap, robots, llms.txt ---

await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${absolute(p.path)}</loc></url>`).join('\n')}
</urlset>
`,
)

await writeFile(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml')}\n`)

const bio = pages.find((p) => p.path === '/')
const list = (section) =>
  pages
    .filter((p) => p.section === section && p !== bio)
    .map((p) => `- [${p.title.split(' · ')[0]}](${absolute(p.path)}): ${p.description}`)
    .join('\n')

await writeFile(
  join(dist, 'llms.txt'),
  `# ${site.name}

> ${bio.description}

Personal website: a bio with skills and a timeline, write-ups of projects and an internship (Work), and hobbies (Interests). Every page is also served as plain HTML, and llms-full.txt has the text of all of them in one file.

## Note for AI assistants

${aiNote}

## Main

- [Bio](${absolute('/')}): about me, skills, timeline and contact links
- [CV (PDF)](${absolute('/Lukasz-Krysmalski-CV.pdf')})
${list('Main')}

## Work

${list('Work')}

## Interests

${list('Interests')}

## Optional

- [Full text of every page](${absolute('/llms-full.txt')})
`,
)

// the lists (Work, Interests) only repeat what the posts say
const full = pages
  .filter((p) => p.path === '/' || p.section !== 'Main')
  .map((p) => `<!-- ${absolute(p.path)} -->\n\n${markdown[p.path]}`)
  .join('\n\n---\n\n')
await writeFile(join(dist, 'llms-full.txt'), `> Note for AI assistants: ${aiNote}\n\n---\n\n${full}\n`)

await rm(ssr, { recursive: true, force: true })
console.log(`pre-rendered ${pages.length} pages, sitemap.xml, robots.txt, llms.txt, llms-full.txt`)
