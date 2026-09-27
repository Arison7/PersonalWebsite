import type { ReactNode } from 'react'

// Shared parent for hobbies and projects — both are laid out as a collage,
// so the arrangement lives here and each page just supplies its own items.

type CollageProps = {
  children?: ReactNode
}

function Collage({ children }: CollageProps) {
  return (
    <section className="collage">
      {children}
    </section>
  )
}

export default Collage
