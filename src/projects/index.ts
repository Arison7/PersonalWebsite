import type { ComponentType } from 'react'
import Muzeyt from './muzeyt'
import CrsfFuzzer from './crsf-fuzzer'
import MessagerApi from './messager-api'
import CCompiler from './c-compiler'
import GreenBridge from './green-bridge'
import PersonalWebsite from './personal-website'

// content for work: internship and projects, shared by the Work collage and
// each project's own page (/work/<slug>). ProjectPage is the template; each
// project's write-up lives in its own file next to this one (<slug>.tsx).
// Lorem ipsum and picsum.photos placeholders until the real text and images exist.

export type Project = {
  // the project's URL segment
  slug: string
  title: string
  description: string
  image: string
  // short mono line: stack, dates, role
  meta: string
  // the write-up under the title, in the page's reading column
  Body: ComponentType
}

const real: Project[] = [
  {
    slug: 'muzeyt',
    title: 'Muzeyt',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    image: 'https://picsum.photos/seed/work1/1200/900',
    meta: 'lorem · ipsum',
    Body: Muzeyt,
  },
  // internship
  {
    slug: 'crsf-fuzzer',
    title: 'CRSF fuzzer',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    image: 'https://picsum.photos/seed/work2/1200/900',
    meta: 'lorem · ipsum',
    Body: CrsfFuzzer,
  },
  {
    slug: 'messager-api',
    title: 'MessagerApi',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: 'https://picsum.photos/seed/work3/1200/900',
    meta: 'lorem · ipsum',
    Body: MessagerApi,
  },
  {
    slug: 'c-compiler',
    title: 'C compiler in Rust',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
    image: 'https://picsum.photos/seed/work4/1200/900',
    meta: 'lorem · ipsum',
    Body: CCompiler,
  },
  {
    slug: 'green-bridge',
    title: 'Green Bridge',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    image: 'https://picsum.photos/seed/work5/1200/900',
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

// TEMP: pad to 10 to test the collage's row layout; each gets its own slug so
// every block still has a page
export const projects: Project[] = Array.from({ length: 10 }, (_, i) =>
  real[i] ?? { ...real[i % real.length], slug: `lorem-${i + 1}`, title: `Lorem ${i + 1}` },
)

// Shared by the collage block's image and the project page's hero, so the
// browser morphs one into the other on navigation (View Transitions).
export function imageTransitionName(slug: string) {
  return `project-image-${slug}`
}
