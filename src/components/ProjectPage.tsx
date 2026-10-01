import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { imageTransitionName, projects } from '../projects'
import { useVim, useVimBindings } from '../context/VimContext'
import Kbd from './Kbd'
import BottomBar from './BottomBar'
import LoadingImage from './LoadingImage'

// One project, written up blog style: the image from its collage block as the
// hero (it morphs over from the block), then a single reading column.
// The body is lorem ipsum, the same for every project, until real write-ups exist.

const back = 'flex min-h-11 items-center gap-2.5 px-2.5 font-mono text-sm text-ink hover:text-accent'

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
          <span className="border-b border-line pb-6 font-mono text-[13px] text-muted">{project.meta}</span>

          <div className="flex flex-col gap-5 pt-4 text-[17px] leading-[1.7] lg:text-[19px]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <h2 className="pt-4 text-2xl font-semibold lg:text-[28px]">Lorem ipsum</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
              architecto beatae vitae dicta sunt explicabo.
            </p>

            <h2 className="pt-4 text-2xl font-semibold lg:text-[28px]">Dolor sit amet</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
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
