import { hobbies } from './hobbies'
import { projects } from './projects'
import photoLight from './assets/photo-light.webp'
import photoDark from './assets/photo-dark.webp'

// Only the active page is mounted, so the browser would fetch another page's
// images only once you switch to it. This downloads and decodes them ahead of
// time instead; the page's own <img> then gets them straight from the cache.
// A local asset import is just its URL (/assets/name-<hash>.webp), so local
// files and remote placeholders go through the same path.

const started = new Set<string>()

// A couple at a time, so it never crowds out what the current page still needs.
export function preloadImages(urls: string[], concurrency = 2) {
  const queue = urls.filter((url) => !started.has(url))
  queue.forEach((url) => started.add(url))

  const next = (): Promise<void> => {
    const url = queue.shift()
    if (!url) return Promise.resolve()
    const img = new Image()
    img.src = url
    // a broken image just gets skipped; the page shows its own fallback
    return img.decode().catch(() => {}).then(next)
  }
  for (let i = 0; i < concurrency; i++) next()
}

// Every page's images; only the bio photo that matches the colour scheme.
export function allPageImages() {
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const urls = [
    dark ? photoDark : photoLight,
    ...hobbies.map((item) => item.image),
    ...projects.map((project) => project.image),
  ]
  return [...new Set(urls.filter((url): url is string => !!url))]
}
