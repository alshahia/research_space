# Source: YouTube Video Transcript

- **Video URL:** https://www.youtube.com/watch?v=MNNfat_QP0E
- **Title:** Cloudflare will make 1000+ AI millionaires
- **Channel:** Greg Isenberg (@GregIsenberg)
- **Retrieved:** 2026-08-12 (transcript provided by user; metadata via YouTube oEmbed)

---

## Transcript (verbatim, user-supplied)

```
Intro
0:00
Cloudflare launched something huge around AI agents and I think a lot of people haven't really paid attention,
0:06
but I think the people that pay attention are going to be able to create businesses that monetize in a completely
0:12
new way that I think is really interesting. So, I wanted to do an episode breaking down everything. By the
0:17
end of this episode, I want you to understand three things. The first is what is Cloudflare actually doing here
0:23
in plain English around AI agents. The second is why does this create a new business model for the internet? And the
0:31
third is startup ideas. I think you should actually build on top of this. I want to show you the wedge. I want to
0:37
show you who the customer is, what the first version looks like, how I would sell it, and how I would become a real
0:43
company. The opportunity is way bigger than Cloudflare launched a thing here. The opportunity is agents are going to
0:50
need clean, trusted, useful resources to do their jobs. And the people that figure this out and launch things in the
0:57
next 18 months are going to do incredible things. I'm going to show you exactly how everything works in complain
The Old Paradigm of the Internet
1:03
English. I have no affiliation with Cloudflare. I just want to see you win. I'm rooting for you and I'll see you in
1:10
there. Enjoy the episode. [music]
1:20
Let's start with the old bargain. That's the way I think about the old bargain of the internet. For a long time, if for a
1:26
long time, if you owned a website, you let search engine crawl it because search engines sent you traffic. And
1:33
then Google would read your site, Google would index your site, someone would search, your page would hopefully show
1:39
up and then a human being would click through. Once the human being landed on your website, you would monetize that
1:45
attention. Maybe you show ads, maybe you'd capture their email, maybe you'd sell them a subscription or do some
1:51
affiliate thing. That was the trade. So the crawler got the content, the website got the visitor, the visitor got the
1:58
answer, and the model funded a massive part of the internet. Now AI agents are
2:04
changing this flow because an AI agent or AI system could read your page, pull
2:09
the useful answer, give that answer to the user, and the user might not visit your website. So the content still
2:16
created value, but the website may lose the visit. And if the website loses the visit, it loses the ad impression, the
2:24
email capture, right? The affiliate click, all that stuff, it just loses it. So that's why a lot of publishers are
2:30
upset. But I actually think the publisher conversation is only the first inning. The bigger idea is that agents
2:37
are going to use the internet in a way software uses infrastructure. So, uh,
2:43
they'll request things, they'll call tools, they'll compare products, they'll retrieve data. By the way, I'm going
2:49
to get into how CL Cloudfare plays into all this, uh, in a second. They'll buy
2:54
access, uh, they'll take action, and that basically means that the internet needs a new pricing for machine usage.
The New Paradigm of the Internet
3:03
Obviously, a human being doesn't want to pay 0.003 cents to read a page. That would feel
3:10
ridiculous. If I clicked on a recipe and it said, "Please pay 1/3 of a cent to
3:15
see the sauce," I would close the laptop and probably order tacos out of spite.
3:21
But a machine doesn't care if the payment is tiny and automatic. If the data helps the agent complete the job,
3:28
the agent, you know, can pay. And that's really the mental model. The human web
3:34
monetized attention and the agent web monetizes useful resources.
What Cloudflare is actually doing
3:41
So what is Cloudflare actually doing here? Well, there's actually there's a few pieces I want to go over. The first
3:48
is AI crawl control, which gives site owners visibility and control over AI
3:54
crawlers. You can see a crawler activity. You can allow certain crawlers
3:59
to do things and you can block certain crawlers. you can understand who's accessing your content. They also
4:05
announced pay per crawl and that's the direct monetization piece. That's the piece that's going to get people paid. A
4:12
site owner now can charge AI crawlers when they access content. The crawler
4:17
could either present payment intent in the request or receive a 402 payment
4:24
required response with the pricing. Then monetization gateway is even a bigger
4:29
version of that. So, Cloudflare is basically saying this should not just apply to crawlers reading pages. Any
4:36
resource behind Cloudflare could have payment rules, a web page, a data set,
4:42
an API, you know, an MCP tool call, basically a premium endpoint, a file, a
4:48
search index, and the payment rail they're talking about is X42, which uses
4:53
the HTTP 402 payment required status code. The agent requests the resource.
5:01
The server says, "This costs this amount, usually a fraction of a penny,
5:06
and the agent pays and retries with proof of payment." Cloudfare can verify
5:11
at the edge before the request hits the origin. Basically, in plain English,
5:16
CloudFire is trying to make paid access feel like part of the internet itself. So, you don't have this giant checkout
5:22
flow. You don't have to create an account first. There's no sales call. there's no like enterprise procurement
5:28
stuff. Basically, there's a request that becomes uh the transaction. And that's a
5:34
really really big idea. Um and it's a big idea because the request becomes the
5:39
transaction and then there's these tiny resources on the internet that on the internet that could become businesses.
5:45
And that's what we're going to get into. That's why I'm doing this episode. I'm doing this episode not just because cloud for launch is thing. Um, it's
5:53
interesting because of all the businesses that could be built on top of it. Uh, a data set could charge per
5:59
lookup. An API can charge per successful call. A research archive could, you
6:04
know, charge per answer. A product catalog can charge per comparison. You
6:09
get the idea. And, you know, someone in the comment section is basically going to say something like, "Yeah, but you
6:15
know, agents don't have wallets." Well, we're moving into a future where agents are going to have wallets. They're going
6:21
to have email addresses and assuming that's true and I think you know there's a good chance that that
6:27
happen is happening happens because it's already starting to happen. They're going to make transactions
An AI Index for all our customers
6:34
and Cloudflare's AI index points in the same direction. So they've talked about
6:40
making websites easier for AI systems to use things like MCPS, LLM.txt, txt,
6:47
search APIs, and bulk data APIs. That matters because agents need access, but
6:53
they also need structure. So, humans can tolerate messy websites. It might not be
6:58
a good experience, but they can tolerate it. Um, you know, we click around, we
7:03
zoom in, we read the FAQ from 2019, we open a PDF. We're good at suffering
7:08
human beings. But agents need really clean doors. So they need information in a format they could trust and use. So
7:17
the shift is websites become resource layers, content becomes indexes,
7:22
expertise be becomes scalable, data becomes metered, and tools become agent
7:28
accessible. Um, and that's what I'm paying attention to as a founder because I can build on top of it. So there's
The Agent Internet Stack
7:35
this stack that's forming uh around this whole new internet and I want to go through it. It's actually simpler than
7:42
we think. So, first you have a messy internet. That is PDFs, pricing pages,
7:48
old blog posts, you know, YouTube videos, support docs, um comparison sites, websites that look
7:55
like they were designed uh when people still said web 2.0 without any irony. Uh
8:00
then someone cleans that into structured data. Then someone makes it agent
8:06
readable through an API, MCP tool, search index, feed, LLM.TXT
8:13
or some other clean access point, but it needs to be cleaned. Then someone adds payment rules. Some things are going to
8:20
remain free because, you know, free creates a lot of distribution, but some things are going to be paid because
8:26
they're extremely valuable and some things are going to be blocked because they should stay private. Um, and then
8:33
someone adds trust in analytics like is the data fresh? Is the source reliable?
8:39
Which agents are using it? Which requests are worth money? Which resources drive outcomes? And that stack
8:46
is what's going to create this whole generation of, you know, thousands of companies. Um, when you're looking for
8:54
ideas here, you know, the question really is what resource does an agent
8:59
need badly enough and often enough and reliably enough to pay for? That's
9:05
basically the the biggest question of all of this. That's what I'm asking myself. Um, and let's get into the the
Why Now Is the Best Time to Build
9:11
ideas or three ideas that'll get your creative juices flowing around building businesses on top of that. But before I
9:17
get into it, I saw a lot of chatter on on X um Levels.io, who's an incredible
9:23
indie hacker, was talking about how, you know, how hard it is now to build a
9:29
business and how a lot of people's traffic and revenue has gone down. I think in large part, you know, because
9:34
of AI overviews and how basically a lot of software is just not it's not useful
9:41
anymore because people are vibe coding it themselves and stuff like that. My take is it's an incredible time to be uh
9:49
building. In fact, it's the best time ever. Now, I think uh the types of businesses to create are businesses like
9:56
this. They're not like little tools that could be vibe coded. These are startup ideas that you know could be profitable
10:03
on day one. Uh that, you know, have some moat that are, you know, are reinvented
10:09
for an internet that's AI native and AI and agent ready. So I don't want you to,
10:15
you know, go on X and just be like devastated that there's no like entrepreneurship is done. RIP startups.
10:22
No, the world is moving. The internet is changing. You have to move with it. And here's three startup ideas that move
10:28
with it. Let's go. So the first startup idea is a niche data refinery. This is
Startup Idea 1: The Niche Data Refinery
10:35
probably the one I would start with because it's the most practical. The idea is really simple. So uh pick one
10:41
niche where value information where valuable information is messy, fragmented, uh changing, annoying to
10:48
collect. Then turn that information into clean fuel for agents. I'm calling it a
10:55
data refinery because the raw material already exists. So the internet already
11:00
has that data. You know, it's sitting in Google Maps. It's sitting in job posts. It's sitting in reviews, in local
11:06
directories, uh, PDFs. It sits in pricing pages. It's in all these places.
11:12
And your job is going to be refining it. So, let's make it let's let's make it concrete. I'll give you an example. So,
11:19
it drives the point home. So, imagine you pick med spas because, you know,
11:25
they're growing a lot in the US. Uh that's and that's the niche you want to pick. Great. A med spa owner wants to
11:32
know what competitors are charging, what treatments they offer, what reviews uh
11:38
complained about, complain about, which clinics are hiring, which services are trending, what offers are working, and
11:45
how the local market is changing. So that information today, you know, lives
11:50
everywhere really. It lives on Google reviews, on competitors websites, on
11:56
Instagram, on job posts, uh meta ad libraries, in the owner's head, in
12:01
employees heads. Uh an agent can do incredible work for a med spa owner if
12:07
it had that information cleanly. Like it would be huge. It could say something like, "Your Botox pricing is above the
12:15
local median, but your reviews do not support premium positioning yet." That would be super valuable. It could say
12:22
three competitors near you started promoting exos exosome treatments in the
12:27
last 60 days. Super valuable information to know. It could say the most common
12:32
complaint in local reviews is your confusing pricing. So your offer should lead with simplicity. Great to know. It
12:40
could say too fast growing competitors are hiring injectors which probably means they're expanding capacity. Really
12:47
good to know. So all useful information and more importantly the usefulness comes from the data not from a generic
12:55
AI rapper. So here's how I would build a wedge into you know this space into this
13:01
business. I would pick one niche and I would pick one city. I would track a 100 businesses not not more. I would do it
13:08
manually at first. I would create a a spreadsheet with a you know your business name, business name, website
13:15
services, prices, review count, review rating, top review complaints,
13:21
Instagram links, re recent postes, visible ad changes, hiring signals, and
13:26
booking flow. Then I would create 10 outputs from that data. It could be like a local pricing map, a competitor gap
13:33
report, a list of offer ideas, a services to ad recommendation, a review
13:40
complaint summary, a hiring signal report, a monthly market movement report. Now you have something to sell
13:48
here. And the first customer actually might not be a med spa owner. And that's
13:53
that's a part I think people are missing a little bit. In the early days, your first customer is often the person
14:00
already selling into the niche. So instead of trying to sell agent readable competitive analysis to a med spa owner,
14:08
which is a phrase that is just confusing to the average person. Um, sell it to
14:14
med spa marketing agencies, consultants, freelancers, software companies, and
14:19
even AI implementation people. You could say, "I built local market intelligence for Med Spas." And you can use it to
14:26
create better audits, better offers, better landing pages, and better campaigns for your clients. They're
14:32
going to be able to to charge more. Um, so you know, you what you've built is
14:38
super valuable, and that's just a part I think people are missing a little bit. In the early days, your first customer is often the person
14:00
already selling into the niche. So instead of trying to sell agent readable competitive analysis to a med spa owner,
14:08
which is a phrase that is just confusing to the average person. Um, sell it to
14:14
med spa marketing agencies, consultants, freelancers, software companies, and
14:19
even AI implementation people. You could say, "I built local market intelligence for Med Spas." And you can use it to
14:26
create better audits, better offers, better landing pages, and better campaigns for your clients. They're
14:32
going to be able to to charge more. Um, so you know, you what you've built is
14:38
super valuable, and that's just an easier sale. A Med Spa marketing agency
14:44
might sell a CL client for like 5K a month as a growth package. And if your
14:49
data helps them close one more client or improve their work, they can pay you three, five, $800
14:56
a month and over time you turn your spreadsheet into a real product. So first it's a report, then it's a
15:03
dashboard, then it becomes an API, then maybe an MCP tool, then agents can pay
15:09
per lookup or per report when the rails are ready. So you you know you're doing basically a crawl, walk, run strategy. I
15:16
used med spa as an example, but it doesn't need to be med spas. I live in Miami and there just so happens to be a
15:22
lot of med spas here. Um, but you can do it for, you know, roofing. You can do it for, you know, you know, let's say,
15:29
okay, let's say you were to do it for roofing. You would do you track storm events, maybe you would track permit
15:35
data, insurance signals, local reviews, competitor offers, and ad angles. Um,
15:41
you can do it for real estate investing. You track zoning changes. You track permits, you track ownership records,
15:47
you track rent comps, you track tax delinquencies, and you track insurance shifts. You can do it for e-commerce.
15:54
You can track competitor SKUs, pricing changes, review complaints, influencer rates, UGC hooks, Shopify apps, uh,
16:03
shipping promises. You can do law firms. You could track local competitors, practice area positioning, ad copy,
16:10
reviews, intake. You get the idea. The filter is pretty simple. The data should
16:15
be valuable. It should the data should be repeatable uh changing, fragmented
16:22
and annoying. And you know, valuable data basically means better decisions
16:27
make or save money. What does repeated mean? Well, repeated means the customer needs it again and again. It's not like
16:33
a one-time thing. What does changing mean? It means that you know freshness matters in the data. What does
16:40
fragmented meaning means? It means that one person can't easily collect it. U
16:46
what does annoying mean? That basically means there's some margin there. Um and that's my first startup idea. It's like
16:52
it's basically one idea that can give you a lot of ideas depending on what niche that you have some unfair advantages in advantage in. Take one
17:00
niche's messy internet, turn it into clean fuel for agents. I don't want you to forget that phrase, clean fuel for
17:06
agents. Let's get on to the next startup idea. So, startup idea number two is
Startup Idea 2: Agent Readiness for Businesses
17:12
agent readiness for businesses. This is like SEO for the agent internet, but I
17:18
want to define it very specifically because AI SEO is already becoming a a
17:24
buzzy fuzzy phrase. The real business is helping companies become easy for agents
17:30
to understand, trust, compare, and recommend. Think about a B2B SAS company. A human buyer lands on the
17:37
homepage, reads the hero image, clicks around, looks at the pricing page, reads
17:43
some docs, maybe books a demo, watches a case study, and maybe asks a friend
17:48
about this particular product. Agents are compressing that whole process. If
17:54
someone asks their AI assistant, find me the best payroll provider for a 15
18:00
person company in California, the agent has to understand the market. So the agent is basically asking who's this
18:07
product for? What does it cost? What does it replace? What sort of integrations? What are the risks? What
18:13
does implementation look like? What a customer say? How does it compare to alternatives? Most websites actually
18:20
make this harder than it needs to be. They hide pricing. They bury docs. They
18:25
there's just not a lot of information there. They're not constantly updating their website. So they end up having
18:30
stale websites, stale comparison pages. Uh some of the most important information is actually in PDFs. Um and
18:39
finding policies is extremely hard to find in general and there's just a lot
18:44
of marketing speak. So you'll see things like unlocking operational excellence.
18:50
So there's a lot of just like foggy copywriting. So the startup idea is basically to make
18:56
these websites agent readable. Here's the wedge I would use. Start with a paid
19:02
audit. And I've done episodes on the podcast with Corey Ganham around some of these things. Uh you can go deeper in
19:09
into Vase where we talked about um what is a forward deploy engineer uh where
19:15
we've talked about paid audits. But I want you to pick one vertical B2B SAS is
19:20
obvious but you know you can do Shopify apps, law firms, healthcare clinics, financial advisors, insurance broker
19:27
brokers, home services, whatever you you know and then run you know 20 to 50
19:33
buyer intent prompts across major AI tools. So you're going to ask questions like what is the best software for this
19:40
use case? Compare this company to top alternatives. What does this company
19:45
cost? Who is this product best for? What are the risks of choosing this vendor?
19:51
Would you recommend this product for a 20 person company? What integrations
19:56
does it support? Then you show the company the answers. And this is really the sales moment because you might show
20:03
a founder when buyers ask AI for your category, you do not show up. Or you
20:08
show up, but AI gets your pricing wrong. on your website it's $20 a month but AI for some reason is getting $8 a month or
20:16
the AI recommends your competitor because their docs are cleaner or your
20:21
website has the answer but it's buried in a PDF from 2002 that gets their
20:27
attention especially if you're doing cold email and stuff like that then you sell the fix the fix is an agent
20:33
readable source of truth so that might include an a an a clean LLM text file
20:40
which is file uh that you know helps uh
20:45
LLMs crawl your website. Uh a better documentation structure. Uh pricing
20:51
pageent a pricing page agents can parse comparison pages that are honest and specific. Use cases pages written in
20:59
just like plain uh plain simple language. Customer proof organized by segment. Structured FAQs around real
21:06
buyer questions. Schema markup. A product feed. a change log, a lightweight MCP server or search
21:13
endpoint if the company has enough data uh enough useful content. If they don't, then probably not that. And then the
21:20
recurring product is the measurement loop. So every month you rerun the prompts. You see what's changed. You see
21:27
whether AI answers are more accurate, whether the company appears more often, whether the competitor comparisons
21:33
improve or get worse, and you see where the website needs more structured proof. And this could start off as an easy
21:40
services business. So you can charge something like 3,000 to 10,000 for the
21:45
audit and cleanup. And then for larger B2B companies, it could be something like, you know, 10, 15, 20,000. And
21:52
after you do 10 clients in the same niche, you're going to see a bunch of repeated work. And this is why I love
21:58
starting with services businesses and then productizing it with software as you go. You're going to learn things
22:04
like the same docs are missing, the same pricing pages are unclear, the same
22:10
questions matter, the same structured files need to be created, the same monthly report needs to be delivered.
22:16
This is when you turn it into software. And the way to sell this is very si
22:22
simple. You're not selling the future. You're selling the screenshot. You show them what AI says about their company
22:29
today. And that becomes the whole sales deck. For local businesses, this
22:34
eventually becomes let AI assistants book appointments with you. For e-commerce, it becomes something like
22:41
make your product catalog easy for shopping agents to compare and buy. For
22:46
B2B SAS, it becomes make your product easy for procurement agents to evaluate.
22:53
And for publishers, it becomes make your archive easy for AI systems to understand and license. And
23:00
I think that there's going to be uh ventureback companies and you're already starting to see it happen doing these
23:06
horizontal products that do this. The opportunity here is to go extremely vertical. Go extremely vertical. Um obviously B2B SAS is like
23:13
too big, right? You want to pick a specific niche, go deep into that. Um
23:19
but I think this is a wonderful business that's cash flow on day one that could productize that could eventually sell at
23:25
some point in the future. uh basically help businesses become easy for agents
23:30
to understand, trust, compare, and recommend. There's a ton of demand from
23:35
businesses right now for this uh p uh because they're feeling this pain. Uh so
23:42
you just solve it. Last but not least, startup idea number three is turning expert archive into agent tools. I'll
Startup Idea 3: Expert Archives as Agent Tools
23:50
explain what I mean by that. Um, this one is probably the most fun for creators, media companies, analysts,
23:57
consultants, uh, researchers, people like that that have, you know, are sitting on years of
24:03
valuable content or can get their hands on valuable content. What do I mean by valuable content? I'm I'm saying I I'm
24:10
talking about things like YouTube videos, podcasts, newsletters, uh, templates, things like that,
24:17
community posts. Right now, most of that content makes
24:22
money through ads, sponsorships, sometimes subscriptions, sometimes communities, sometimes consulting. But
24:29
in the agent internet, that archive could become a tool. So imagine a founder agent that can access a
24:36
startup's expert archive and critique your idea. Imagine a sales agent that can
24:42
use a specific sales trainers framework to rewrite your cold email. Imagine a fitness agent that can use a
24:49
coach's training philosophy to build a per a personalized plan. The startup is
24:55
archive to API. You take someone's expertise and you package it so agents
25:01
can use it. The key is to start with one job. Don't go to a creator and say, "We're going to turn your whole brain
25:08
into AI." That honestly sounds a little creepy, a vague, and honestly
25:13
like a SAS landing page that should be illegal. You got to say something that's specific. So, what do I mean by that?
25:19
Something like, you have 300 videos about sales. We're going to turn them into a tool your audience could use to
25:26
improve cold emails. Or, hey, you've got 500 u episodes about startups, podcast
25:33
episodes about startups. We're going to turn them into a startup idea feedback tool. Or maybe it's to a designer. It's
25:38
like, you have a decade of these design tearowns. We're going to turn them into a landing page critique tool. You know,
25:45
you've got this one archive with one painful job, one workflow. And here's how I would build this uh startup idea.
25:52
So, I would pick an expert with a deep archive and a specific audience. Me
25:58
particular, I'd pick someone who uh is more in like the B2B space. Uh but it
26:04
could work for B2 TOC specific matters just because a general business creator
26:10
for example uh is is just going to be harder to to harder to do. But maybe a
26:16
creator known for cold email or Shopify growth or local business acquisitions,
26:22
tax strategy, fitness programming or like what we talked about design tearowns. That would work uh really
26:28
well. Second, you want to go and collect the archive. Collect the archive. So, you're going to want to go and transcribe the content if that's
26:34
videos, if it's podcasts, pull the newsletters, clean the docs. Um, and
26:39
then third, you're going to do tagging. So, you're going to tag the archive by job, by topic, by audience, by example,
26:46
by framework, and by out uh outcome. A lot of people get lazy at this part.
26:51
They throw everything into a vector DB and call it a day. That usually gives you a search box
26:56
with confidence, but a real product needs structure. So, it's if a sales if it's a sales archive,
27:03
you want to tag by prospecting, by subject line, by offer, by objection, by
27:09
follow-up, personalization, deliverability, and close. If it's a startup archive, you want to tag by the
27:15
idea, by the market, the wedge, the distribution, the pricing, the MVP, the community, the mode, and examples.
27:22
So, you're very specific, right? I think that the the the best tools here are going to be very specific. Um, and
27:28
that's going to help get the best outcome for people ultimately. Um, fourth, what you want to do is build one
27:35
useful workflow. So, for a sales uh expert, that workflow could just be
27:40
paste your cold email. The agents are going to critique it using that expert's
27:45
uh principles. Maybe it's Alex Heroszi. Let's say Alex Heroszi is going to go and critique it. It cites the source
27:52
lessons. It rewrites the email. It gives you a score. It gives you one test to
27:57
run and that's that's the product. Um, you know, for a startup expert, the
28:03
workflow could be paste your idea. The agent gives you the wedge, it gives you the customer, it writes the first offer,
28:09
it suggests the first distribution channel, and it tells you what to validate this week. And that's kind of
28:14
what we're doing with ideabser.com. you know, you our one of our most popular
28:20
features is adding the MCP and it just it's so good because it takes your LLM
28:25
and just uh makes it better, right? And it's got all this data that we've cleaned um to help you do that. So, I'm
28:32
I'm practicing what I'm preaching here. Um for a real estate expert, you know,
28:38
what could that be? Well, it could be something like you pace the deal, the agent checks the assumptions, it checks
28:44
the assumptions, it
28:44
identifies the risk, it compares it to the expert criteria, and it tells you whether to ask the broker. That would be
28:50
super super useful. Um, what's cool about doing something like this, the creator already has the distribution, so
28:57
you don't have to worry about the marketing, the customer acquisition. They've got all that trust already built built in. But the audience wants the
29:04
expertise. and uh you the the creator might not want to do consulting with
29:09
everyone, right? So, this uh democratizes that. So, you can charge a lot cheaper. You could be something like
29:15
$19 a month or $50 a month. You can bundle into a paid community or you can charge it or you can even make it a
29:22
lead magnet for the consulting or you can license it to license it to agencies
29:27
or software companies that sort of thing. Um this is really where the cloudfare style monetization becomes
29:34
interesting because if the archive becomes this resource and agents can pay per request. The creator gets paid when
29:41
the knowledge is used. The builder gets this trusted you know expert layer. The person you know consuming it gets this
29:47
expert layer um and you know gets better output. Um, that's way better than
29:54
hoping someone watches a pre-roll ad before a se 47minute interview from 7
30:00
years ago. I think the biggest mistake in this category that I've noticed is I've seen a lot of like chat with an
30:06
expert uh products, but that's too broad. So, I think the specific
30:12
uh you know the specific use case is way more interesting. It's and it's way more outcome based. It's not chat with the
30:18
saleserson or chat with the sales creator. it's, you know, rewrite the cold email using this sales system. Um,
30:25
so if you can turn expert archives into job specific agent tools, um, I think
30:30
that could be really cool. Um, and someone should do it. So those are the
The Filter for Finding Ideas
30:37
three startup ideas. The, you know, number one, the niche data refinery, number two, the agent readiness for
30:43
business, and number three, the expert archives turned into agent tools. Um what connects all three of these ideas
30:49
is agents need clean, trusted and useful resources to do really good work. So
30:55
that resource can be data but it could be structure, it could be access, it could be expert knowledge, it could be a tool,
31:01
uh it could be a payment rule. The the Cloudflare news matters because building
31:07
part of the access and payment layer, that's what they're building and and that's a huge thing. But you don't have
31:13
to wait for Cloudflare's whole new agent internet to mature in order to start
31:13
to wait for Cloudflare's whole new agent internet to mature in order to start
31:19
building out some of this stuff. So um you know you can start by building the
31:25
manual version first. You know you can sell the human version now. You can build the data now um and you can
31:32
package this up now. So, as agents become more capable and agent payments
31:37
become more and more common, you're you're not scrambling to start building this stuff. This is the early you're
31:46
early. You know, not many people are talking about this. Um, and if you're looking for ideas in the space, the
31:52
questions you should ask yourself are what decision is expensive? What information is messy? What changes
32:00
often? What are who already pays for help and what would an agent need to do
32:06
to do the job better? That's basically the map to be thinking about and the questions to be thinking about so you
32:12
can spend the next 6 12 18 months building up this data curating the data
32:17
before becomes hyper competitive. Um I truly believe the internet is shifting
32:23
from pages human visit to resources agents use and I don't think it's crazy
32:28
to say that. Um, and if you made it this far, you probably agree, too. Um, the
Closing Thoughts
32:34
best opportunities look really small right now. Um, because the agent internet is small relative to where it's
32:41
going to be. Um, but I think, uh, that's how a lot of the biggest businesses start started, right? You know, you're
32:48
you're this is like building an app when the app store came out in 2009. um you know there's going to be an
32:54
incred you know this cohort uh of businesses starting in this era 2026 2027 I think there's going to be uh just
33:03
an incredible amount of businesses created here it's very clear that the agent internet is the next wave um so
33:09
when you see Cloudflare talking about AI crawlers X42 paid access MCP tools and
33:16
monetization don't just think uh that's a little interesting thing or don't just think oh
33:21
publishers ers can now charge bots. Now it's way bigger than that. Agents are becoming buyers. Websites are becoming
33:28
resources. And the next great internet businesses and the next great internet businesses might be these tiny paid
33:35
doors that agents walk through all day that you're going to own. It's an asset
33:41
and I can't wait to see what you build, what you do. If this has been helpful or got your creative juices flowing, shoot
33:48
me over a comment, like and subscribe for more of this in your feed. I read every single comment, by the way. Um,
33:54
and I'll see you on the next time. Thank you for listening to the Startup Ideas podcast. Have a creative day. I'll see
34:00
you next And well, I already said I see you next time. So, I I'm just I'm missing you already, you know. I can't
34:06
wait to I can't wait to the next episode. See you.
```