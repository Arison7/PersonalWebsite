// The write-up for /work/messager-api, rendered inside ProjectPage's reading column.
// Plain <p> and <h2>; the template styles them. Images go in this folder:
// import shot from './shot.png?figure', then <Figure src={shot} alt="..." />.

function Body() {
  return (
    <>
      <p>
        MessagerApi is a chat app: you sign up, create a chat, share its invite link, and
        messages show up for everyone in it as they're sent. I built it as a full-stack
        showcase, with a Django back end and a React and TypeScript front end, to prove I could
        take something from the database all the way to the screen.
      </p>
      <h2>Idea behind</h2>
      <p>
        So this was one of my first "bigger" projects or at least a whole application that I decided
        to build. I picked live chat because it's a common feature that seemed complex enough for a project. 
        I have to say it was a pleasant one to work on and it did teach me a fair bit about designing bigger 
        architecture and scaling everything with tough choices being made along the way.
      </p>
      <h2>A bit about architecture</h2>
      <p>
        Django serves three pages. Login and register are lightly modified versions of
        Django's own login view and UserCreationForm. The third is the app itself: a React
        front end, styled with Sass, built and served through Django's static files, which
        talks to a REST API made with Django REST framework.
      </p>
      <p>
        Underneath there are two models besides Django's User. A Chat has a name, its members
        and a random invite hash that works as the link to join it. A Message has its text,
        author, chat and timestamps for when it was created and last edited. When the last
        member leaves a chat, the chat deletes itself.
      </p>

      <h2>Real-time messages</h2>
      <p>
        A chat app that needs refreshing isn't much of a chat app, so messages travel over
        WebSockets using Django Channels. Every chat has its own channel group; when someone
        sends, edits or deletes a message, the consumer broadcasts that change to everyone in
        the group, and the front end updates its list of messages to match.
      </p>

      <h2>The front end</h2>
      <p>
        Honestly, one part I am glad we have AI for now, as you can see I am not a designer so 
        the "clear glass" design I was going for missed its mark by a fair margin. 
        Aside from questionable stylistic choices the front-end was designed with all the best
        practices in mind to rerender the least amount of components possible for each update.
      </p>

      <h2>AI usage</h2>
      <p>
        None lol, it was way before AI was a thing, but I would imagine at least one person reading
        this would have thought "why not use AI for front-end". We truly live in too fast-changing times.
      </p>
    </>
  )
}

export default Body
