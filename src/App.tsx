import { ScrollRestoration } from 'react-router-dom'
import { Page } from './types'
import { usePage } from './hooks/usePage'
import { VimProvider } from './context/VimContext'
import Header from './components/Header'
import Content from './components/Content'
import KeysDialog from './components/KeysDialog'
import KeysCorner from './components/KeysCorner'

// Layout around every route; the page itself is the router's <Outlet /> in
// Content. Only the active page is mounted, so switching away discards that
// page's own state (useState, animation progress). If a page should come back
// exactly as it was left, lift that state up here.

function App() {
  const { activePage, subpage } = usePage()

  return (
    // inside the router: h / l switch pages by navigating
    <VimProvider>
      {/* subpages (a project) bring their own header */}
      {activePage !== Page.Bio && !subpage && <Header />}

      <Content />

      <KeysCorner />
      <KeysDialog />

      {/* new page starts at the top; back / forward restore where you were */}
      <ScrollRestoration />
    </VimProvider>
  )
}

export default App
