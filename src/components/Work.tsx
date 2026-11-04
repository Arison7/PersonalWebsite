import { projects } from '../projects'
import { toCollageItems } from '../posts'
import { Page } from '../types'
import Collage from './Collage'

const items = toCollageItems(Page.Work, projects)

function Work() {
  return <Collage items={items} />
}

export default Work
