import { Page } from '../types'
import { usePage } from '../hooks/usePage'
import { useVim } from '../context/VimContext'
import Kbd from './Kbd'
import BottomBar from './BottomBar'

// Not used on the bio page (it has its own side links).
// Shows the page title and a way back to bio, on the side bio sits on: in the
// header on desktop, in the bottom bar on phones (where bio has its links too).

function Header() {
  const { activePage, setActivePage } = usePage()
  const { enabled } = useVim()
  const bioOnLeft = activePage === Page.Hobbies
  const title = activePage === Page.Hobbies ? 'Hobbies' : 'Work'

  const back = (className: string) => (
    <button
      type="button"
      onClick={() => setActivePage(Page.Bio)}
      className={`min-h-11 items-center gap-2.5 font-mono text-sm text-ink hover:text-accent ${className}`}
    >
      {bioOnLeft ? '← Bio' : 'Bio →'}
      {/* key hints only where there's likely a keyboard */}
      {enabled && <Kbd className="hidden lg:inline">{bioOnLeft ? 'h' : 'l'}</Kbd>}
    </button>
  )

  return (
    <>
      <header className="mx-auto grid w-full max-w-[1360px] grid-cols-[1fr_auto_1fr] items-center px-6 py-6 lg:px-10 lg:pt-10 lg:pb-8">
        <div>{bioOnLeft && back('hidden lg:flex')}</div>
        <h1 className="text-2xl font-semibold lg:text-[30px]">{title}</h1>
        <div className="flex justify-end">{!bioOnLeft && back('hidden lg:flex')}</div>
      </header>

      <BottomBar
        left={bioOnLeft && back('flex px-2.5 py-3')}
        right={!bioOnLeft && back('flex px-2.5 py-3')}
      />
    </>
  )
}

export default Header
