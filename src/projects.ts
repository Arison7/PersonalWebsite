// content for work: internship and projects, shared by the Work collage and
// each project's own page (/work/<slug>).
// Lorem ipsum and picsum.photos placeholders until the real text and images exist.

export type Project = {
  // the project's URL segment
  slug: string
  title: string
  description: string
  image: string
  // short mono line: stack, dates, role
  meta: string
}

const real: Project[] = [
  // internship
  {
    slug: 'lorem-ipsum',
    title: 'Lorem ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    image: 'https://picsum.photos/seed/work1/1200/900',
    meta: 'lorem · ipsum · YYYY',
  },
  {
    slug: 'dolor-sit',
    title: 'Dolor sit',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: 'https://picsum.photos/seed/work2/1200/900',
    meta: 'lorem · ipsum',
  },
  {
    slug: 'amet-consectetur',
    title: 'Amet consectetur',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    image: 'https://picsum.photos/seed/work3/1200/900',
    meta: 'lorem · ipsum',
  },
  {
    slug: 'adipiscing-elit',
    title: 'Adipiscing elit',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    image: 'https://picsum.photos/seed/work4/1200/900',
    meta: 'lorem · ipsum',
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
