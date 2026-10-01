import { useCallback, useState } from 'react'
import type { ComponentProps } from 'react'

// <img> that shimmers in its own box until the file has loaded, then fades in.
// One that is already cached (preloaded) shows straight away with neither.
// Takes the same props as <img>, so it drops in anywhere, inside <picture> too.
// Marked data-loaded once done, for anything that should wait for it.

type State = 'loading' | 'loaded' | 'cached'

function LoadingImage({ className = '', onLoad, onError, ...props }: Omit<ComponentProps<'img'>, 'ref'>) {
  const [state, setState] = useState<State>('loading')

  // complete on mount means it came from the cache: skip the fade
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth > 0) {
      setState((s) => (s === 'loading' ? 'cached' : s))
    }
  }, [])

  // a broken image stops shimmering too
  const done = () => setState((s) => (s === 'loading' ? 'loaded' : s))

  return (
    <img
      {...props}
      ref={ref}
      data-loaded={state === 'loading' ? undefined : ''}
      onLoad={(e) => {
        done()
        onLoad?.(e)
      }}
      onError={(e) => {
        done()
        onError?.(e)
      }}
      className={`${className} ${state === 'loading' ? 'shimmer' : state === 'loaded' ? 'animate-fade-in' : ''}`}
    />
  )
}

export default LoadingImage
