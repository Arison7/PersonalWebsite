import type { CollageItem } from '../types'
import { imageTransitionName, projects } from '../projects'
import Collage from './Collage'

// Each block opens the project's own page.
const items: CollageItem[] = projects.map((project) => ({
  title: project.title,
  description: project.description,
  image: project.image,
  meta: project.meta,
  link: `/work/${project.slug}`,
  imageTransitionName: imageTransitionName(project.slug),
}))

function Work() {
  return <Collage items={items} />
}

export default Work
