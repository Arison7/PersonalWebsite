import type { Post } from '../posts'
import Muzeyt from './muzeyt'
import CrsfFuzzer from './crsf-fuzzer'
import MessagerApi from './messager-api'
import Leetcode from './leetcode'
import CCompiler from './c-compiler'
import GreenBridge from './green-bridge'
import PersonalWebsite from './personal-website'
// TODO: upscale the images. Most covers are only 768–1053px wide, but the hero
// shows them up to 1280px (2560px on a 2x screen) and the build never enlarges.
import muzeytCover from './muzeyt/cover.png?cover'
import crsfFuzzerCover from './crsf-fuzzer/cover.webp?cover'
import messagerApiCover from './messager-api/cover.png?cover'
import leetcodeCover from './leetcode/cover.png?cover'
import cCompilerCover from './c-compiler/cover.png?cover'
import greenBridgeCover from './green-bridge/cover.png?cover'

// content for work: internship and projects, shared by the Work collage and
// each project's own page (/work/<slug>). See src/posts.ts.
// Lorem ipsum until the real text exists; picsum.photos where there's no cover yet.

export const projects: Post[] = [
  {
    slug: 'muzeyt',
    title: 'Muzeyt',
    description: 'A terminal music player in Rust, built around async message passing.',
    image: muzeytCover,
    meta: 'Rust · Tokio · ratatui · 2025',
    source: 'https://github.com/Arison7/muzeyt',
    Body: Muzeyt,
  },
  // internship
  {
    slug: 'crsf-fuzzer',
    title: 'CRSF fuzzer',
    description: 'A black-box CRSF fuzzer in Rust, built during my internship at AIT to find weak spots in a drone\'s flight controller.',
    image: crsfFuzzerCover,
    meta: 'Rust · Tokio · CRSF · Internship (NDA) · 2026',
    // the code is under NDA, so the link is AIT's confirmation of the internship instead
    source: '/Lukasz-Krysmalski-AIT-Confirmation.pdf',
    sourceLabel: 'AIT confirmation (PDF)',
    Body: CrsfFuzzer,
  },
  {
    slug: 'messager-api',
    title: 'MessagerApi',
    description: 'A real-time chat app with a Django back end and a React front end.',
    image: messagerApiCover,
    meta: 'Django · Channels · React · TypeScript · 2022–2023',
    source: 'https://github.com/Arison7/MessagerApi',
    Body: MessagerApi,
  },
  {
    slug: 'leetcode',
    title: 'LeetCode',
    description: '479 problems solved, most of them in C++, with a daily habit that lasted over a year.',
    image: leetcodeCover,
    meta: 'C++ · Python · Rust · 2022–2023',
    source: 'https://leetcode.com/u/arison646/',
    Body: Leetcode,
  },
  {
    slug: 'c-compiler',
    title: 'C compiler in Rust',
    description: 'A small C compiler written in Rust, from source code to x86 assembly.',
    image: cCompilerCover,
    meta: 'Rust · x86 assembly · 2025',
    source: 'https://github.com/Arison7/rust-compiler',
    Body: CCompiler,
  },
  {
    slug: 'green-bridge',
    title: 'Green Bridge',
    description: 'A pattern language for bringing forest bathing into the green spaces of European cities.',
    image: greenBridgeCover,
    meta: 'HZ Honours · React · Tailwind · 2026',
    source: 'https://greenbridge-honours.com/',
    Body: GreenBridge,
  },
  {
    slug: 'personal-website',
    title: 'Personal website',
    description: 'This site: a React app you can drive with vim keybindings.',
    image: 'https://picsum.photos/seed/work6/1200/900',
    meta: 'React · TypeScript · Tailwind · Vite · 2026',
    source: 'https://github.com/Arison7/PersonalWebsite',
    Body: PersonalWebsite,
  },
]
