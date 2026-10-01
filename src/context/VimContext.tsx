import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'
import { Page } from '../types'
import { usePage } from '../hooks/usePage'
import { scrollHold, scrollRelease, scrollToEdge } from '../smoothScroll'

// Vim-style keyboard controls. On by default: plain letter keys don't clash
// with browser shortcuts, and visitors who don't know vim never press them.
// Single-key shortcuts must be switchable off for speech input and screen
// reader users (WCAG 2.1.4), so there's a switch in the corner, remembered per
// browser.
//
// h / l (switch page) are the main thing and live here, driven by the page
// order, so they work on every page whatever is mounted. Components add
// page-specific keys with useVimBindings() while they're mounted; the most
// recently mounted binding for a key wins. Keys nobody binds fall back to the
// defaults in the listener below.

type Bindings = Partial<Record<string, () => void>>

type VimContextValue = {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  helpOpen: boolean
  setHelpOpen: (open: boolean) => void
  register: (bindings: RefObject<Bindings>) => () => void
}

const VimContext = createContext<VimContextValue>({
  enabled: false,
  setEnabled: () => {},
  helpOpen: false,
  setHelpOpen: () => {},
  register: () => () => {},
})

// pages as they sit on screen, left to right; h / l step along this line
const order = [Page.Work, Page.Bio, Page.Hobbies]

const STORAGE_KEY = 'vim-keys'
// how long the first g of gg waits for the second
const SEQUENCE_TIMEOUT = 600

// storage can be missing or throw (private windows, blocked site data)
function loadEnabled() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== 'off'
  } catch {
    return true
  }
}

function isTyping(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  )
}

type VimProviderProps = {
  children?: ReactNode
}

export function VimProvider({ children }: VimProviderProps) {
  const { activePage, setActivePage } = usePage()
  const [enabled, setEnabled] = useState(loadEnabled)
  const [helpOpen, setHelpOpen] = useState(false)
  const stack = useRef<RefObject<Bindings>[]>([])

  const register = useCallback((bindings: RefObject<Bindings>) => {
    stack.current.push(bindings)
    return () => {
      stack.current = stack.current.filter((b) => b !== bindings)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off')
    } catch {
      // not remembered, still works for this visit
    }
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    let pendingG = false
    let timer: number | undefined

    function onKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return
      if (isTyping(e.target)) return

      // the dialog handles its own Esc; ? closes it again
      if (helpOpen) {
        if (e.key === '?') {
          e.preventDefault()
          setHelpOpen(false)
        }
        return
      }

      if (pendingG) {
        pendingG = false
        window.clearTimeout(timer)
        if (e.key === 'g') {
          e.preventDefault()
          scrollToEdge('top')
          return
        }
      }

      for (let i = stack.current.length - 1; i >= 0; i--) {
        const action = stack.current[i].current[e.key]
        if (action) {
          e.preventDefault()
          action()
          return
        }
      }

      switch (e.key) {
        case 'h':
        case 'l': {
          // one page per press; a held key shouldn't fly through them
          if (e.repeat) break
          const next = order[order.indexOf(activePage) + (e.key === 'h' ? -1 : 1)]
          if (!next) return
          setActivePage(next)
          break
        }
        case 'j':
        case 'k':
          // holding is handled by the scroller, so auto-repeats are ignored
          if (!e.repeat) scrollHold(e.key === 'j' ? 1 : -1)
          break
        case 'g':
          pendingG = true
          timer = window.setTimeout(() => (pendingG = false), SEQUENCE_TIMEOUT)
          break
        case 'G':
          scrollToEdge('bottom')
          break
        case '?':
          setHelpOpen(true)
          break
        case 'Escape':
          // closes an open collage block
          if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
          break
        default:
          return
      }
      e.preventDefault()
    }

    function onKeyUp(e: KeyboardEvent) {
      if (e.key === 'j') scrollRelease(1)
      if (e.key === 'k') scrollRelease(-1)
    }

    // a key released while the window is in the background never sends keyup
    function onBlur() {
      scrollRelease(1)
      scrollRelease(-1)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
      window.clearTimeout(timer)
    }
  }, [enabled, helpOpen, activePage, setActivePage])

  const value = useMemo(
    () => ({ enabled, setEnabled, helpOpen, setHelpOpen, register }),
    [enabled, helpOpen, register],
  )

  return <VimContext.Provider value={value}>{children}</VimContext.Provider>
}

export function useVim() {
  return useContext(VimContext)
}

// Binds keys (e.key values: 'h', 'G', 'Escape') while the calling component is
// mounted. The handlers can change every render; the latest ones are used.
export function useVimBindings(bindings: Bindings) {
  const { register } = useVim()
  const ref = useRef(bindings)

  useLayoutEffect(() => {
    ref.current = bindings
  })

  useEffect(() => register(ref), [register])
}
