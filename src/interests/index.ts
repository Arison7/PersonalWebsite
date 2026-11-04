import type { Post } from '../posts'
import FantasyBooks from './fantasy-books'
import Drawing from './drawing'
import Ttrpg from './ttrpg'
import LearningRandomSkills from './learning-random-skills'
import VideoGames from './video-games'
import AnimeAndTvShows from './anime-and-tv-shows'
import LearningGerman from './learning-german'

// content for interests, shared by the Interests collage and each interest's
// own page (/interests/<slug>). See src/posts.ts.
// Lorem ipsum and picsum.photos placeholders until the real text and images exist.

export const interests: Post[] = [
  {
    slug: 'fantasy-books',
    title: 'Fantasy books',
    description: "Why doesn't our world have magic? </3",
    image: 'https://picsum.photos/seed/interest1/1200/900',
    Body: FantasyBooks,
  },
  {
    slug: 'drawing',
    title: 'Drawing',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: 'https://picsum.photos/seed/interest2/1200/900',
    Body: Drawing,
  },
  {
    slug: 'ttrpg',
    title: 'TTRPG',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
    image: 'https://picsum.photos/seed/interest3/1200/900',
    Body: Ttrpg,
  },
  {
    slug: 'learning-random-skills',
    title: 'Learning random skills',
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
    image: 'https://picsum.photos/seed/interest4/1200/900',
    Body: LearningRandomSkills,
  },
  {
    slug: 'video-games',
    title: 'Video games',
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.',
    image: 'https://picsum.photos/seed/interest5/1200/900',
    Body: VideoGames,
  },
  {
    slug: 'anime-and-tv-shows',
    title: 'Anime and TV shows',
    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    image: 'https://picsum.photos/seed/interest6/1200/900',
    Body: AnimeAndTvShows,
  },
  {
    slug: 'learning-german',
    title: 'Learning German',
    description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.',
    image: 'https://picsum.photos/seed/interest7/1200/900',
    Body: LearningGerman,
  },
]
