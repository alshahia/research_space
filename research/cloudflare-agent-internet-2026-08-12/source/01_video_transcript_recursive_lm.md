# Source: YouTube Video Transcript #2

- **Video URL:** https://www.youtube.com/watch?v=k2rkLm1eA9k&t=381
- **Title:** The 10,000-Star Harness That Beat Human Experts
- **Channel:** (per transcript — single-author research channel; verifies the prior video on context rot)
- **Retrieved:** 2026-08-13 (transcript provided by user)

---

## Transcript (verbatim, user-supplied)

```
The 10,000-Star Harness That Beat Human Experts
0:00
Four days ago, a repository that had
0:02
been sitting on GitHub since May went to
0:04
number one on trending. 10,000 stars on
0:06
it now, nearly a thousand forks and an
0:09
MIT license, so you can read every line
0:11
of it. It is not a model. There are no
0:13
weights anywhere in it. It is a harness,
0:16
the loop that wraps a model. And its
0:18
headline claim is that it beat human
0:19
experts on a benchmark designed to
0:21
resist exactly this kind of trick. That
0:24
claim is the smaller story. The bigger
0:26
one is the idea underneath it and where
0:28
that idea came from. Because the last
0:30
video on this channel ended on a thread
0:32
that was deliberately left hanging and
0:34
this is it. It was about context rot.
0:36
The measured repeatable fact that giving
0:38
a model more input makes its answers
0:40
worse. Chroma put 18 Frontier models
0:43
through it in a 2025 study and watched
0:46
accuracy fall long before any window
0:48
filled. A 200,000 token window already
0:50
degrading around 50,000. That is
0:53
storage, not comprehension. That video
0:56
pointed at one research idea and said
0:58
the direction was right, but that nobody
1:00
had shipped it. Four days ago, it
1:02
shipped. So, this video is that answer.
1:04
And the answer turned out stranger than
1:06
I expected. The idea is called a
What is a Recursive Language Model? (Context as a Variable)
1:08
recursive language model. The whole
1:10
thing turns on one word and the word is
1:13
variable. Here's what happens today.
1:15
When you hand a model something long,
1:17
all of it becomes tokens inside one
1:19
window and every token competes with
1:21
every other token for the same finite
1:23
pool of attention. Chroma measured that
1:25
decay and said plainly it could not
1:27
explain the mechanism, but the room is
1:29
still there. What runs short is
1:31
attention. A recursive language model
1:33
refuses the paste. The long input never
1:36
enters the model's context at all. It
1:38
gets assigned to a variable inside a
1:40
live Python session and the model is
1:42
handed the variable name. So the root
1:44
model starts the task effectively blind.
1:46
It cannot see the document, the
1:48
repository, the transcript. What it can
1:50
do is write code that touches them. Say
1:52
the input is a codebase. The model
1:54
writes a line of Python, list every
1:56
file, keep the ones over 10 kilob, print
1:59
the first 200 characters of each. The
2:01
session runs it and returns that, not
2:04
the codebase. It now knows the shape of
2:06
a thing it has not read, which is enough
2:08
to decide what to look at next. And that
2:10
decision is where the recursion starts.
Spawning Child Agents: Parallel Clean Context Windows
2:13
In prime agent, the recursive call is an
2:15
ordinary Python function. You hand it a
2:17
task in plain English and a name and it
2:19
spawns a child agent with its own model,
2:21
its own kernel, and its own empty
2:22
context. Review the authentication flow
2:24
for security issues. Name it o reviewer.
2:27
The call returns immediately, not with
2:29
an answer, with a handle. The child
2:30
works somewhere else and replies by
2:32
message when it has something. So the
2:33
parent can fire off an API review, a
2:36
test coverage review, and a slow
2:38
integration audit in three lines, end
2:40
its turn, and go do something else while
2:43
three separate contexts fill up instead
2:46
of one. That is the whole inversion.
2:48
Context stops being something the model
2:49
drowns in and becomes something it
2:51
queries. The prompt is not a prompt
2:53
anymore. It is a variable, which sounds
OOLONG Benchmark: How GPT-5 Mini Beat Plain GPT-5 by 34 Points
2:57
elegant, and elegance is cheap. The real
2:57
question is whether a model that never
2:59
read the document can beat a model that
3:01
did. The paper's answer runs on four
3:03
long context benchmarks. The clearest is
3:06
O long where the questions cannot be
3:09
answered by finding one line. You have
3:11
to aggregate across the whole document.
3:13
At 132,000 tokens, GPT5 mini wrapped in
3:19
the recursive harness beat plain GPT5 by
3:22
more than 34 points. 34 points of
3:23
accuracy, which works out to about 114%
3:26
relative. Read that pairing again
3:29
because it is the whole argument. the
3:32
small model blind driving Python against
3:34
the large model that read every word at
3:36
roughly the same API cost per query.
3:39
Push the same test to 263,000 tokens and
3:42
the gap narrows but holds 15 points and
3:46
by then the recursive version is the
3:47
cheaper of the two per query against the
3:50
scaffolds people actually ship. The
3:52
paper reports medians on GPT5, 26%
3:55
better than compaction,
3:57
130% better than a code agent making sub
3:59
calls, 13% better than clawed code, and
4:02
then there is the cost table, which
4:04
rarely gets quoted. Across those four
4:06
benchmarks, the recursive runs cost
4:08
between 11 cents and 99 cents a query.
4:11
Claude code on the same tasks cost
4:13
between 98 and $6.75. The ceiling moved
4:17
as well. The authors report feeding it
4:19
past 10 million tokens without the usual
4:21
collapse, two orders of magnitude beyond
4:23
the window the model advertises. by then the recursive version is the
3:47
cheaper of the two per query against the
3:50
scaffolds people actually ship. The
3:52
paper reports medians on GPT5, 26%
3:55
better than compaction,
3:57
130% better than a code agent making sub
3:59
calls, 13% better than clawed code, and
4:02
then there is the cost table, which
4:04
rarely gets quoted. Across those four
4:06
benchmarks, the recursive runs cost
4:08
between 11 cents and 99 cents a query.
4:11
Claude code on the same tasks cost
4:13
between 98 and $6.75. The ceiling moved
4:17
as well. The authors report feeding it
4:19
past 10 million tokens without the usual
4:21
collapse, two orders of magnitude beyond
4:23
the window the model advertises. Then
4:25
they went further and trained a model
4:27
around the pattern. An 8 billion
4:29
parameter QN fine-tuned on a thousand
4:31
recursive trajectories, beat its own
4:32
base by about 28% across four tasks and
4:36
walked up to vanilla GPT5 on three long
4:38
context ones. So, how does an idea like
4:41
that go from nowhere to a billion dollar
4:44
company's flagship product in under a
4:46
year? and why did a company get there
4:48
before any of the labs? It started as a
The MIT Origin: Alex Zhang & Prime Intellect's $130M Series A
4:50
blog post in October 2025 written by a
4:53
first year PhD student at MIT named Alex
4:56
Jang. He was 24 about 6 weeks into the
4:59
degree. His description of the bug is
5:01
still the best one anyone has written. I
5:03
know my model can do task A. I know it
5:05
can do task B. Give it both at once and
5:07
it does worse than it did on either
5:09
alone. By the last day of the year, that
5:11
post was an arcs paper with his two
5:13
advisers on it. revised twice through
5:15
May and still worth saying published to
5:18
no conference at all. While that was
5:20
happening, a company called Prime
5:22
Intellect was building the same idea
5:23
into its own stack. In January, it put
5:25
out a post titled Recursive Language
5:27
Models, the paradigm of 2026. In July,
5:30
that company closed a $130 million
5:33
series A at a billion valuation on
5:35
roughly a hundred million in annualized
5:37
revenue and 6,000 customers. Four weeks
5:40
later, it shipped Prime Agent and Alex
5:43
Jen's name is on the launch post because
5:45
he is a research fellow there. Now, the
5:48
person who wrote the blog post is inside
5:49
the company that turned it into a
5:51
product. The repository is older than
5:53
the announcement, by the way. Created
5:55
the 8th of May, 41 releases since
5:57
mid-May, version 0.7 on the day they
6:00
finally told anyone. And in the last day
6:02
alone, it picked up about 3,000 more
6:04
stars. But recursion is only half of
Self-Refining Harnesses: The Princeton Pokemon Blue Experiment
6:06
what shipped. The other half comes from
6:08
a different paper, and that paper is
6:09
about Pokemon. A team led by Seth Carton
6:12
at Princeton built a harness that
6:14
finished Pokemon Blue Yellow Legacy on
6:15
hard mode, and Crystal, the last one,
6:18
without losing a single battle. A human
6:19
kept refining the harness as it played.
6:21
Their follow-up took the human out. The
6:24
agent alternates between playing and
6:27
rewriting its own prompt, its own
6:28
skills, its own memory, and its own sub
6:30
agents inside a single run with no reset
6:33
between attempts. in prime agent that
6:35
arrives as a slash command called
6:37
refine. It reads back what just
6:39
happened, proposes small evidence-backed
6:41
edits to its own scaffolding and writes
6:44
them to disk with a snapshot you can
6:46
roll back. There is one wall it cannot
6:48
cross. The base system prompt is
6:50
immutable. Everything built on top of
6:55
it. Memories, skills, sub aent
6:57
definitions is the agents to rewrite.
ARC-AGI 3 Benchmark Shock: 30.2% to 95.5% (Beating Humans)
7:00
Which brings us back to the number I
7:01
skipped past at the start and to the
7:05
fight that has been going on around it
7:06
since. ARK AGI3 is not a puzzle set. It
7:08
drops an agent into 25 interactive games
7:10
it has never seen and scores how
7:11
efficiently it works out the rules and
7:13
wins. The metric is relative human
7:14
action efficiency. Take the actions a
7:17
competent human needed, divide by the
7:19
actions the agent needed and square the
7:20
result. Take twice as many actions as a
7:22
human and you score a quarter. The
7:25
squaring is the design. Brute force
7:27
cannot buy a score here. An agent that
7:29
flails its way to a win scores close to
7:31
nothing, which is exactly what makes
7:32
this benchmark hard to game with a
7:34
scaffold. On the 24th of July, Ark Prize
7:37
ran Claude Opus 5 on the public set
7:39
themselves and published 30.2%.
7:41
That was state-of-the-art, nearly four
7:44
times the previous record. 12 days
7:45
later, Prime Intellect ran the same
7:47
model on the same 25 games inside their
7:49
harness and reported 95 1.5%. The human
7:52
expert baseline is 95.4.
7:54
same weights, same games, same metric,
7:57
65 points of difference, and the only
7:59
thing that changed was the loop around
8:01
the model. So, which of those two
8:08
numbers is Claude Opus 5? And if the
8:10
answer turns out to be that it depends
8:12
what you wrapped it in, what exactly has
8:14
the industry been ranking for the last 3
8:16
years? Now, the harness result is
8:18
self-reported and Prime Intellect is not
8:20
on the official leaderboard. That was
8:22
the first thing people said, and it is
Schema & Ryan Brown: 99.86% Accuracy on 5.5x Fewer Tokens
8:24
fair. The second thing is harder on the
8:26
announcement. Three weeks earlier, a
8:28
group from Impossible Research,
8:30
Berkeley, and Carnegie Melon had
8:31
published a harness called Schema,
8:33
hitting about 99% on the same public
8:35
set. And an engineer named Ryan Brown,
8:38
working on it in his own time, published
8:39
an agent scoring 99.86 across all 25
8:41
games, using five and a half times fewer
8:43
tokens than the previous best. His
8:43
tokens than the previous best. His
8:45
repository has eight stars, so the human
8:48
line had already been crossed twice by
8:49
people without a launchpost. A harness
8:51
beating the model it wraps is not the
8:52
news here. It is the background
8:54
condition. The sharpest objection is
8:56
about the rules. That benchmark is
8:58
explicitly fshot. And a harness that
9:00
rewrites itself between attempts may be
9:02
taking more tries than the rules allow.
9:04
One commenter on the schema thread put
9:05
it as bluntly as it can be put. This is
9:07
moving the goalpost by defeating the
9:08
entire point of the test. The language
9:9:09
model equivalent of running a chess
9:11
engine on the side. The reply to that
9:13
is not weak either. To write a working
9:15
simulator of a game you were not shown,
9:16
you have to have learned the rules of
9:17
that game, which is the thing the
9:19
benchmark was trying to measure in the
9:20
first place. Set the games aside,
9:22
though, because there is a second table
9:24
on that launch post, and it is the one
9:25
that matters if you write software for a
9:27
living. Nine long context evaluations.
9:30
With Opus 5, Prime Agent beat Claude
9:31
Code on six of the nine. With GPT 5.6
9:35
Saul, it beat Codeex on six of nine.
9:38
With an open model GLM 5.2, two, it beat
9:41
the harness it was forked from on eight
9:43
of nine. Those are the vendor's own
9:45
numbers on the vendor's own page, and
9:47
most of the margins are hundreds. To
9:48
their credit, the same page says their
9:50
own runs of Claude code and codecs came
9:52
out worse than the official ones, so
9:53
they use the official ones instead. The
Security Warning: Model-Written Python & Admin Escalation
9:56
product also has teeth pointed at you.
9:58
It runs model written Python with your
10:00
permissions, and its own documentation
10:02
says in a warning box that it is not a
10:05
security sandbox. In their own factorial
10:06
tests, the self-improvement loop worked
10:09
out that it could spawn resources
10:10
straight into its assembly machines
10:13
through an admin console instead of
10:15
building the factory. It had been told
10:17
not to cheat. It refined its way into
10:18
cheating anyway. And the research has a
10:20
ceiling of its own. A March reproduction
10:23
found one level of recursion helps and
10:24
two levels start overthinking. A 3 and
10:25
1/2 second retrieval turning into nearly
10:28
minutes of work. So here is the
Final Verdict: Is the Harness Worth 65 Benchmark Points?
10:30
verdict and it is not the one the
10:31
headline number is selling. Recursion
10:33
over context as a variable wins, and it
10:35
wins for almost anyone whose work
10:36
outlives a single prompt. The receipts
10:38
have been the same the whole way. A
10:40
small blind model beating a large
10:41
reading 1 by 34 points at the same price
10:43
per query costs an order of magnitude
10:44
apart. And one set of weights scoring 30
10:46
and 95 depending on the loop around
10:48
them. What it loses is narrow and real.
10:51
One document under about 30,000 tokens
10:53
answered once. Paste it in. do not build
10:55
a recursive pipeline to read a PDF and
10:57
the paradigm is not the product. Prime
10:59
Agent is the best showcase recursion has
11:01
and it is 4 days old, unsandboxed and
11:03
scored by the people who built it. Take
11:06
the idea now, take the install later
11:07
because the thing worth being angry
11:10
about is not a company. 11:12
about is not a company. It is the habit
11:14
of scoring the model and forgetting the
11:16
scaffold. Every leaderboard row you have
11:18
ever read is a model and a harness and
11:20
only one of them gets a name. Which
11:21
leaves the uncomfortable question. If
11:23
the loop around the model is worth 65
11:24
points, what is the model worth?
```