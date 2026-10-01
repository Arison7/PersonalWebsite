import type { ReactNode } from 'react'

// Page links along the bottom on phones and tablets, the same on every page so
// the navigation never moves. Each side holds the link that leads that way.
// Hidden on desktop, where each page puts its links in its own layout.

type BottomBarProps = {
  left?: ReactNode
  right?: ReactNode
}

function BottomBar({ left, right }: BottomBarProps) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 grid grid-cols-2 border-t border-line bg-paper lg:hidden">
      {/* links fill their half, centred, like bio's */}
      <div className="flex *:w-full *:justify-center">{left}</div>
      <div className="flex *:w-full *:justify-center">{right}</div>
    </nav>
  )
}

export default BottomBar
