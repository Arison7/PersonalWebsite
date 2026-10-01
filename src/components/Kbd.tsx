// A key cap, as in the mockup's h / l / ? hints.

type KbdProps = {
  children: string
  className?: string
}

function Kbd({ children, className = '' }: KbdProps) {
  return (
    <kbd
      className={`rounded-[3px] border border-line px-[7px] py-px font-mono text-xs text-muted ${className}`}
    >
      {children}
    </kbd>
  )
}

export default Kbd
