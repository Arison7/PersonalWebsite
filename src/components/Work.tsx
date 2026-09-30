import type { CollageItem } from '../types'
import Collage from './Collage'

// content for work: internship and projects
// Lorem ipsum and picsum.photos placeholders until the real text and images exist.

const items: CollageItem[] = [
  // internship
  {
    title: 'Lorem ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    image: 'https://picsum.photos/seed/work1/1200/900',
    meta: 'lorem · ipsum · YYYY',
  },
  {
    title: 'Dolor sit',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: 'https://picsum.photos/seed/work2/1200/900',
    meta: 'lorem · ipsum',
  },
  {
    title: 'Amet consectetur',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    image: 'https://picsum.photos/seed/work3/1200/900',
    meta: 'lorem · ipsum',
  },
  {
    title: 'Adipiscing elit',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    image: 'https://picsum.photos/seed/work4/1200/900',
    meta: 'lorem · ipsum',
  },
]

// TEMP: pad to 10 blocks to test the row layout
const testItems: CollageItem[] = Array.from({ length: 10 }, (_, i) =>
  items[i] ?? { ...items[i % items.length], title: `Lorem ${i + 1}` },
)

function Work() {
  return <Collage items={testItems} />
}

export default Work
