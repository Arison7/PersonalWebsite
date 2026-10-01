import { useEffect, useRef } from 'react'
import { useVim } from '../context/VimContext'
import Kbd from './Kbd'

// The ? dialog: lists the keys. The on/off switch lives in KeysCorner.
// Native <dialog> so focus is trapped and Esc closes it for free.

const keys = [
  { keys: ['h', 'l'], text: 'page to the left / right' },
  { keys: ['j', 'k'], text: 'scroll down / up, or next / previous block on Hobbies and Work' },
  { keys: ['g g', 'G'], text: 'top / bottom' },
  { keys: ['Esc'], text: 'close an open block' },
  { keys: ['?'], text: 'show or hide this' },
]

function KeysDialog() {
  const { enabled, helpOpen, setHelpOpen } = useVim()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (helpOpen && !dialog.open) dialog.showModal()
    if (!helpOpen && dialog.open) dialog.close()
  }, [helpOpen])

  return (
    <dialog
      ref={ref}
      aria-labelledby="keys-title"
      onClose={() => setHelpOpen(false)}
      // a click that lands on the dialog itself, not its content, is the backdrop
      onClick={(e) => e.target === e.currentTarget && setHelpOpen(false)}
      className="m-auto w-[min(520px,calc(100vw-32px))] border border-line bg-paper text-ink backdrop:bg-ink/30"
    >
      <div className="flex flex-col gap-5 p-7">
        <div className="flex items-baseline justify-between border-b border-line pb-2">
          <h2 id="keys-title" className="text-2xl font-semibold">
            Keys
          </h2>
          <button
            type="button"
            onClick={() => setHelpOpen(false)}
            className="min-h-11 font-mono text-sm text-muted hover:text-accent"
          >
            close
          </button>
        </div>

        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-base leading-snug">
          {keys.map((row) => (
            <div key={row.text} className="contents">
              <dt className="flex gap-1.5 pt-0.5">
                {row.keys.map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </dt>
              <dd className={enabled ? '' : 'text-muted'}>{row.text}</dd>
            </div>
          ))}
        </dl>

        {!enabled && (
          <p className="border-t border-line pt-4 font-mono text-sm text-muted">
            vim keys are off; switch them on in the corner
          </p>
        )}
      </div>
    </dialog>
  )
}

export default KeysDialog
