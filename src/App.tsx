import { Page } from './types'
import { usePage } from './context/PageContext'
import Header from './components/Header'
import Content from './components/Content'
import Bio from './components/Bio'
import Hobbies from './components/Hobbies'
import Projects from './components/Projects'

function App() {
  const { activePage } = usePage()

  return (
    <>
      <Header />

      <Content>
        {/* Only the active page is mounted — the others aren't in the tree.
            TODO: they're all still in the main bundle though (static imports).
            When the collage has real weight, split them with
            lazy(() => import('./components/Hobbies')) + <Suspense>, then warm
            the chunks in a useEffect after first paint so switching stays
            instant. Images will need their own prefetch, separately.
            TODO: unmounting discards a page's own state — useState, form
            inputs, animation progress. If a page should come back exactly as
            it was left, move that state into PageContext or render all three
            and toggle CSS visibility instead.
            Scroll is a separate question and depends on the scroller: window
            scroll isn't lost on unmount, it just carries over to the next page
            (so it may need an explicit reset), whereas an inner
            overflow:auto div loses its scrollTop with the element. */}
        {activePage === Page.Bio && <Bio />}
        {activePage === Page.Hobbies && <Hobbies />}
        {activePage === Page.Projects && <Projects />}
      </Content>
    </>
  )
}

export default App
