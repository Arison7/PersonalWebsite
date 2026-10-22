import LoadingImage from './LoadingImage'

// An image inside a post's write-up, from a '?figure' import (vite.config.ts):
// AVIF with WebP as the fallback, each at the reading column's 1x and 2x.
// Lazy, since it's further down the page, and sized from the file so the text
// below doesn't jump once it loads. An optional caption goes underneath.

export type Picture = {
  // format -> srcset
  sources: Record<string, string>
  img: { src: string; w: number; h: number }
}

type FigureProps = {
  src: Picture
  alt: string
  caption?: string
}

function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="flex flex-col gap-3 py-2">
      <picture>
        {Object.entries(src.sources).map(([format, srcSet]) => (
          <source key={format} type={`image/${format}`} srcSet={srcSet} sizes="(min-width: 768px) 720px, 100vw" />
        ))}
        <LoadingImage
          src={src.img.src}
          width={src.img.w}
          height={src.img.h}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-auto w-full"
        />
      </picture>
      {caption && <figcaption className="font-mono text-[13px] text-muted">{caption}</figcaption>}
    </figure>
  )
}

export default Figure
