import { Outlet } from 'react-router-dom'

// Both navigations are part of this section.
// This is where the changes happen during navigation — the router renders the
// active page into the <Outlet />, the swappable part.

function Content() {
  return (
    // grows to fill the viewport so the collage can size its rows to it
    <section className="flex flex-1 flex-col">

      {/* swappable */}
      <Outlet />

    </section>
  )
}

export default Content
