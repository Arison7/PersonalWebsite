import type { CollageItem } from '../types'
import Collage from './Collage'

// content for hobbies
// Lorem ipsum and picsum.photos placeholders until the real text and images exist.

const items: CollageItem[] = [
  {
    title: 'Lorem ipsum',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    image: 'https://picsum.photos/seed/hobby1/1200/900',
  },
  {
    title: 'Dolor sit',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: 'https://picsum.photos/seed/hobby2/1200/900',
  },
  {
    title: 'Amet consectetur',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    image: 'https://picsum.photos/seed/hobby3/1200/900',
  },
]

function Hobbies() {
  return <Collage items={items} />
}

export default Hobbies
