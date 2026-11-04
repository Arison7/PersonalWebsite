import { interests } from '../interests'
import { toCollageItems } from '../posts'
import { Page } from '../types'
import Collage from './Collage'
import InterestsGreeting from './InterestsGreeting'

const items = toCollageItems(Page.Interests, interests)

function Interests() {
  return (
    <>
      <Collage items={items} />
      <InterestsGreeting />
    </>
  )
}

export default Interests
