import { Page } from '../types'
import { usePage } from '../context/PageContext'

// content for bio
// All copy except the name is lorem ipsum until the real text is written.

const links = ['GitHub', 'LinkedIn', 'CV.pdf', 'Email']

const timeline = [
  { year: 'YYYY', text: 'Lorem ipsum dolor sit amet' },
  { year: 'YYYY', text: 'Consectetur adipiscing elit sed do eiusmod' },
  { year: 'YYYY', text: 'Tempor incididunt ut labore et dolore magna aliqua' },
  { year: 'YYYY', text: 'Ut enim ad minim veniam' },
  { year: 'YYYY', text: 'Quis nostrud exercitation ullamco laboris' },
]

const skills = [
  { label: 'languages', items: ['Lorem', 'Ipsum', 'Dolor'] },
  { label: 'areas', items: ['Lorem ipsum', 'Dolor sit amet', 'Consectetur'] },
  { label: 'tools', items: ['Lorem', 'Ipsum', 'Dolor'] },
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
  const base =
    'flex min-h-11 items-center justify-center px-2.5 py-3 font-mono text-sm text-ink hover:text-accent'

  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 grid grid-cols-2 border-t border-line bg-paper lg:static lg:block lg:border-0">
      <button
        type="button"
        onClick={() => setActivePage(Page.Work)}
        className={`${base} lg:fixed lg:top-1/2 lg:left-7 lg:-translate-y-1/2`}
      >
        ← Work
      </button>
      <button
        type="button"
        onClick={() => setActivePage(Page.Hobbies)}
        className={`${base} lg:fixed lg:top-1/2 lg:right-7 lg:-translate-y-1/2`}
      >
        Hobbies →
      </button>
    </nav>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation.
              </p>
              <p className="text-base leading-[1.55] text-muted lg:text-lg">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur.
              </p>
              <div className="flex flex-wrap gap-[18px] pt-1 font-mono text-sm lg:gap-[22px]">
                {links.map((label) => (
                  <a key={label} href="#" className="text-accent underline hover:text-accent-hover">
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3.5">
              <SectionLabel>timeline</SectionLabel>
              <ol className="flex flex-col gap-3.5">
                {timeline.map((entry, i) => (
                  <li key={i} className="flex gap-4 text-base leading-[1.4] lg:gap-5 lg:text-[17px]">
                    <span className="w-14 shrink-0 pt-0.5 font-mono text-[13px] text-muted lg:w-16 lg:text-sm">
                      {entry.year}
                    </span>
                    <span>{entry.text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* photo + sketches go here later; empty for now */}
          <div aria-hidden="true" className="h-[300px] lg:h-[760px] lg:w-[580px] lg:shrink-0" />
        </section>

        <section className="mt-8 flex flex-col gap-3.5 lg:mt-14 lg:gap-7">
          <SectionLabel>skills</SectionLabel>
          <div className="grid gap-3.5 lg:grid-cols-3 lg:gap-10">
            {skills.map((group) => (
              <div key={group.label} className="flex flex-col gap-1.5 lg:gap-2.5">
                <span className="font-mono text-[13px] text-muted">{group.label}</span>
                <ul className="text-[17px] leading-normal lg:text-[19px] lg:leading-[1.6]">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 flex flex-col gap-3 lg:mt-20 lg:gap-3.5">
          <SectionLabel>contact</SectionLabel>
          <p className="text-[17px] leading-normal lg:text-[21px] lg:leading-[1.55]">
            Lorem ipsum dolor sit amet{' '}
            <a href="#" className="text-accent underline hover:text-accent-hover">
              lorem@ipsum.dolor
            </a>
            .
          </p>
          <span className="pt-6 font-mono text-[13px] text-muted">© 2026 Łukasz</span>
        </section>
      </div>
    </>
  )
}

export default Bio
