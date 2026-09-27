import { createContext, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Page } from '../types'

// Tracks which page is active. Any component, at any depth, can read the
// current page or change it via usePage() — no prop drilling needed.

type PageContextValue = {
  activePage: Page
  setActivePage: (page: Page) => void
}

const PageContext = createContext<PageContextValue>({
  activePage: Page.Bio,
  setActivePage: () => {},
})

type PageProviderProps = {
  children?: ReactNode
}

export function PageProvider({ children }: PageProviderProps) {
  const [activePage, setActivePage] = useState<Page>(Page.Bio)

  // Memoised so consumers don't re-render on an unrelated parent render.
  const value = useMemo(() => ({ activePage, setActivePage }), [activePage])

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>
}

export function usePage() {
  return useContext(PageContext)
}
