// The languages I speak, as small flags with their level, on their own row in
// the hero. Grey with a warm tint to sit on the paper, like the collage's closed
// blocks; full colour on hover.
// Each is drawn in a 3:2 box so the row lines up.

function Poland() {
  return (
    <svg viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#dc143c" />
      <rect width="3" height="1" fill="#fff" />
    </svg>
  )
}

function UnitedKingdom() {
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice">
      <clipPath id="uk-diagonals">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath="url(#uk-diagonals)"
        stroke="#c8102e"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  )
}

function Germany() {
  return (
    <svg viewBox="0 0 3 2">
      <rect width="3" height="2" fill="#ffce00" />
      <rect width="3" height="1.333" fill="#dd0000" />
      <rect width="3" height="0.667" fill="#000" />
    </svg>
  )
}

const languages = [
  { name: 'Polish', level: 'Native', Flag: Poland },
  { name: 'English', level: 'C2', Flag: UnitedKingdom },
  { name: 'German', level: 'A2', Flag: Germany },
]

function LanguageFlags() {
  return (
    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1.5" aria-label="Languages">
      {languages.map(({ name, level, Flag }) => (
        <li key={name} className="group flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-5 w-[30px] overflow-hidden rounded-[3px] border border-line opacity-85 grayscale sepia-[0.3] transition-[filter,opacity] group-hover:opacity-100 group-hover:grayscale-0 group-hover:sepia-0 [&>svg]:size-full"
          >
            <Flag />
          </span>
          <span className="sr-only">{name}</span>
          <span className="font-mono text-[13px] text-muted">{level}</span>
        </li>
      ))}
    </ul>
  )
}

export default LanguageFlags
