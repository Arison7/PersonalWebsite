import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Page } from '../types'

// The URL is the active page, so it survives a refresh and back / forward
// work. Any component, at any depth, can read the current page or change it
// via usePage() — no prop drilling needed.

export const pagePaths: Record<Page, string> = {
  [Page.Bio]: '/',
  [Page.Hobbies]: '/hobbies',
  [Page.Work]: '/work',
}

export function usePage() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  // a page's subpages count as that page (/work/<slug> is Work); unknown
  // paths are redirected to bio by the router, so bio until then
  const activePage =
    (Object.keys(pagePaths) as Page[]).find(
      (page) => pathname === pagePaths[page] || pathname.startsWith(`${pagePaths[page]}/`),
    ) ?? Page.Bio
  // on a page's subpage rather than the page itself
  const subpage = pathname !== pagePaths[activePage]

  const setActivePage = useCallback((page: Page) => navigate(pagePaths[page]), [navigate])

  return { activePage, subpage, setActivePage }
}
