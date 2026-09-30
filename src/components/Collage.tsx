import { useState } from 'react'
import type { CSSProperties } from 'react'
import type { CollageItem } from '../types'
import { useElementWidth } from '../hooks/useElementWidth'

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
}

function Block({ item, index, active, slanted, first, openWidth, onOpen, onClose }: BlockProps) {
  const open = active || !slanted
  const number = String(index + 1).padStart(2, '0')

  const style = {
    flexGrow: slanted && active ? OPEN_GROW : 1,
    // panel tone behind the image and under the text, cycles through four
    '--panel': `var(--panel-${(index % 4) + 1})`,
  } as CSSProperties

  return (
    <button
      type="button"
      aria-expanded={open}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={onClose}
      // touch has no hover: a tap opens it
      onClick={onOpen}
      style={style}
      className={[
        '@container relative min-w-0 basis-0 cursor-pointer overflow-hidden bg-(--panel) text-left transition-[flex-grow] duration-450 ease-out',
        slanted ? slant : 'min-h-[420px]',
        slanted && !first ? '-ml-10' : '',
      ].join(' ')}
    >
      {item.image && (
        <img
          src={item.image}
          alt=""
          style={{ width: slanted && openWidth > 0 ? openWidth : '100%' }}
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

  const perRow = Math.max(1, Math.floor(width / minBlockWidth))
  const rows = splitRows(
    items.map((item, index) => ({ item, index })),
    perRow,
  )

  return (
    <section className="mx-auto flex w-full max-w-[1360px] flex-1 px-6 pb-10 lg:px-10">
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
