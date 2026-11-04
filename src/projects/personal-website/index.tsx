// The write-up for /work/personal-website, rendered inside PostPage's reading column.
// Plain <p> and <h2>; the template styles them. Images go in this folder:
// import shot from './shot.png?figure', then <Figure src={shot} alt="..." />.

function Body() {
  return (
    <>
      <p>
        The site you're on right now. I wanted somewhere to put my projects that felt like
        mine rather than a template, and I also wanted to see how far I could get building
        something with AI. It's made with React and TypeScript, with Tailwind for styling and
        Vite to build it.
      </p>

      <h2>Vim keybindings</h2>
      <p>
        I spend most of my day in Neovim, so the site can be used the same way. The three
        pages sit side by side, Work, Bio and Interests, and h and l move between them. j and
        k scroll or step through the blocks, gg and G jump to the top and bottom, and ? shows
        all the keys. Scrolling starts the moment a key goes down instead of waiting for the
        key to repeat, so holding j glides rather than stutters.
      </p>
      <p>
        Single-letter shortcuts can get in the way of speech input and screen readers, so
        there's a switch in the corner to turn them off, and the site remembers it.
      </p>

      <h2>The collage</h2>
      <p>
        Work and Interests are laid out as a collage of slanted blocks. They split into as few
        rows as fit, as evenly as possible, and hovering or focusing a block widens it to show
        the whole picture. Opening a project uses the View Transitions API, so its image
        morphs from the block into the top of the project's page.
      </p>

      <h2>Small things</h2>
      <p>
        Every page has its own URL, so refreshing and the back button work as you'd expect.
        Images are resized and converted to WebP and AVIF when the site is built, and never
        scaled up. The colours follow your system's light or dark mode, and even the photo on
        the bio page has a version for each.
      </p>

      <h2>A note on AI</h2>
      <p>
        Unlike my other projects, this one was vibe coded on purpose: it was built as an
        experiment in working with AI, and Claude wrote nearly all of the code. My part was
        deciding what the site should be and do, the design, reviewing what came back and
        sending it back when it wasn't right, and writing the words, which I still do myself.
      </p>
    </>
  )
}

export default Body
