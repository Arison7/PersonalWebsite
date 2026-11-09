import LoadingImage from './LoadingImage'

// A row of small book covers inside a post's write-up, wrapping on narrow
// screens. Covers are 240x360 files (2x), from '?cover' imports.

type BookCoversProps = {
  books: { src: string; title: string }[]
}

function BookCovers({ books }: BookCoversProps) {
  return (
    <div className="flex flex-wrap gap-3 py-1">
      {books.map(({ src, title }) => (
        <LoadingImage
          key={title}
          src={src}
          width={240}
          height={360}
          alt={`Cover of ${title}`}
          title={title}
          loading="lazy"
          decoding="async"
          className="h-auto w-24 rounded-sm lg:w-28"
        />
      ))}
    </div>
  )
}

export default BookCovers
