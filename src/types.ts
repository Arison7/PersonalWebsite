// Which page is currently active.
// Each has a URL, see pagePaths in hooks/usePage.
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
  // where clicking the open block goes; without it the block only opens
  link?: string
  // view-transition-name for the image, to morph it into the linked page
  imageTransitionName?: string
}
