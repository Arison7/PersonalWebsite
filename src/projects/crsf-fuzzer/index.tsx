// The write-up for /work/crsf-fuzzer, rendered inside PostPage's reading column.
// Plain <p> and <h2>; the template styles them. Images go in this folder:
// import shot from './shot.png?figure', then <Figure src={shot} alt="..." />.
// TODO: add the pictures (see the placeholders below); without them the page is a wall of text.
// Technologies are bold on first mention, for skimming.

function Body() {
  return (
    <>
      <p>
        From mid February to mid June 2026 I had the pleasure of interning at the Austrian Institute of Technology (AIT),
        where I was the main developer of a <strong>CRSF</strong> fuzzer designed for a black-box flight controller (FC) of a drone:
        a tool that sends malformed messages to a drone's flight controller to find its weak spots. What made this project stand out
        for me was working on it end to end: starting with research, turning that research into design decisions and finally into a working application,
        with more research along the way whenever we hit something new.
      </p>

      <h2>A note on the NDA</h2>
      <p>
        Since the project hasn't been finished it remains property of AIT, thus I had to sign an NDA,
        meaning I am not allowed to share any code or talk about some details. With that in mind I would
        like to focus this article more on my experience and a few example problems I faced.
        In place of the code, the link at the top of this page is AIT's official confirmation of my internship, which lists what I worked on.
      </p>

      <h2>The environment</h2>
      <p>
        Since the idea is to attack a black-box flight controller, emulation was out of the question. Thankfully the team
        already had the environment mostly ready, consisting of an exposed drone's body with easy access to its components and
        a <strong>Raspberry Pi</strong> with a screen that was connected to those components in various ways, collecting and sending data. The Pi
        was also where we ran the code of the fuzzer plus a few helper programs that I built along the way, mostly for easier
        data collection. The fuzzer itself obtained data through sockets, often already cleaned by the helper programs.
      </p>
      <p>
        All the programs were written in <strong>Rust</strong> and ran as system processes on startup. Without going into too much detail, the first example
        was a revolutions per minute (RPM) measuring program that collected, shared (over a socket), visualized and persisted data from
        rotary encoders attached to the drone's motors. The second was a very simple program that set IO pins connected
        to our power source on and off, which allowed us to power-cycle the drone itself, letting the fuzzer create a clean state when it needed it.
        Our electrical engineer had planned for this far ahead, so it was possible
        to switch off just the drone even though, technically speaking, the Raspberry Pi is powered by the same cable.
      </p>
      <p>
        An interesting challenge that came from working on a physical environment was that DevOps had to be handled in a non-conventional way.
        Although I had a standalone flight controller that I used for testing by simply connecting it to my laptop wherever I was, as the project
        grew and the features being tested required the full drone's skeleton, manually replacing files via <strong>SSH</strong> became way too slow. Thus,
        through a few iterations, a new DevOps system was created. In essence the code was built and tested on the internal servers and only the built <strong>Debian package</strong>
        was later exposed to the public network, from which the Raspberry Pi was able to successfully pull it and update itself, since
        for security reasons it wasn't connected to the internal network. To keep it safe, access was split between separate keys: the Pi
        only had a read-only one, so it could download new packages but never change anything, and a short script took care of installing them.
      </p>
      {/* picture: the drone suitcase, annotated if this can be added due to NDA */}
      {/* picture: the standalone test FC */}

      <h2>Understanding the problem</h2>
      <p>
        I came from a software background, and although I know a fair bit about best practices in the security space,
        this was my first time working on a fuzzer. There was a lot to learn in the field, but thankfully my supervisor got me into a research
        mindset, which helped me a lot during the early days. As I was reading papers it made me quickly realise the uniqueness of our problem statement.
      </p>
      <p>
        A fuzzer depends on good <strong>oracles</strong> (its way of telling that an input made something go wrong). They need to know a lot about the state of the program to both explore and break it or to even know what broken
        state looks like for that matter. With a black-box we were cut off from a lot of usual methods such as code coverage, which is commonly used for emulated
        targets, or memory inspection, which can work even on black-box hardware through a debug port. However, that was out of scope,
        since we can't guarantee access to it: a real target may have read-out protection that locks the port, or the port may be
        physically removed altogether.
      </p>
      <p>
        Another thing that was missing altogether were strict rules in the Team BlackSheep Crossfire (TBS CRSF) documentation. In essence the protocol doesn't
        guarantee a response, nor does it even expect all the codes to be implemented. Furthermore, it's easily expandable, which is good for the protocol as a whole, but not so good
        when you are trying to figure out a way to efficiently scan it for potentially malfunctioning frames. This means it wasn't possible to create a tight grammar for grammar-based
        fuzzing, since in some places the rules were too vague. What we ended up with instead was inspired by research in the field: an <strong>in-code grammar</strong> representation.
      </p>

      <h2>The fuzzer in short</h2>
      <p>
        Since the project wasn't finished, the core loop of the fuzzer changed a lot and will probably keep changing in the future. By the end of my internship the system looked roughly as follows.
        Frames are generated as Rust types and sent sequence by sequence to the serial port. This is where the in-code grammar comes in: the same types are used both to build valid frames
        and to break the specification on purpose, and supporting a vendor's extension just means adding new types.
        Before the actual write, each <strong>observer</strong> (our oracles, such as the RPM readings) gets its own task to collect data in parallel to the main program.
        After the frame is written, all the observer tasks are terminated and their outputs collected to be stored and evaluated. Based on the evaluation, the frame and a few frames before it are
        stored for future exploration. If the frame caused the FC to become unresponsive, the FC is restarted. After that the frame is <strong>mutated</strong> (changed), both as a byte sequence
        (e.g. bit deletions and additions) and on the frame level, by being pushed past the bounds the specification expects (e.g. if a value is expected in the range x to y, y + 1 is provided and so on).
        The mutated frames are then added back to the queue.
      </p>
      <p>
        An important thing to mention is why both the frame during which the malfunction was noticed and the frames that preceded it are saved. We cannot know how long it takes for the consequence
        of sending a frame, or a sequence of them, to show up as a malfunction. Thus all the possible combinations have to be tested later to confirm what exactly caused it. This process
        was referred to as <strong>"Validation"</strong> and unfortunately I wasn't able to fully finish it. I still find it interesting though, and I am happy to share more about it if asked, but it is a bit too lengthy for
        this article.
      </p>
      {/* picture: the loop diagram (maybe if i redo it ) */}

      <h2>Getting async right</h2>
      <p>
        My experience with async was partly why I was able to land this internship. I find working with async really interesting and I was happy to be able to use it plenty there. There is only so much one can learn
        from an example project compared to a real-life application, and at AIT I was able to work on multiple ones, most notably the RPM measuring app, which served as a nice tutorial before the actual fuzzer.
      </p>
      <p>
        The fuzzer has a lot happening at once: observers collecting data, frames being written and the drone being power-cycled. Inside the fuzzer everything runs as <strong>Tokio</strong> tasks, with the observers
        sending their data back over <strong>channels</strong>. Once a frame is written, <strong>cancellation tokens</strong> let the observer tasks shut down smoothly. The UI lives on its own std thread that shares the same Tokio handle, so it can
        use Tokio's features and redraw itself without ever holding up the fuzzing. And because it's built on the <strong>actor pattern</strong>, the fuzzer can technically run multiple fuzzing instances in parallel if we were to
        have multiple drones set up at once.
      </p>
      <p>
        What I pulled my hair out over the most was smoothly propagating errors back to the main function, regardless of where the error was caused. That's actually a really nice constraint the project had, and after my supervisor showed it to me it's definitely
        going to be my go-to in every future project: the program should <strong>NEVER panic</strong>. So every time there is an error of any sort, it should be propagated. This means no silent failures, so errors cannot just
        stay, for example, on a task and be dropped there. They have to get back one way or another to the main flow and be presented. This makes debugging code much, much easier.
      </p>

      <h2>My supervisor</h2>
      <p>
        The principle I just mentioned was not the only thing my supervisor taught me throughout this internship, and I think it would be a disservice not to name him here.
        I had the pleasure of working under Matthias Eckhart, a postdoctoral scientist at AIT who researches the security of cyber-physical systems and earned his PhD at TU Wien with highest distinction.
        He set the direction of the project, pushed me to back every idea with research and always left room for me to argue back.
        You can find more about him and his work on <a href="https://www.matthiaseckhart.com/">his website</a>, and he is happy to give a personal reference on request.
      </p>

      <h2>Brainstorming together</h2>
      <p>
        One of the best parts of this internship, and what I enjoyed the most, was being part of the brainstorming sessions. I can confidently say that I spent hours in front of a whiteboard with the team and had fun doing so.
        It was also a really good learning experience to quickly understand the thought process of people more experienced in the field. Below is the aftermath of one of the sessions.
      </p>
      {/* picture: a whiteboard session */}

      <h2>What it taught me</h2>
      <p>
        That's a long list. For the more technical side I would once again suggest checking out
        the <a href="/Lukasz-Krysmalski-AIT-Confirmation.pdf">official confirmation</a> I got from AIT. But again, in short:
      </p>
      <ul>
        <li>Working and coordinating on a big project between multiple people, with production-grade code.</li>
        <li>Working with a research-oriented mindset: taking my time to check sources and verify information, and even contacting the authors of other projects for inspiration.</li>
        <li>More practice with safe and clean async Rust.</li>
        <li>How drones operate, how they are built and how their components communicate, as well as their points of failure.</li>
        <li>
          A bit about electrical engineering, from soldering to reading signals with a <strong>logic analyzer</strong>. Massive thanks
          to <a href="https://www.linkedin.com/in/philipp-sebastian-vogt/">Philipp-Sebastian Vogt</a> (below is my first time soldering a Y-cable).
        </li>
      </ul>
      {/* picture: a soldered Y-cable */}

      <h2>A note on AI</h2>
      <p>
        I used <strong>Claude Pro</strong> for one part of the fuzzer: turning the CRSF specification into Rust types for every frame. Writing that abstraction by hand
        would have taken months. With AI it took about two weeks. The decisions stayed mine, though. I chose how the protocol was broken down, and I
        checked every type against the specification before it went in, the same way I would treat any other source. It was a good first look at using
        AI on production-grade code. The process wasn't without headaches and days when a whole session's worth of tokens was spent on output that only
        deserved to be deleted, but it was a learning experience nonetheless.
      </p>

      <h2>Thanks</h2>
      <p>
        Aside from learning a lot, I also got to work with some really great people. Thanks once again to <a href="https://www.matthiaseckhart.com/">Matthias</a> and <a href="https://www.linkedin.com/in/philipp-sebastian-vogt/">Philipp-Sebastian</a>, and to <a href="https://www.linkedin.com/in/david-allison-infosec/">David Allison, PhD</a>,
        who somehow made the office a more fun place just by being there. Finally, a thank you to the Cyber Range team. We did not overlap much day to day,
        but every conversation we did have was a genuinely good one.
      </p>
      {/* picture: the team */}
    </>
  )
}

export default Body
