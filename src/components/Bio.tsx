import { Page } from '../types'
import { usePage } from '../hooks/usePage'
import { useVim } from '../context/VimContext'
import Kbd from './Kbd'
import LoadingImage from './LoadingImage'
import { FaGithub, FaLinkedinIn, FaRegEnvelope, FaRegFileLines } from 'react-icons/fa6'
import photoLight from '../assets/photo-light.webp'
import photoDark from '../assets/photo-dark.webp'

// content for bio
// All copy except the name is lorem ipsum until the real text is written.

const links = [
  { label: 'GitHub', Icon: FaGithub },
  { label: 'LinkedIn', Icon: FaLinkedinIn },
  { label: 'CV (PDF)', Icon: FaRegFileLines },
  { label: 'Email', Icon: FaRegEnvelope },
]

// grouped by proficiency rather than topic, so a new skill only needs a level
const skills = [
  { label: 'Confident', items: ['Lorem', 'Ipsum', 'Dolor'] },
  { label: 'Comfortable', items: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur'] },
  { label: 'Learning', items: ['Lorem', 'Ipsum'] },
]

// newest first; subtitle and description are optional
const timeline: { date: string; title: string; subtitle?: string; description?: string }[] = [
  { date: 'YYYY', title: 'Lorem ipsum dolor', subtitle: 'Consectetur adipiscing elit' },
  {
    date: 'Mon YYYY – Mon YYYY',
    title: 'Sed do eiusmod',
    subtitle: 'Tempor incididunt · Ut labore',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    date: 'Mon YYYY',
    title: 'Ut enim ad minim veniam',
    subtitle: 'Quis nostrud',
    description: 'Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  { date: 'YYYY', title: 'Duis aute irure dolor' },
]

// Mono label with a rule under it, heads each section.
function SectionLabel({ children }: { children: string }) {
  return (
    <div className="border-b border-line pb-2 font-mono text-[13px] text-muted">
      {children}
    </div>
  )
}

// Links to the neighbouring pages: pinned to the sides on desktop,
// a bar along the bottom on smaller screens.
function SideNav() {
  const { setActivePage } = usePage()
  const { enabled } = useVim()
  const base =
    'flex min-h-11 items-center justify-center px-2.5 py-3 font-mono text-sm text-ink hover:text-accent lg:flex-col lg:gap-2'

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 grid grid-cols-2 border-t border-line bg-paper lg:static lg:block lg:border-0">
      <button
        type="button"
        onClick={() => setActivePage(Page.Work)}
        className={`${base} lg:fixed lg:top-1/2 lg:left-7 lg:-translate-y-1/2`}
      >
        ← Work
        {enabled && <Kbd className="hidden lg:inline">h</Kbd>}
      </button>
      <button
        type="button"
        onClick={() => setActivePage(Page.Hobbies)}
        className={`${base} lg:fixed lg:top-1/2 lg:right-7 lg:-translate-y-1/2`}
      >
        Hobbies →
        {enabled && <Kbd className="hidden lg:inline">l</Kbd>}
      </button>
    </nav>
  )
}

// hand-drawn line along the cutout's edge, in the photo's own 599×960 space
// TODO: the photo will change so this is not a solution
const outline =
  'M580 531 L589 520 L598 518 L598 473 L587 470 L582 463 L512 430 L458 395 L447 384 L426 341 L425 334 L438 300 L448 275 L456 267 L464 250 L489 228 L507 197 L512 182 L512 165 L509 151 L494 125 L485 97 L466 64 L437 34 L401 29 L380 18 L341 17 L272 30 L253 39 L241 52 L223 86 L209 124 L208 143 L202 170 L211 183 L217 205 L229 267 L238 286 L238 293 L224 327 L215 334 L177 336 L143 341 L76 364 L44 380 L18 407 L18 465 L10 476 L0 477 L0 873 L5 872 L15 878'

// Grayscale cutout with the outline traced over it, placed as in the mockup:
// centred on phones, low in the right column on desktop. The dark variant is
// retoned for the dark background and follows the OS, like the palette.
// Shimmers until the photo is in; the outline waits for it.
function Photo() {
  return (
    <div className="group absolute top-10 left-1/2 aspect-[599/960] w-40 -translate-x-1/2 lg:top-[300px] lg:left-[150px] lg:w-[281px] lg:translate-x-0">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet={photoDark} />
        <LoadingImage src={photoLight} alt="Photo of Łukasz" className="size-full" />
      </picture>
      <svg
        viewBox="0 0 599 960"
        aria-hidden="true"
        className="absolute inset-0 size-full translate-x-[3px] -translate-y-0.5 opacity-0 transition-opacity duration-200 group-has-[img[data-loaded]]:opacity-100"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={outline} vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}

function Bio() {
  return (
    <>
      <SideNav />

      <div className="mx-auto w-full max-w-[1110px] px-6 pt-10 pb-24 lg:px-0 lg:pt-0 lg:pb-16">
        <section className="flex flex-col gap-8 lg:min-h-svh lg:flex-row lg:items-center lg:gap-5">
          <div className="flex flex-col gap-8 lg:w-[510px] lg:shrink-0 lg:gap-11">
            <div className="flex flex-col gap-3.5 lg:gap-[18px]">
              <h1 className="text-[46px] leading-none font-semibold lg:text-[64px] lg:tracking-[-0.01em]">
                Łukasz Krysmalski
              </h1>
              <p className="text-lg leading-[1.55] lg:text-[21px]">
                I am 22 years old software developer from Poland. I am at my final year of studying in HZ university of applied science. This website is mostly designed to show off my skills and hobbies to potential employers and anyone else who got lost enough to arrive here.
              </p>
              <p className="text-base leading-[1.55] text-muted lg:text-lg">
                temp
              </p>
              <div className="flex gap-3 pt-1.5">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href="#"
                    aria-label={link.label}
                    title={link.label}
                    className="flex size-11 items-center justify-center rounded-full border-[1.5px] border-line text-ink hover:border-accent hover:text-accent"
                  >
                    <link.Icon aria-hidden="true" className="size-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* sketches around the photo go here later */}
          <div className="relative h-[300px] lg:h-[760px] lg:w-[580px] lg:shrink-0">
            <Photo />
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-6 lg:mt-20">
          <SectionLabel>Skills</SectionLabel>
          <div className="grid gap-[26px] lg:grid-cols-3 lg:gap-9">
            {skills.map((group) => (
              <div key={group.label} className="flex flex-col gap-3.5">
                <span className="font-mono text-[13px] text-accent">{group.label}</span>
                <ul className="flex flex-col gap-0.5 text-[17px] leading-[1.35] lg:text-[19px]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 flex flex-col gap-7 lg:mt-24 lg:gap-[34px]">
          <SectionLabel>Timeline</SectionLabel>
          <ol className="flex flex-col gap-7 lg:gap-[34px]">
            {timeline.map((entry, i) => (
              <li
                key={i}
                className="flex flex-col gap-1.5 lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-8"
              >
                <span className="font-mono text-sm text-muted lg:pt-1">{entry.date}</span>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <span className="text-[19px] leading-[1.3] font-semibold lg:text-[21px]">
                    {entry.title}
                  </span>
                  {entry.subtitle && (
                    <span className="font-mono text-[13px] text-muted">{entry.subtitle}</span>
                  )}
                  {entry.description && (
                    <p className="max-w-[640px] text-base leading-[1.55] lg:text-[17px]">
                      {entry.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  )
}

export default Bio
