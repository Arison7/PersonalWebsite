// Which page is currently active.
// Values double as the URL path segment once the router goes in.
export enum Page {
  Bio = 'bio',
  Hobbies = 'hobbies',
  Work = 'work',
}

// One block in a collage (hobbies, work).
export type CollageItem = {
  title: string
  description: string
  // fills the block: a greyed slice while closed, the whole thing when open
  image?: string
  // short mono line under the description: stack, dates, role
  meta?: string
}
