// The write-up for /work/muzeyt, rendered inside ProjectPage's reading column.
// Plain <p> and <h2>; the template styles them. Images go in this folder:
// import shot from './shot.png?figure', then <Figure src={shot} alt="..." />.

function Body() {
  return (
    <>
      <p>
        Muzeyt is a music player that lives in the terminal. You drop songs into a folder, start
        it with cargo run, and get a queue you can move through with vim keybinds, like god intended. I built it
        to get properly comfortable with asynchronous Rust.
      </p>

      <h2>Original idea</h2>
      <p>
        The "yt" in the name stands for YouTube (quite obviously). The original plan was to search YouTube Music and play
        songs straight from it, but there's no YouTube Music API that lets you actually stream
        a track, so instead of breaking ToS for this example app I decided to scrap that part and simply reduce the scope of the project.
        Thus moving focus from being a finished product to being a clean, well
        structured piece of async code. 
      </p>

      <h2>A bit about architecture</h2>
      <p>
        The app is split into a few parts with one job each: the App that owns the state, a
        Queue of songs, a Navigator that moves through it, the audio stream and the UI. They
        don't reach into each other. Instead they talk through Tokio channels: mpsc for
        messages like "skip" or "stop", and watch for state the UI only needs the latest
        version of. The interface is drawn with ratatui, and Symphonia handles decoding, so it
        plays more than one audio format.
      </p>

      <h2>What it taught me</h2>
      <p>
        Most of the interesting problems were about ownership across .await points: holding a
        mutable borrow while waiting on something is exactly what the compiler won't let you
        get away with, and working around it pushed me towards message passing instead of
        shared state. The whole thing is written without any unsafe code, and it has unit and
        integration tests that run with cargo test. It also did its main job well, which was making
        me comfortable with Rust syntax before my internship. Frankly speaking, if I were to write it
        again now I would have changed a lot, but for its purposes it was a good piece of software.
      </p>

      <h2>A note on AI</h2>
      <p>
        Apart from a few small questions, the one place I leaned on AI was the layout of the
        UI. I'm not much of a designer, and for simple terminal layouts it did a good job. It's
        a tool, and I'd rather say where I used it than pretend I didn't. Crazy how outdated this
        statement feels writing this article just one year later when using AI for development is 
        almost expected.
      </p>

    </>
  )
}

export default Body
