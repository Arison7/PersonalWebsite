import type { ReactNode } from 'react'

// Both navigations are part of this section.
// This is where the changes happen during navigation — whatever is passed as
// children is the swappable part. Later this becomes the route layout and
// children gets replaced by react-router's <Outlet />.

type ContentProps = {
  children?: ReactNode
}

function Content({ children }: ContentProps) {
  return (
    // grows to fill the viewport so the collage can size its rows to it
    <section className="flex flex-1 flex-col">

      {/* swappable */}
      {children}

    </section>
  )
}

export default Content
