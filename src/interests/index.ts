import type { Post } from '../posts'
import FantasyBooks from './fantasy-books'
import Drawing from './drawing'
import Ttrpg from './ttrpg'
import LearningRandomSkills from './learning-random-skills'
import VideoGames from './video-games'
import AnimeAndTvShows from './anime-and-tv-shows'
import LearningGerman from './learning-german'
import fantasyBooksCover from './fantasy-books/cover.webp?cover'
import drawingCover from './drawing/cover.webp?cover'
import ttrpgCover from './ttrpg/cover.webp?cover'
import videoGamesCover from './video-games/cover.webp?cover'
import animeAndTvShowsCover from './anime-and-tv-shows/cover.webp?cover'
import learningRandomSkillsCover from './learning-random-skills/cover.webp?cover'
import learningGermanCover from './learning-german/cover.webp?cover'

// content for interests, shared by the Interests collage and each interest's
// own page (/interests/<slug>). See src/posts.ts.
// "Work in progress" until the real text exists.

export const interests: Post[] = [
  {
    slug: 'fantasy-books',
    title: 'Fantasy books',
    description: "Why doesn't our world have magic? </3",
    image: fantasyBooksCover,
    Body: FantasyBooks,
  },
  {
    slug: 'drawing',
    title: 'Drawing',
    description: 'Work in progress',
    image: drawingCover,
    Body: Drawing,
  },
  {
    slug: 'ttrpg',
    title: 'TTRPG',
    description: 'Work in progress',
    image: ttrpgCover,
    Body: Ttrpg,
  },
  {
    slug: 'learning-random-skills',
    title: 'Learning random skills',
    description: 'Work in progress',
    image: learningRandomSkillsCover,
    Body: LearningRandomSkills,
  },
  {
    slug: 'video-games',
    title: 'Video games',
    description: 'Work in progress',
    image: videoGamesCover,
    Body: VideoGames,
  },
  {
    slug: 'anime-and-tv-shows',
    title: 'Anime and TV shows',
    description: 'Work in progress',
    image: animeAndTvShowsCover,
    Body: AnimeAndTvShows,
  },
  {
    slug: 'learning-german',
    title: 'Learning German',
    description: 'Work in progress',
    image: learningGermanCover,
    Body: LearningGerman,
  },
]
