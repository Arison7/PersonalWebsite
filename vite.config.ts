import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'
import { defineConfig } from 'vite'

// Image presets, picked by the import's query (types in src/images.d.ts).
// Neither ever upscales, so a small original stays its own size.
const presets: Record<string, Record<string, string>> = {
  // a post's cover: the collage block and the page hero. One URL, so the
  // preloader and the hero hit the same cached file.
  cover: { w: '1920', format: 'webp' },
  // an image inside a post: lazy, sized to the 720px reading column at 1x / 2x
  figure: { w: '720;1440', format: 'avif;webp', as: 'picture' },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools({
      defaultDirectives: (url) => {
        const name = Object.keys(presets).find((preset) => url.searchParams.has(preset))
        return new URLSearchParams(name ? presets[name] : {})
      },
    }),
  ],
})
