// The write-up for /interests/fantasy-books, rendered inside PostPage's reading column.
// Plain <p> and <h2>; the template styles them. Images go in this folder:
// import shot from './shot.png?figure', then <Figure src={shot} alt="..." />.
// Book titles go in <cite>, which the template highlights.

import BookCovers from '../../components/BookCovers'
import Figure from '../../components/Figure'
import bookshelf from './bookshelf.webp?figure'
import panLodowegoOgrodu from './covers/pan-lodowego-ogrodu.webp?cover'
import redRising from './covers/red-rising.webp?cover'
import dune from './covers/dune.webp?cover'
import jaInkwizytor from './covers/ja-inkwizytor.webp?cover'
import ostatnieZyczenie from './covers/ostatnie-zyczenie.webp?cover'
import aGameOfThrones from './covers/a-game-of-thrones.webp?cover'
import fredTheVampireAccountant from './covers/fred-the-vampire-accountant.webp?cover'
import aDeadlyEducation from './covers/a-deadly-education.webp?cover'
import theWayOfKings from './covers/the-way-of-kings.webp?cover'
import theNameOfTheWind from './covers/the-name-of-the-wind.webp?cover'
import rangersApprentice from './covers/rangers-apprentice.webp?cover'
import brotherband from './covers/brotherband.webp?cover'
import opowiesciZMeekhanskiegoPogranicza from './covers/opowiesci-z-meekhanskiego-pogranicza.webp?cover'
import geniusPrince from './covers/genius-prince.webp?cover'
import lordOfTheMysteries from './covers/lord-of-the-mysteries.webp?cover'

// one entry per series, so books owned twice or split into volumes count once
const everythingIRead: { title: string; author: string; note?: string }[] = [
  { title: 'The Stormlight Archive', author: 'Brandon Sanderson' },
  { title: 'Mistborn', author: 'Brandon Sanderson' },
  { title: 'Elantris', author: 'Brandon Sanderson' },
  { title: 'Warbreaker', author: 'Brandon Sanderson' },
  { title: 'The Rithmatist', author: 'Brandon Sanderson' },
  { title: 'White Sand', author: 'Brandon Sanderson', note: 'audiobook' },
  { title: 'The Kingkiller Chronicle', author: 'Patrick Rothfuss' },
  { title: 'The Witcher', author: 'Andrzej Sapkowski' },
  { title: 'Ja, Inkwizytor', author: 'Jacek Piekara' },
  { title: 'Opowieści z meekhańskiego pogranicza', author: 'Robert M. Wegner' },
  { title: "Ranger's Apprentice", author: 'John Flanagan' },
  { title: 'The Brotherband Chronicles', author: 'John Flanagan', note: 'first 6 books' },
  { title: 'Pendragon', author: 'D. J. MacHale' },
  { title: 'The Heroes of Olympus', author: 'Rick Riordan' },
  { title: 'Magnus Chase and the Gods of Asgard', author: 'Rick Riordan', note: 'first 2 books' },
  { title: 'The Chronicles of Narnia', author: 'C. S. Lewis' },
  { title: 'The Black Magician Trilogy', author: 'Trudi Canavan' },
  { title: 'The Black Company', author: 'Glen Cook' },
  { title: 'Cień utraconego świata', author: 'James Islington' },
  { title: 'Bramy Światłości', author: 'Maja Lidia Kossakowska' },
  { title: 'Teatr Węży', author: 'Agnieszka Hałas' },
  { title: 'The Demon Cycle', author: 'Peter V. Brett' },
  { title: 'Zła krew, Dzika krew, Prawdziwa krew', author: 'Sally Green' },
  { title: 'Zew Cthulhu', author: 'H. P. Lovecraft' },
  { title: 'Christine', author: 'Stephen King' },
  { title: 'Kolekcjoner', author: 'Alex Kava' },
  { title: 'A Song of Ice and Fire', author: 'George R. R. Martin' },
  { title: "Assassin's Apprentice", author: 'Robin Hobb' },
  { title: 'Six of Crows duology', author: 'Leigh Bardugo' },
  { title: 'The Gentleman Bastard Sequence', author: 'Scott Lynch', note: 'first 3 books' },
  { title: 'The Scholomance', author: 'Naomi Novik' },
  { title: "The Queen's Assassin", author: 'Melissa de la Cruz', note: 'first 2 books' },
  { title: 'A Court of Thorns and Roses', author: 'Sarah J. Maas', note: 'first 3 books' },
  { title: 'Throne of Glass', author: 'Sarah J. Maas' },
  { title: 'A Forest of Vanity and Valour', author: 'A. P. Beswick' },
  { title: 'The Blade Itself', author: 'Joe Abercrombie' },
  { title: 'The Cruel Prince', author: 'Holly Black' },
  { title: 'The Atlas Six', author: 'Olivie Blake' },
  { title: "Empire's Ruin", author: 'Brian Staveley' },
  { title: 'Kings of the Wyld', author: 'Nicholas Eames' },
  { title: 'Spellslinger', author: 'Sebastien de Castell' },
  { title: 'Lord of the Mysteries', author: 'Cuttlefish That Loves Diving' },
  { title: 'Circle of Inevitability', author: 'Cuttlefish That Loves Diving', note: '70% through' },
  { title: 'Classroom of the Elite', author: 'Syougo Kinugasa', note: '25 volumes, up to Year 2 Volume 4' },
  { title: "The Genius Prince's Guide to Raising a Nation Out of Debt", author: 'Toru Toba' },
]

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
      <h3>Sci-fi</h3>
      <p>
        Not my favorite category, but it has its fair share of good picks, especially with the planet exploration/post-apo options. I have read a few, but off the top of my head{' '}
        <cite>Pan Lodowego Ogrodu</cite> by Jarosław Grzędowicz was interesting but super confusing and <cite>Red Rising</cite> by Pierce Brown was really great but did lose me after the 5th book.
        This one was especially interesting cause I started reading it as a kid, but the book belonged to my brother's ex so I only read one and didn't get to continue, but it
        stayed in my mind, so I actually finished it as a full-cast audiobook in 2025. Currently I have <cite>Dune</cite> on my radar, after hearing a lot of recommendations.
      </p>
      <BookCovers
        books={[
          { src: panLodowegoOgrodu, title: 'Pan Lodowego Ogrodu' },
          { src: redRising, title: 'Red Rising' },
          { src: dune, title: 'Dune' },
        ]}
      />
      <h3>Dark Fantasy</h3>
      <p>
        One of the best in my opinion if done correctly. I would love to give more English examples here, however my all-time favorite has to be <cite>Ja, Inkwizytor</cite> or <cite>I, Inquisitor</cite> by
        Jacek Piekara. The setting in Europe with alternative history made it way easier to picture in my mind and the grim, unapologetic representation
        of the world made it seem real. Not to mention all the interesting secrets that seem to dwell inside the world. My only complaint is pacing, the books are set at random times
        in non-chronological order, making it difficult to follow the progress of our protagonist(s). Next one is a classic, <cite>The Witcher</cite> by Andrzej Sapkowski. I am pretty sure it counts as dark fantasy.
        It's a staple of Polish literature and it's way better in the native language. I had the pleasure to reread it after a long while, the finishing books get kind of confusing with whatever Ciri
        was doing, but overall a beautifully written series. From non-Polish writers, <cite>Game of Thrones</cite>. I am still waiting for <cite>The Winds of Winter</cite>...
      </p>
      <BookCovers
        books={[
          { src: jaInkwizytor, title: 'Ja, Inkwizytor' },
          { src: ostatnieZyczenie, title: 'Ostatnie życzenie (The Witcher)' },
          { src: aGameOfThrones, title: 'A Game of Thrones' },
        ]}
      />
      <h3>Modern Fantasy</h3>
      <p>
        I have no idea if that's the correct way to name this category. A fair bit of these I have listened to as audiobooks, which I don't keep a list of, so if I forgot them so be it. The one that
        stuck in my mind was the recent one, <cite>Fred the Vampire Accountant</cite> by Drew Hayes. Still waiting for the final chapter to be released with full cast, but overall a very cosy read.
        The main character just seems to be a chill guy that is easy to relate to and the characters overall are pretty interesting. <cite>The Scholomance</cite>, which is basically modern Harry Potter,
        was quite alright as well.
      </p>
      <BookCovers
        books={[
          { src: fredTheVampireAccountant, title: 'Fred the Vampire Accountant' },
          { src: aDeadlyEducation, title: 'A Deadly Education (The Scholomance)' },
        ]}
      />
      <h3>High Fantasy</h3>
      <p>
        Anything that comes from the hand of Brandon Sanderson is pretty much guaranteed to be GOATED, the magic systems this man creates are amazing. My only complaint is that everything is so high stakes.
        Favorite of his has to be <cite>The Stormlight Archive</cite>, hands down one of my fav series of all time, I both read it and listened to the audiobook. I have no idea how he does it so well AND for
        so many books, while also keeping most of it in one universe kind of, which is by the way soooooo confusing, though it gives plenty of (cue the meme of Leonardo DiCaprio pointing at the TV) moments when
        you recognise the character from a different book. <cite>The Kingkiller Chronicle</cite> by Patrick Rothfuss I remember being everything a fantasy book should be and is on my reread list if only
        <cite> The Doors of Stone</cite> would finally release...
      </p>
      <BookCovers
        books={[
          { src: theWayOfKings, title: 'The Way of Kings (The Stormlight Archive)' },
          { src: theNameOfTheWind, title: 'The Name of the Wind (The Kingkiller Chronicle)' },
        ]}
      />
      <p>
        A few honourable mentions, as a kid I loved <cite>Ranger's Apprentice</cite> and, set in the same universe, <cite>Brotherband</cite>, both by John Flanagan. Amazing world building, interesting stories, just
        no magic or grim mysteries. In any case a super cosy read, it was actually my first EVER book. I am planning on catching up on new releases at some point too (I stopped at book 16). Also
        book 12 was one of the biggest disappointments ever, and not for the quality of the story, but for what felt like an unnecessary plot twist even though the writing still stayed just as good.
        Another good one is <cite>Opowieści z meekhańskiego pogranicza</cite> by Robert M. Wegner, a lot of interesting and unique characters in a shared universe make it impossible not to be excited
        when their stories intertwine.
      </p>
      <BookCovers
        books={[
          { src: rangersApprentice, title: "Ranger's Apprentice" },
          { src: brotherband, title: 'Brotherband' },
          { src: opowiesciZMeekhanskiegoPogranicza, title: 'Opowieści z meekhańskiego pogranicza' },
        ]}
      />
      <h3>Non-Western books</h3>
      <p>
        It's a new category for me, I have read a few light novels with the best one for me being <cite>The Genius Prince's Guide</cite> by Toru Toba. It was a chill and funny story, sadly also not finished. Another one I read
        after watching the anime is a Chinese novel (or web novel), <cite>Lord of the Mysteries</cite>, which was amazing, especially the early chapters where the story didn't move too fast. Interesting characters, mysteries
        and plot twists all in one package with a unique "magic" system. The only thing it was missing for me was some romance and, to be frank, more focus on the other Tarot members. I was really hoping that the
        whole table would be filled, and I know about the next book, I read 70% of it, but it's not the same sadly. In any case LotM is an amazing book, so Praise the Fool for it 🙏
      </p>
      <BookCovers
        books={[
          { src: geniusPrince, title: "The Genius Prince's Guide" },
          { src: lordOfTheMysteries, title: 'Lord of the Mysteries' },
        ]}
      />
      <h2>What I am looking for</h2>
      <p>
        Recently I have a real niche I am looking for with books. I want some more relatable fantasy settings with lower stakes.
        The world doesn't need to end, I don't need the characters to be once-in-a-century heroes. Character-focused stories with interesting
        worldbuilding, bonus points for a darker fantasy theme in more of a slice-of-life setup with some romance added on top (ideally slow-burn).
        I am yet to find a gem like that so if you have a recommendation I would be super grateful.
      </p>
      <h2>Everything I read (still have a copy of)</h2>
      <Figure src={bookshelf} maxWidth={420} alt="My bookshelf, four shelves of mostly fantasy series" />
      <p>In no particular order</p>
      <ul>
        {everythingIRead.map(({ title, author, note }) => (
          <li key={title}>
            <cite>{title}</cite>, {author}
            {note && ` (${note})`}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Body
