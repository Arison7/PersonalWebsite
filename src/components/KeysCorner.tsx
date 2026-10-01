import { useVim } from '../context/VimContext'
import Kbd from './Kbd'

// Floats in the corner on every page: ? opens the key list, and the switch
// turns the keys on or off in plain sight, so nobody has to know vim to find
// it. Desktop only, like the key hints: phones have no keyboard.

function KeysCorner() {
  const { enabled, setEnabled, setHelpOpen } = useVim()

  return (
    <div className="fixed right-6 bottom-6 z-20 hidden items-center gap-1 border border-line bg-paper/90 px-2 font-mono text-[13px] text-muted backdrop-blur-sm lg:flex">
      <button
        type="button"
        onClick={() => setHelpOpen(true)}
        className="flex min-h-11 items-center gap-2 px-2 hover:text-accent"
      >
        <Kbd>?</Kbd>
        keys
      </button>

      <span aria-hidden="true" className="h-5 w-px bg-line" />

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => setEnabled(!enabled)}
        className="flex min-h-11 items-center gap-2.5 px-2 hover:text-accent"
      >
        vim keys
        <span
          aria-hidden="true"
          className={`relative h-4 w-7 rounded-full border transition-colors ${enabled ? 'border-accent bg-accent' : 'border-line bg-transparent'}`}
        >
          <span
            className={`absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full transition-[left,background-color] ${enabled ? 'left-[13px] bg-paper' : 'left-0.5 bg-muted'}`}
          />
        </span>
      </button>
    </div>
  )
}

export default KeysCorner
