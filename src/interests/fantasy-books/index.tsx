// The write-up for /interests/fantasy-books, rendered inside PostPage's reading column.
// Plain <p> and <h2>; the template styles them. Images go in this folder:
// import shot from './shot.png?figure', then <Figure src={shot} alt="..." />.
// TODO: the picture of my bookshelf plus maybe the tablet
// TODO: Add a list of everything I read

function Body() {
  return (
    <>
      <blockquote>
        <p>
          “When life is harsh or just boring, where better to escape than to a world of sword and magic?”
        </p>
        <footer>— Sun Tzu, The Art of War (probably)</footer>
      </blockquote>

      <h2>Favorite escape for ages</h2>
      <p>
        I started reading really young thanks to my older brother and his collection of books. I started in my native language and then
        as my proficiency in English grew I also started reading in English. In my teens I was able to finish a whole book in a day and
        have no regrets about it. Honestly these days I am not even reading that much anymore cause I have trouble balancing it and
        my actual responsibilities, especially when the book is good. I want to highlight a few of my favs here. If you've read any of them as well,
        I am always happy to talk about them. 
      </p>
      <h2>Categories</h2>
      <h3></h3>
      <p>
      </p>
      <h2>What I am looking for</h2>
      <p>
        Recently I have a real niche I am looking for with books. I want some more relatable fantasy settings with lower stakes.
        The world doesn't need to end, I don't need the characters to be once-in-a-century heroes. Character-focused stories with interesting
        worldbuilding, bonus points for a darker fantasy theme in more of a slice-of-life setup with some romance added on top (ideally slow-burn).
        I am yet to find a gem like that so if you have a recommendation I would be super grateful.
      </p>
      <h2>Everything I read</h2>
      <p>In no particular order</p>
    </>
  )
}

export default Body
