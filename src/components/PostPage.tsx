import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { imageTransitionName } from '../posts'
import type { Post } from '../posts'
import { pagePaths } from '../hooks/usePage'
import { Page } from '../types'
import { useVim, useVimBindings } from '../context/VimContext'
import Kbd from './Kbd'
import BottomBar from './BottomBar'
import LoadingImage from './LoadingImage'
import { FaArrowUpRightFromSquare, FaGithub, FaRegFileLines } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import type { IconType } from 'react-icons'

// The template every post's page shares (a project or an interest), written
// up blog style: the image from its collage block as the hero (it morphs over
// from the block), then a single reading column. What goes in the column is
// the post's own Body (src/<projects|interests>/<slug>/index.tsx); its plain
// <p> and <h2> are styled here.

// styles the Body's own elements, so a write-up stays plain markup
const prose =
  'flex flex-col gap-5 pt-4 text-[17px] leading-[1.7] lg:text-[19px] [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-semibold lg:[&_h2]:text-[28px] [&_h3]:text-xl [&_h3]:font-semibold lg:[&_h3]:text-[22px] ' +
  // a <blockquote>: the quote in italics behind an accent rule, a <footer> under it for who said it
  '[&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-5 [&_blockquote]:text-xl [&_blockquote]:italic lg:[&_blockquote]:text-[22px] ' +
  '[&_blockquote_footer]:mt-2 [&_blockquote_footer]:font-mono [&_blockquote_footer]:text-sm [&_blockquote_footer]:text-muted [&_blockquote_footer]:not-italic ' +
  // an <a> in the text: underlined in the accent, so it reads as a link
  '[&_a]:underline [&_a]:decoration-accent [&_a]:underline-offset-4 [&_a:hover]:text-accent ' +
  // a <ul>: bullets in the accent, a little space between items
  '[&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6 [&_li]:marker:text-accent'

const back = 'flex min-h-11 items-center gap-2.5 px-2.5 font-mono text-sm text-ink hover:text-accent'

// sites a post's link may point at, with their own icon and label;
// anywhere else is a website, with a generic external-link icon
const sites: Record<string, { Icon: IconType; label: string }> = {
  'github.com': { Icon: FaGithub, label: 'View on GitHub' },
  'leetcode.com': { Icon: SiLeetcode, label: 'View on LeetCode' },
}

function SourceLink({ href, label: customLabel }: { href: string; label?: string }) {
  // a path like /file.pdf is resolved against this site
  const url = new URL(href, window.location.origin)
  const { Icon, label } = url.pathname.endsWith('.pdf')
    ? { Icon: FaRegFileLines, label: 'Download PDF' }
    : (sites[url.hostname] ?? { Icon: FaArrowUpRightFromSquare, label: 'Visit website' })
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="-mx-2.5 flex min-h-11 items-center gap-2 px-2.5 font-mono text-[13px] text-ink hover:text-accent"
    >
      <Icon aria-hidden="true" className="size-4" />
      {customLabel ?? label}
    </a>
  )
}

// the pages that have posts, as their back links name them
type PostsPage = Page.Work | Page.Interests
const labels: Record<PostsPage, string> = {
  [Page.Work]: 'Work',
  [Page.Interests]: 'Interests',
}

type PostPageProps = {
  // the page the post belongs to: back links and h lead there
  page: PostsPage
  posts: Post[]
}

function PostPage({ page, posts }: PostPageProps) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { enabled } = useVim()

  const index = posts.findIndex((p) => p.slug === slug)
  const post = posts[index]
  const parent = pagePaths[page]
  const label = labels[page]

  // h goes back up to the parent page; l has nowhere to go from here
  useVimBindings({
    h: () => navigate(parent, { viewTransition: true }),
    l: () => {},
  })

  if (!post) return <Navigate to={parent} replace />

  const number = String(index + 1).padStart(2, '0')

  return (
    <>
      <header className="mx-auto w-full max-w-[1360px] px-6 py-6 lg:px-10 lg:pt-10 lg:pb-8">
        <Link to={parent} viewTransition className={`${back} hidden -ml-2.5 w-fit lg:flex`}>
          ← {label}
          {enabled && <Kbd>h</Kbd>}
        </Link>
      </header>

      <article className="pb-24 lg:pb-20">
        <LoadingImage
          src={post.image}
          alt=""
          style={{ viewTransitionName: imageTransitionName(page, post.slug) }}
          className="mx-auto aspect-[4/3] w-full max-w-[1280px] object-cover lg:aspect-[2/1] lg:w-[calc(100%-80px)]"
        />

        <div className="mx-auto flex max-w-[720px] flex-col gap-4 px-6 pt-8 lg:px-0 lg:pt-14">
          <span className="font-mono text-sm text-accent">{number}</span>
          <h1 className="text-[40px] leading-[1.05] font-semibold lg:text-[56px] lg:tracking-[-0.01em]">
            {post.title}
          </h1>
          <p className="text-lg leading-[1.55] lg:text-[21px]">{post.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line pb-6">
            {post.meta && <span className="font-mono text-[13px] text-muted">{post.meta}</span>}
            {post.source && <SourceLink href={post.source} label={post.sourceLabel} />}
          </div>

          <div className={prose}>
            <post.Body />
          </div>

          <Link to={parent} viewTransition className={`${back} -ml-2.5 mt-10 hidden w-fit lg:flex`}>
            ← all {label.toLowerCase()}
          </Link>
        </div>
      </article>

      <BottomBar
        left={
          <Link to={parent} viewTransition className={back}>
            ← {label}
          </Link>
        }
      />
    </>
  )
}

export default PostPage
