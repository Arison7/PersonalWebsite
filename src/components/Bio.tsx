import { Link } from 'react-router-dom'
import { Page } from '../types'
import { usePage } from '../hooks/usePage'
import { useVim } from '../context/VimContext'
import Kbd from './Kbd'
import LoadingImage from './LoadingImage'
import LanguageFlags from './LanguageFlags'
import { FaGithub, FaLinkedinIn, FaRegEnvelope, FaRegFileLines } from 'react-icons/fa6'
import photoLight from '../assets/photo-light.webp'
import photoDark from '../assets/photo-dark.webp'

// content for bio

// all but email open in a new tab; the CV is served from public/
const links = [
  { label: 'GitHub', href: 'https://github.com/Arison7', Icon: FaGithub },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/%C5%82ukasz-krysmalski-13a9a721a/',
    Icon: FaLinkedinIn,
  },
  { label: 'CV (PDF)', href: '/Lukasz-Krysmalski-CV.pdf', Icon: FaRegFileLines },
  { label: 'Email', href: 'mailto:lucaskrysmalski@gmail.com', Icon: FaRegEnvelope },
]

// grouped by proficiency rather than topic, so a new skill only needs a level
const skills = [
  {
    label: 'Confident',
    items: [
      'Rust',
      'Async programming',
      'TypeScript / JavaScript',
      'Python',
      'React',
      'Django & Django REST Framework',
      'SQL',
      'Algorithms & data structures',
      'Git',
      'Linux',
    ],
  },
  {
    label: 'Comfortable',
    items: ['C++', 'REST APIs', 'PHP / Laravel', 'Svelte'],
  },
  { label: 'Familiar', items: ['C', 'DevOps & CI', 'React Native'] },
]


// newest first; subtitle, description and project are optional.
// project is a Work slug: the title then links to /work/<slug>.
// **text** in a description renders bold, for languages and technologies
const timeline: {
  date: string
  title: string
  subtitle?: string
  description?: string
  project?: string
}[] = [
  {
    date: '2023 – 2027',
    title: 'BSc Information and Communication Technology',
    subtitle: 'HZ University of Applied Sciences',
    description: `Progressed from basics of computer science, game and web development
through a **Svelte** and **PHP/Laravel** web application for a real client (Stedin) in an agile
workflow, to microservices in **TypeScript** and basics of data science in **Python**.
Currently in my last year working on a product for Meijers Potato.`
  },
  {
    date: 'Feb 2026 – Jun 2026',
    title: 'Rust Developer',
    project: 'crsf-fuzzer',
    subtitle: 'Internship at the Austrian Institute of Technology',
    description:
      `During this internship I was the main developer of a black box **CRSF**
protocol fuzzer in **Rust**, run against a cyber-physical system.
Working under the guidance of Dr. Matthias Eckhart, I was involved at
every step of the project, from the initial research and brainstorming
sessions where we decided how to move forward, to building and
maintaining a decently sized codebase from the ground up with a
lot of novel features. Along the way I picked up practical pointers on
the basics of electrical engineering and gained hands on practice in
specific Rust areas such as multithreaded programming, multi
target compilation, and advanced generic traits. Being on the
offensive side of a security project also taught me how protocols fail
under unexpected input, and how a fuzzer can surface weaknesses
that would be hard to find by reading code alone.`,
  },
  {
    date: 'Sep 2025 – Dec 2025',
    title: 'Muzeyt',
    project: 'muzeyt',
    subtitle: 'Personal project',
    description: 'A terminal music player, built as a project to learn more about async **Rust**.',
  },
  {
    date: 'Sep 2025 – Dec 2025',
    title: 'Exchange semester',
    subtitle: 'Fachhochschule Vorarlberg',
    description:
      'Chose the university with the best subjects on offer: Augmented Reality, embedded programming in **C** on a **Raspberry Pi**, DevOps, Mobile App Development, Computer Graphics, Blockchain Technologies and German for internationals.',
  },
  {
    date: 'Jun 2022 – May 2023',
    title: 'Messager API',
    project: 'messager-api',
    subtitle: 'Personal project',
    description:
      'A real-time chat app built to showcase my skills: a **Django REST** back end with a **TypeScript** and **React** front end styled with **Sass**. Chat and message updates are pushed live over **WebSockets** with **Django Channels**, which replaced my first **Server-Sent Events** version after it performed poorly. The back-end models are covered by unit tests.',
  },
  {
    date: 'May 2022 – Jul 2023',
    title: 'LeetCode',
    project: 'leetcode',
    subtitle: 'Before university',
    description:
      'Built up fundamentals in optimisation and problem solving: nearly 500 problems solved, mostly in **C++**, with a 13-month daily streak.',
  },
  { 
    date: '2019',
    title: 'Introduction to programming', 
    description: "I started my journey with simple courses first for **C++** then **Python**, I cannot even recall the names now. Then I did like a class a week and random Python projects without much merit to them during my high school days. Most of them in Python, but also some in **TypeScript**. Very simple stuff some in **pygame**, some on LeetCode and on CodinGame. Back in those days there was no AI pressure so taking things slowly didn't feel bad at all."
      
    
  },
]

// Turns **marked** spans of a description into <strong>.
function emphasise(text: string) {
  return text
    .split(/\*\*(.+?)\*\*/)
    .map((part, i) => (i % 2 ? <strong key={i} className="font-bold">{part}</strong> : part))
}

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
        onClick={() => setActivePage(Page.Interests)}
        className={`${base} lg:fixed lg:top-1/2 lg:right-7 lg:-translate-y-1/2`}
      >
        Interests →
        {enabled && <Kbd className="hidden lg:inline">l</Kbd>}
      </button>
    </nav>
  )
}

// Grayscale cutout: centred on phones, level with the text on desktop. The dark variant is
// retoned for the dark background and follows the OS, like the palette.
// Shimmers until the photo is in.
function Photo() {
  return (
    <div className="absolute top-10 left-1/2 aspect-[599/960] w-40 -translate-x-1/2 lg:top-1/2 lg:left-[150px] lg:w-[281px] lg:translate-x-0 lg:-translate-y-1/2">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet={photoDark} />
        <LoadingImage src={photoLight} alt="Photo of Łukasz" className="size-full" />
      </picture>
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
                I am a 22-year-old software developer from Poland. I am in my final year of studying at HZ University of Applied Sciences. This website is mostly designed to show off my skills and hobbies to potential employers and anyone else who got lost enough to arrive here.
              </p>
              <p className="text-base leading-[1.55] text-muted lg:text-lg">
                I am currently looking for my Bachelor thesis project job opportunity starting from February 2027. I am also open to smaller side hustles in the meantime.
              </p>
              <LanguageFlags />
              <div className="flex gap-3 pt-1.5">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    {...(!link.href.startsWith('mailto:') && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
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
                    {entry.project ? (
                      <Link
                        to={`/work/${entry.project}`}
                        viewTransition
                        className="underline decoration-1 underline-offset-4 hover:text-accent"
                      >
                        {entry.title}
                      </Link>
                    ) : (
                      entry.title
                    )}
                  </span>
                  {entry.subtitle && (
                    <span className="font-mono text-[13px] text-muted">{entry.subtitle}</span>
                  )}
                  {entry.description && (
                    <p className="max-w-[640px] text-base leading-[1.55] lg:text-[17px]">
                      {emphasise(entry.description)}
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
