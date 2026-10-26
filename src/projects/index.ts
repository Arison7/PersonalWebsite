import type { ComponentType } from 'react'
import Muzeyt from './muzeyt'
import CrsfFuzzer from './crsf-fuzzer'
import MessagerApi from './messager-api'
import Leetcode from './leetcode'
import CCompiler from './c-compiler'
import GreenBridge from './green-bridge'
import PersonalWebsite from './personal-website'
// TODO: upscale the images. Most covers are only 768–1053px wide, but the hero
// shows them up to 1280px (2560px on a 2x screen) and the build never enlarges.
import muzeytCover from './muzeyt/cover.png?cover'
import crsfFuzzerCover from './crsf-fuzzer/cover.webp?cover'
import messagerApiCover from './messager-api/cover.png?cover'
import cCompilerCover from './c-compiler/cover.png?cover'
import greenBridgeCover from './green-bridge/cover.png?cover'

// content for work: internship and projects, shared by the Work collage and
// each project's own page (/work/<slug>). ProjectPage is the template; each
// project has its own folder next to this one (<slug>/): the write-up in
// index.tsx, its cover and any images it shows alongside.
// Lorem ipsum until the real text exists; picsum.photos where there's no cover yet.

export type Project = {
  // the project's URL segment
  slug: string
  title: string
  description: string
  image: string
  // short mono line: stack, dates, role
  meta: string
  // optional link to the source; shown with a GitHub icon when it's on GitHub
  source?: string
  // the write-up under the title, in the page's reading column
  Body: ComponentType
}

export const projects: Project[] = [
  {
    slug: 'muzeyt',
    title: 'Muzeyt',
    description: 'A terminal music player in Rust, built around async message passing.',
    image: muzeytCover,
    meta: 'Rust · Tokio · ratatui · 2025',
    source: 'https://github.com/Arison7/muzeyt',
    Body: Muzeyt,
  },
  // internship
  {
    slug: 'crsf-fuzzer',
    title: 'CRSF fuzzer',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    image: crsfFuzzerCover,
    meta: 'lorem · ipsum',
    Body: CrsfFuzzer,
  },
  {
    slug: 'messager-api',
    title: 'MessagerApi',
    description: 'A real-time chat app with a Django back end and a React front end.',
    image: messagerApiCover,
    meta: 'Django · Channels · React · TypeScript · 2022–2023',
    source: 'https://github.com/Arison7/MessagerApi',
    Body: MessagerApi,
  },
  {
    slug: 'leetcode',
    title: 'LeetCode',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.',
    image: 'https://picsum.photos/seed/work7/1200/900',
    meta: 'lorem · ipsum',
    Body: Leetcode,
  },
  {
    slug: 'c-compiler',
    title: 'C compiler in Rust',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
    image: cCompilerCover,
    meta: 'lorem · ipsum',
    Body: CCompiler,
  },
  {
    slug: 'green-bridge',
    title: 'Green Bridge',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    image: greenBridgeCover,
    meta: 'lorem · ipsum',
    Body: GreenBridge,
  },
  {
    slug: 'personal-website',
    title: 'Personal website',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    image: 'https://picsum.photos/seed/work6/1200/900',
    meta: 'lorem · ipsum',
    Body: PersonalWebsite,
  },
]

// Shared by the collage block's image and the project page's hero, so the
// browser morphs one into the other on navigation (View Transitions).
export function imageTransitionName(slug: string) {
  return `project-image-${slug}`
}
