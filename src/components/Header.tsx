import { Page } from '../types'
import { usePage } from '../context/PageContext'

// Not used on the bio page (it has its own side links).
// Shows the page title and a way back to bio, on the side bio sits on.

function Header() {
  const { activePage, setActivePage } = usePage()
  const bioOnLeft = activePage === Page.Hobbies
  const title = activePage === Page.Hobbies ? 'Hobbies' : 'Work'

  const back = (
    <button
      type="button"
      onClick={() => setActivePage(Page.Bio)}
      className="flex min-h-11 items-center font-mono text-sm text-ink hover:text-accent"
    >
      {bioOnLeft ? '← Bio' : 'Bio →'}
    </button>
  )

  return (
    <header className="mx-auto grid w-full max-w-[1360px] grid-cols-[1fr_auto_1fr] items-center px-6 py-6 lg:px-10 lg:pt-10 lg:pb-8">
      <div>{bioOnLeft && back}</div>
      <h1 className="text-2xl font-semibold lg:text-[30px]">{title}</h1>
      <div className="flex justify-end">{!bioOnLeft && back}</div>
    </header>
  )
}

export default Header
