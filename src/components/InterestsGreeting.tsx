import { useEffect, useState } from 'react'
import avatar from '../assets/avatar.webp'

// A small chat bubble from me, bottom left, the first time someone
// opens Interests: a heads-up that the tone changes here. It slides in, stays
// a few seconds and leaves on its own; × or Esc closes it sooner. Remembered
// in the browser, so it only ever shows once. Nothing blocks the page.
//
// TODO: the avatar is a crop of the bio photo, a stand-in until a cartoon of
// me exists. The line is a placeholder too.
// Idea: draw a chibi me holding a sign, with the line written on the sign
// instead of in a chat bubble.

const SEEN_KEY = 'interests-greeting-seen'
const DELAY = 500
const DURATION = 6000

// storage can be blocked (private windows), so it fails towards not showing
function seen() {
  try {
    return !!localStorage.getItem(SEEN_KEY)
  } catch {
    return true
  }
}

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, '1')
  } catch {
    // nothing to remember it in, and seen() already keeps it hidden
  }
}

function InterestsGreeting() {
  // hidden -> shown -> leaving (fades out) -> gone
  const [phase, setPhase] = useState<'hidden' | 'shown' | 'leaving' | 'gone'>('hidden')

  useEffect(() => {
    if (seen()) return
    // marked once it actually shows, not here: StrictMode runs this twice
    const show = setTimeout(() => {
      markSeen()
      setPhase('shown')
    }, DELAY)
    const leave = setTimeout(() => setPhase('leaving'), DELAY + DURATION)
    return () => {
      clearTimeout(show)
      clearTimeout(leave)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'shown') return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPhase('leaving')
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  if (phase === 'hidden' || phase === 'gone') return null

  return (
    <div
      role="status"
      onTransitionEnd={() => phase === 'leaving' && setPhase('gone')}
      className={`fixed bottom-16 left-4 z-20 flex max-w-[calc(100%-2rem)] items-end gap-3 transition-opacity duration-300 animate-greet motion-reduce:animate-fade-in lg:bottom-6 lg:left-6 ${phase === 'leaving' ? 'opacity-0' : ''}`}
    >
      <img
        src={avatar}
        alt=""
        className="size-14 shrink-0 rounded-full border border-line bg-paper object-cover"
      />
      <div className="relative mb-2 flex items-start gap-2 rounded-2xl rounded-bl-sm border border-line bg-paper py-2.5 pr-2 pl-4 text-[15px] leading-snug shadow-sm">
        <p>
          <strong>Warning!</strong> You've entered my <span className="text-accent">interests</span> page, no
          official language here.
        </p>
        <button
          type="button"
          onClick={() => setPhase('leaving')}
          aria-label="Close"
          className="-my-1 flex size-7 shrink-0 items-center justify-center font-mono text-muted hover:text-accent"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default InterestsGreeting
