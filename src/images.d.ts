// What the image presets in vite.config.ts import as.

// import cover from './cover.png?cover'
declare module '*?cover' {
  const src: string
  export default src
}

// import diagram from './diagram.png?figure', then <Figure src={diagram} />
declare module '*?figure' {
  const picture: import('./components/Figure').Picture
  export default picture
}
