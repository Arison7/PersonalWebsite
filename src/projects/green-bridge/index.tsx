// The write-up for /work/green-bridge, rendered inside PostPage's reading column.
// Plain <p> and <h2>; the template styles them. Images go in this folder:
// import shot from './shot.png?figure', then <Figure src={shot} alt="..." />.

function Body() {
  return (
    <>
      <p>
        Green Bridge is my HZ Honours Programme project, done together with Alisiia
        Mishchenko. It asks one question: how can the measurable benefits of shinrin-yoku, or
        forest bathing, be brought out of distant forests and into the everyday green spaces
        of European cities? The project is still in progress.
      </p>

      <h2>A pattern language</h2>
      <p>
        Instead of a report, the answer is a library of patterns, in the form Christopher
        Alexander set out: each one names a recurring problem in the city, the reasoning that
        makes a solution necessary, and an instruction. Every pattern goes through the same
        four steps, a literature review, data gathering, expert interviews and then the
        writing itself, and has to be evidence-based, fast to build, low cost and measurable.
      </p>

      <h2>The journey</h2>
      <p>
        I have been working on this project with one of my friends from university
        (you can learn more about her on the website). We are the only two people working on the
        project and we are responsible for everything that's happening from research
        through execution to impact. Managing the whole project with budget, talking with interested
        parties and stakeholders is a really fascinating experience and it makes me really
        glad I took this project. I don't want to get into details of it here though, I believe
        it's way better described on the website.
      </p>
    </>
  )
}

export default Body
