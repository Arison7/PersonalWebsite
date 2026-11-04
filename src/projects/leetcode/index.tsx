// The write-up for /work/leetcode, rendered inside PostPage's reading column.
// Plain <p> and <h2>; the template styles them. Images go in this folder:
// import shot from './shot.png?figure', then <Figure src={shot} alt="..." />.

function Body() {
  return (
    <>
      <p>
        Not a project in the usual sense, but probably the thing I've put the most hours into.
        From spring 2022 until the summer of 2023 I solved LeetCode problems almost every day:
        479 of them in total, 105 easy, 285 medium and 89 hard. The idea was to simply learn algorithms
        and get an early start for the interview's grind.
      </p>

      <h2>The streak</h2>
      <p>
        2022 was the big year: 639 submissions over 276 active days, with a longest streak of
        139 days in a row. From June 2022 to June 2023 I finished the daily challenge every
        single month, which is what the badges under the 2022 grid are. In 2023 I kept it up
        until July, the reason why the days streak is lower than badges because on the days when
        i couldn't code I would just do the reverse time option in leetcode to get the badge anyway.
        The grind ended when I picked up a part time summer job before university, ain't no way i have a time 
        to solve leetcode after 16 h shift in a resturant.
      </p>

      <h2>Languages</h2>
      <p>
        Most of my solutions are in C++ (323 problems), with Python second (152). C++ makes you
        think about what the code actually does with memory and time, while Python was for the difficult
        problems to workout the idea or to learn the idea if it was something i didn't get at all.
        Later on I solved a handful in Rust (19) while learning it. 
      </p>
      <h2>The reality</h2>
      <p>
        Solving a problem every day is difficult while also studying and doing other things. Sometimes I didn't 
        find the solution in time i had for that day and had to get some hints from communities. Sometimes I got 
        stuck on not optimized solution. Other times the best solution came to me obviously. I grasped many concepts, 
        but some have eluded me no matter how many times I tried. I would imagine I don't even remember many solutions 
        at this point and might have troubles solving them again. What's not lost however is the way I look at problems.
        Honestly I am no leetcode wizard, but it did help me grasp the ideas and fundamentals that i can see myself using even now.
      </p>
      <p>
        Was it worth the time ?
        Probably not, admitedally just solving problems everyday is not enough to learn difficult concepts, that's why I 
        decided to pursued higher education how that turned out is whole different story...
      </p>
      <p>
        Do i regret ?
        Not really i just wished I have put more effort into it, the 15 badges still look kind of sick though so I am happy about that
        if nothing else. I am also like 2000 points away from redeeming a T-shirt which is something I kind of want to do in the future
        maybe in a different language as well just for the fun of it, not to prove anything at this point.
      </p>
    </>
  )
}

export default Body
