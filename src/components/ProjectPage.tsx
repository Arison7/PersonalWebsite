import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { imageTransitionName, projects } from '../projects'
import { useVim, useVimBindings } from '../context/VimContext'
import Kbd from './Kbd'
import BottomBar from './BottomBar'
import LoadingImage from './LoadingImage'
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6'

// The template every project's page shares, written up blog style: the image
// from its collage block as the hero (it morphs over from the block), then a
// single reading column. What goes in the column is the project's own Body
// (src/projects/<slug>.tsx); its plain <p> and <h2> are styled here.

// styles the Body's own elements, so a write-up stays plain markup
const prose =
  'flex flex-col gap-5 pt-4 text-[17px] leading-[1.7] lg:text-[19px] [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-semibold lg:[&_h2]:text-[28px]'

const back = 'flex min-h-11 items-center gap-2.5 px-2.5 font-mono text-sm text-ink hover:text-accent'

// a GitHub icon for GitHub, a generic external-link one for anywhere else
function SourceLink({ href }: { href: string }) {
  const github = new URL(href).hostname === 'github.com'
  const Icon = github ? FaGithub : FaArrowUpRightFromSquare
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="-mx-2.5 flex min-h-11 items-center gap-2 px-2.5 font-mono text-[13px] text-ink hover:text-accent"
    >
      <Icon aria-hidden="true" className="size-4" />
      {github ? 'View on GitHub' : 'View source'}
    </a>
  )
}

function ProjectPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { enabled } = useVim()

  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  // h goes back up to Work; l has nowhere to go from here
  useVimBindings({
    h: () => navigate('/work', { viewTransition: true }),
    l: () => {},
  })

  if (!project) return <Navigate to="/work" replace />

  const number = String(index + 1).padStart(2, '0')

  return (
    <>
      <header className="mx-auto w-full max-w-[1360px] px-6 py-6 lg:px-10 lg:pt-10 lg:pb-8">
        <Link to="/work" viewTransition className={`${back} hidden -ml-2.5 w-fit lg:flex`}>
          ← Work
          {enabled && <Kbd>h</Kbd>}
        </Link>
      </header>

      <article className="pb-24 lg:pb-20">
        <LoadingImage
          src={project.image}
          alt=""
          style={{ viewTransitionName: imageTransitionName(project.slug) }}
          className="mx-auto aspect-[4/3] w-full max-w-[1280px] object-cover lg:aspect-[2/1] lg:w-[calc(100%-80px)]"
        />

        <div className="mx-auto flex max-w-[720px] flex-col gap-4 px-6 pt-8 lg:px-0 lg:pt-14">
          <span className="font-mono text-sm text-accent">{number}</span>
          <h1 className="text-[40px] leading-[1.05] font-semibold lg:text-[56px] lg:tracking-[-0.01em]">
            {project.title}
          </h1>
          <p className="text-lg leading-[1.55] lg:text-[21px]">{project.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line pb-6">
            <span className="font-mono text-[13px] text-muted">{project.meta}</span>
            {project.source && <SourceLink href={project.source} />}
          </div>

          <div className={prose}>
            <project.Body />
          </div>

          <Link to="/work" viewTransition className={`${back} -ml-2.5 mt-10 hidden w-fit lg:flex`}>
            ← all work
          </Link>
        </div>
      </article>

      <BottomBar
        left={
          <Link to="/work" viewTransition className={back}>
            ← Work
          </Link>
        }
      />
    </>
  )
}

export default ProjectPage
