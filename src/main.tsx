import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { routes } from './routes.tsx'

// Still a single page app: the router swaps pages client-side, the URL just
// records which one is showing. The host answers every path with an HTML file
// (Vite's dev and preview servers already do).
//
// The build also writes each page out as plain HTML (scripts/prerender.mjs)
// for crawlers and AI agents that don't run JavaScript. That copy sits in
// #prerendered, hidden once JS is on (see index.html), and is dropped here so
// the app renders fresh instead of hydrating it.
//
// TODO: every page is in the main bundle (static imports). When the collage
// has real weight, make these lazy routes (`lazy: () => import(...)`) and warm
// the chunks after first paint so switching stays instant. Images will need
// their own prefetch, separately.
document.getElementById('prerendered')?.remove()

const router = createBrowserRouter(routes)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
