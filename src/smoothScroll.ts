// Smooth keyboard scrolling for j / k / gg / G. The window eases toward a
// target every frame. Holding j / k keeps the target running ahead for as long
// as the key is down, so scrolling starts on the press itself rather than
// waiting out the OS key-repeat delay; a quick tap glides one step. Wheel or
// scrollbar input mid-glide wins: the glide stops.

const STEP = 90
// how far the target runs ahead while a key is held; sets the hold speed at
// about RATE * LEAD px/s
const LEAD = 120
// easing rate per second; higher settles faster
const RATE = 14

// null while idle
let target: number | null = null
// where the glide has put the page; a mismatch means someone else scrolled
let pos = 0
let last = 0
// direction of the key being held, 0 for none
let held: -1 | 0 | 1 = 0

function clamp(y: number) {
  const max = document.documentElement.scrollHeight - window.innerHeight
  return Math.min(Math.max(y, 0), max)
}

function tick(now: number) {
  if (target === null) return
  if (Math.abs(window.scrollY - pos) > 2) {
    target = null
    held = 0
    return
  }

  // capped so a stalled tab doesn't jump on its first frame back
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now

  if (held === 1) target = clamp(Math.max(target, pos + LEAD))
  if (held === -1) target = clamp(Math.min(target, pos - LEAD))

  const diff = target - pos
  if (Math.abs(diff) < 0.5) {
    pos = target
    target = null
  } else {
    pos += diff * (1 - Math.exp(-RATE * dt))
  }
  window.scrollTo(0, pos)
  if (target !== null) requestAnimationFrame(tick)
}

function start(): number {
  if (target === null) {
    pos = window.scrollY
    target = pos
    last = performance.now()
    requestAnimationFrame(tick)
  }
  return target
}

// key down: one step at once, then keeps going until scrollRelease
export function scrollHold(dir: 1 | -1) {
  const current = start()
  // same way as a glide already under way: add to it; reversing: from here
  const from = Math.sign(current - pos) === -dir ? pos : current
  target = clamp(from + dir * STEP)
  held = dir
}

// key up
export function scrollRelease(dir: 1 | -1) {
  if (held === dir) held = 0
}

export function scrollToEdge(edge: 'top' | 'bottom') {
  start()
  held = 0
  target = clamp(edge === 'top' ? 0 : Infinity)
}
