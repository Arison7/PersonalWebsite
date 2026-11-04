import type { ComponentType } from 'react'
import { pagePaths } from './hooks/usePage'
import type { CollageItem, Page } from './types'

// A post is a collage block with its own page (/<page>/<slug>): a project on
// Work, an interest on Interests. Both share the PostPage template; each post
// has its own folder (src/projects/<slug>/, src/interests/<slug>/) with the
// write-up in index.tsx, its cover and any images it shows alongside.

export type Post = {
  // the post's URL segment
  slug: string
  title: string
  description: string
  image: string
  // short mono line: stack, dates, role
  meta?: string
  // optional main link: the source, a profile, a website or a PDF in public/;
  // GitHub, LeetCode and PDFs get their own icon
  source?: string
  // the link's text, when the default for its kind doesn't say enough
  sourceLabel?: string
  // the write-up under the title, in the page's reading column
  Body: ComponentType
}

// Shared by the collage block's image and the post page's hero, so the
// browser morphs one into the other on navigation (View Transitions).
export function imageTransitionName(page: Page, slug: string) {
  return `${page}-image-${slug}`
}

// Each block opens the post's own page.
export function toCollageItems(page: Page, posts: Post[]): CollageItem[] {
  return posts.map((post) => ({
    title: post.title,
    description: post.description,
    image: post.image,
    meta: post.meta,
    link: `${pagePaths[page]}/${post.slug}`,
    imageTransitionName: imageTransitionName(page, post.slug),
  }))
}
