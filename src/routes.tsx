import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import App from './App.tsx'
import Bio from './components/Bio.tsx'
import Interests from './components/Interests.tsx'
import Work from './components/Work.tsx'
import PostPage from './components/PostPage.tsx'
import { projects } from './projects'
import { interests } from './interests'
import { pagePaths } from './hooks/usePage.ts'
import { Page } from './types.ts'

// Shared by the browser (main.tsx) and the build's pre-render
// (entry-server.tsx), so both draw the same pages.
export const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      { path: pagePaths[Page.Bio], element: <Bio /> },
      { path: pagePaths[Page.Interests], element: <Interests /> },
      {
        path: `${pagePaths[Page.Interests]}/:slug`,
        element: <PostPage page={Page.Interests} posts={interests} />,
      },
      { path: pagePaths[Page.Work], element: <Work /> },
      { path: `${pagePaths[Page.Work]}/:slug`, element: <PostPage page={Page.Work} posts={projects} /> },
      { path: '*', element: <Navigate to={pagePaths[Page.Bio]} replace /> },
    ],
  },
]
