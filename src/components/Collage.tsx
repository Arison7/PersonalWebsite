import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, RefCallback } from 'react'
import type { CollageItem } from '../types'
import { useElementWidth } from '../hooks/useElementWidth'
import { useVimBindings } from '../context/VimContext'
import { Link } from 'react-router-dom'
import LoadingImage from './LoadingImage'

// Shared parent for hobbies and work — both are laid out as a collage,
// so the arrangement lives here and each page just supplies its own items.
//
// Blocks never get narrower than minBlockWidth. When they don't fit in one
// row they split into as few rows as needed, as evenly as possible
// (7 with room for 5 -> 4 + 3), and every row fills the full width.
// Each row is tall enough for the block's image; many rows just scroll.
//
// Each block's image fills it. Closed, you see a greyed slice of the image
// behind the title; hovering or focusing widens the block to uncover the whole
// image, and the title and description come up over a fade at the bottom.
// Mouse leave / blur closes it again, so none is open by default.
// j / k move focus to the next / previous block, which opens it.
// A block with a link goes to its page when clicked open (Enter from the keys).

// how much wider the open block gets than its closed siblings
const OPEN_GROW = 5
// each block overlaps the previous one by this much (the slant)
const OVERLAP = 40

const slant = '[clip-path:polygon(48px_0,100%_0,calc(100%-48px)_100%,0_100%)]'

function splitRows<T>(items: T[], perRow: number): T[][] {
  if (items.length === 0) return []
  const rowCount = Math.ceil(items.length / perRow)
  const base = Math.floor(items.length / rowCount)
  const extra = items.length % rowCount

  const rows: T[][] = []
  let start = 0
  for (let r = 0; r < rowCount; r++) {
    const size = base + (r < extra ? 1 : 0)
    rows.push(items.slice(start, start + size))
    start += size
  }
  return rows
}

type BlockProps = {
  item: CollageItem
  index: number
  active: boolean
  // false when the block is alone in its row (phones): plain card, always open
  slanted: boolean
  first: boolean
  // the block's width once open; the image is drawn at this width from the
  // start, so opening uncovers more of it instead of rescaling it
  openWidth: number
  onOpen: () => void
  onClose: () => void
  // hover, kept apart from focus so the collage can ignore it while j / k drive
  onHoverStart: () => void
  onHoverEnd: () => void
  ref?: RefCallback<HTMLElement>
}

function Block({
  item,
  index,
  active,
  slanted,
  first,
  openWidth,
  onOpen,
  onClose,
  onHoverStart,
  onHoverEnd,
  ref,
}: BlockProps) {
  const open = active || !slanted
  const number = String(index + 1).padStart(2, '0')

  const style = {
    flexGrow: slanted && active ? OPEN_GROW : 1,
    // panel tone behind the image and under the text, cycles through four
    '--panel': `var(--panel-${(index % 4) + 1})`,
  } as CSSProperties

  const shared = {
    onMouseEnter: onHoverStart,
    onMouseLeave: onHoverEnd,
    onFocus: onOpen,
    onBlur: onClose,
    style,
    className: [
      '@container relative min-w-0 basis-0 cursor-pointer overflow-hidden bg-(--panel) text-left transition-[flex-grow] duration-450 ease-out',
      slanted ? slant : 'min-h-[420px]',
      slanted && !first ? '-ml-10' : '',
    ].join(' '),
  }

  const content = (
    <>
      {item.image && (
        <LoadingImage
          src={item.image}
          alt=""
          style={{
            width: slanted && openWidth > 0 ? openWidth : '100%',
            viewTransitionName: item.imageTransitionName,
          }}
          className={`absolute inset-y-0 left-0 h-full max-w-none object-cover transition-[filter] duration-450 ${open ? '' : 'grayscale'}`}
        />
      )}

      {/* closed: dim the whole image so the title reads */}
      <span
        className={`absolute inset-0 bg-(--panel)/80 transition-opacity duration-450 ${open ? 'opacity-0' : ''}`}
      />
      {/* open: image in full, text sits on a fade at the bottom */}
      <span
        className={`absolute inset-0 bg-linear-to-t from-(--panel) from-20% via-(--panel)/70 via-45% to-transparent to-75% transition-opacity duration-450 ${open ? '' : 'opacity-0'}`}
      />

      {open ? (
        <>
          <span
            className={`absolute inset-x-0 bottom-0 flex flex-col gap-3.5 ${slanted ? 'animate-reveal px-[90px] pb-[60px]' : 'p-6'}`}
          >
            <span className="font-mono text-sm text-accent">{number}</span>
            <span className="text-3xl leading-[1.05] font-semibold lg:text-[44px]">{item.title}</span>
            <span className="max-w-[540px] text-base leading-normal lg:text-[19px]">
              {item.description}
            </span>
            {item.meta && <span className="font-mono text-sm text-panel-muted">{item.meta}</span>}
          </span>
          {slanted && <span className="absolute inset-x-12 bottom-0 h-1 bg-accent" />}
        </>
      ) : (
        <>
          <span className="absolute top-11 left-[66px] font-mono text-sm text-panel-muted">{number}</span>
          {/* wide enough: title reads normally along the bottom */}
          <span className="absolute right-14 bottom-14 left-10 line-clamp-3 hidden text-[28px] leading-tight font-semibold @min-[260px]:block">
            {item.title}
          </span>
          {/* narrow (a sibling is open): sideways, long titles end in … */}
          <span className="absolute top-[76px] bottom-14 left-[62px] rotate-180 overflow-hidden text-[28px] font-semibold text-ellipsis whitespace-nowrap [writing-mode:vertical-rl] @min-[260px]:hidden">
            {item.title}
          </span>
        </>
      )}
    </>
  )

  // A block with a page is a real link (middle-click, open in new tab). It
  // follows the link once open: hover, focus and phone cards are open already,
  // so only a tap on a closed slanted block (touch) just opens it first.
  if (item.link) {
    return (
      <Link
        {...shared}
        ref={ref}
        to={item.link}
        viewTransition
        onClick={(e) => {
          if (open) return
          e.preventDefault()
          onOpen()
        }}
      >
        {content}
      </Link>
    )
  }

  return (
    // touch has no hover: a tap opens it
    <button {...shared} ref={ref} type="button" aria-expanded={open} onClick={onOpen}>
      {content}
    </button>
  )
}

type CollageProps = {
  items: CollageItem[]
  minBlockWidth?: number
}

function Collage({ items, minBlockWidth = 320 }: CollageProps) {
  const [ref, width] = useElementWidth<HTMLDivElement>()
  const [active, setActive] = useState<number | null>(null)
  const blocks = useRef<(HTMLElement | null)[]>([])

  // Set while j / k are driving. Scrolling slides blocks under a resting
  // pointer, and the browser reports that as hovering them, which would steal
  // the open block from the focused one. So hover is ignored until the pointer
  // really moves (scroll-made mouse events have no movement).
  const usingKeys = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (e.movementX || e.movementY) usingKeys.current = false
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Steps from the focused block, else the hovered one; from nothing open,
  // j starts at the first block and k at the last.
  const step = (dir: 1 | -1) => {
    const focused = blocks.current.findIndex((el) => el === document.activeElement)
    const current = focused !== -1 ? focused : active
    const next =
      current === null
        ? dir === 1
          ? 0
          : items.length - 1
        : Math.min(Math.max(current + dir, 0), items.length - 1)

    const el = blocks.current[next]
    if (!el) return
    usingKeys.current = true
    el.focus({ preventScroll: true })
    // centre the block's row; focus' own scroll only nudges it to the edge
    el.parentElement?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
  useVimBindings({ j: () => step(1), k: () => step(-1) })

  const perRow = Math.max(1, Math.floor(width / minBlockWidth))
  const rows = splitRows(
    items.map((item, index) => ({ item, index })),
    perRow,
  )

  return (
    // pb-24 keeps the last card clear of the bottom bar on phones
    <section className="mx-auto flex w-full max-w-[1360px] flex-1 px-6 pb-24 lg:px-10 lg:pb-10">
      <div ref={ref} className="flex flex-1 flex-col gap-6 lg:gap-10">
        {rows.map((row, r) => {
          // the blocks split the row width plus their overlaps by flex-grow
          const n = row.length
          const openWidth = ((width + OVERLAP * (n - 1)) * OPEN_GROW) / (OPEN_GROW + n - 1)

          return (
            // Slanted rows get a fixed minimum so opening a block doesn't change
            // the row height; on desktop they also stretch to fill the screen.
            // Phone cards (one per row) take their own height.
            <div key={r} className={`flex lg:grow lg:basis-0 ${n > 1 ? 'min-h-[520px]' : ''}`}>
              {row.map(({ item, index }, i) => (
                <Block
                  key={index}
                  ref={(el) => {
                    blocks.current[index] = el
                  }}
                  item={item}
                  index={index}
                  active={index === active}
                  slanted={n > 1}
                  first={i === 0}
                  openWidth={openWidth}
                  onOpen={() => setActive(index)}
                  // only close if this block is still the open one; moving
                  // straight onto the next block opens that one instead
                  onClose={() => setActive((current) => (current === index ? null : current))}
                  onHoverStart={() => !usingKeys.current && setActive(index)}
                  onHoverEnd={() =>
                    !usingKeys.current && setActive((current) => (current === index ? null : current))
                  }
                />
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Collage
