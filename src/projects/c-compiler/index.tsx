// The write-up for /work/c-compiler, rendered inside PostPage's reading column.
// Plain <p> and <h2>; the template styles them. Images go in this folder:
// import shot from './shot.png?figure', then <Figure src={shot} alt="..." />.

function Body() {
  return (
    <>
      <p>
        A compiler that takes a small subset of C and turns it into x86 assembly, written in
        Rust. It's an educational project: I wanted to understand what actually happens between
        writing code and running it, and building one myself, chapter by chapter, seemed like
        the best way to find out.
      </p>

      <h2>How far it gets</h2>
      <p>
        Not far to be honest, I have started this project to learn about Rust, but I quickly found out that
        building a whole compiler from scratch is a bit too much of a task for a language I am not familiar with yet.
        That's why I switched my focus to another project called Muzeyt, which turned out to be better for learning
        Rust basics, that's why this project ended up being scrapped.
      </p>

      <h2>A bit about architecture</h2>
      <p>
        There are three stages. The lexer reads the source file and splits it into tokens,
        matching each kind of token with its own regular expression. The parser turns those
        tokens into a syntax tree. Then each node of the tree writes out its own piece of
        assembly: the function its label, the expression its value in the eax register, and
        each unary operator the instruction that changes it.
      </p>
      <p>
        The parser is the part I rewrote the most, three times in the first month. Instead of
        hard-coding how each piece of C is parsed, the grammar is stored as data: every kind
        of node has a tree of rules for what may follow, and the parser tries each branch in
        turn until one fits. Adding something to the language means adding rules rather than
        writing more parsing code. This turned out to be overengineered and didn't support future
        features as well as I expected it.
      </p>

      <h2>What it taught me</h2>
      <p>
        Grammars and syntax trees stop being abstract once you have to build them, and
        working with a tree of nodes is a good way to run into Rust's ownership rules head
        first. A nice project all in all, but the complexity made the learning outcome
        I was going for become too blurry so I decided not to continue.
      </p>
    </>
  )
}

export default Body
