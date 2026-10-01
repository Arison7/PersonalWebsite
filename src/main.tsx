import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Bio from './components/Bio.tsx'
import Hobbies from './components/Hobbies.tsx'
import Work from './components/Work.tsx'
import ProjectPage from './components/ProjectPage.tsx'
import { pagePaths } from './hooks/usePage.ts'
import { Page } from './types.ts'

// Still a single page app: the router swaps pages client-side, the URL just
// records which one is showing. The host has to answer every path with
// index.html (Vite's dev and preview servers already do).
//
// TODO: every page is in the main bundle (static imports). When the collage
// has real weight, make these lazy routes (`lazy: () => import(...)`) and warm
// the chunks after first paint so switching stays instant. Images will need
// their own prefetch, separately.
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: pagePaths[Page.Bio], element: <Bio /> },
      { path: pagePaths[Page.Hobbies], element: <Hobbies /> },
      { path: pagePaths[Page.Work], element: <Work /> },
      { path: `${pagePaths[Page.Work]}/:slug`, element: <ProjectPage /> },
      { path: '*', element: <Navigate to={pagePaths[Page.Bio]} replace /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
