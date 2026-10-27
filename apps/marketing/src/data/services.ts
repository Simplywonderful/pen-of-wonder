// Marketing's services, one page each. Written fresh from the brief (26 Oct 2026) and the deliverables
// the founder's portfolio lists; no prices except the ad-spend line, which is labelled as ad spend.
// A service with confirmed: false is built only in development and review builds, and stays out of
// the menu, until the owner confirms it is offered.

export type Service = {
  slug: string;
  name: string;
  /** What the WhatsApp message asks about. */
  ask: string;
  confirmed: boolean;
  summary: string;
  title: string;
  description: string;
  intro: string;
  includes: { name: string; detail: string }[];
  notes: { heading: string; body: string }[];
  questions: { q: string; a: string }[];
};

export const adSpendLine =
  "Most clients start from about ₦200,000 a month in ad spend. That is the budget paid to the ad platforms, not our fee, which we quote after a free consultation.";

export const services: Service[] = [
  {
    slug: "paid-ads",
    name: "Paid ads",
    ask: "paid ads",
    confirmed: true,
    summary: "Strategy, audience research, setup, tracking, optimisation and reporting on Meta, LinkedIn, TikTok and X.",
    title: "Paid ads on Meta, LinkedIn, TikTok and X | Pen of Wonder Marketing",
    description:
      "Paid ads planned, built and run like experiments: audience research, campaign setup, pixel and event tracking, testing and plain-English reports. Meta, LinkedIn, TikTok and X.",
    intro:
      "We plan, set up and run your paid campaigns, test what to put money behind, and report what each naira did. Facebook and Instagram through Meta, plus LinkedIn, TikTok and X.",
    includes: [
      { name: "Strategy and audience research", detail: "Your offer and funnel reviewed, the people most likely to buy described in plain words, and a platform and budget plan before anything is spent." },
      { name: "Campaign setup and tracking", detail: "A clean account structure, with the pixel or Conversions API, events and UTM tags set up so every lead can be traced to the ad that brought it." },
      { name: "Testing and optimisation", detail: "Controlled tests of audiences, angles and creatives. What loses is switched off; what wins gets the budget." },
      { name: "Reporting", detail: "A plain-English report on a schedule we agree: what ran, what it cost, what it brought in, and what we'll change next." },
    ],
    notes: [
      {
        heading: "Three ways to work with us",
        body: "An ad audit and plan, if you already run ads and want to know what's wrong: a teardown of your ads and tracking, and a plan for the next 90 days. Managed ads, if you want us to run them month to month. Or a launch sprint, if you have a new offer or funnel to take to market. Each is quoted after a free consultation.",
      },
      {
        heading: "Before you spend",
        body: "Ads make a proven offer sell faster; they rarely rescue one that hasn't sold yet. We'll ask whether you've sold to at least five people who have the problem, whether you have enough creatives to test, and how quickly you reply to new leads. If those aren't in place, we'll say so before you spend.",
      },
    ],
    questions: [
      { q: "Which platforms do you run ads on?", a: "Meta (Facebook and Instagram), LinkedIn, TikTok and X." },
      { q: "What ad budget do I need?", a: adSpendLine },
      { q: "Do you answer my leads for me?", a: "No. We advise on how leads should be handled (how fast to reply, what to say first, how to follow up) but your team runs the inbox. That keeps our reports honest about what the ads did." },
    ],
  },
  {
    slug: "ad-creative",
    name: "Ad creative",
    ask: "ad creative",
    confirmed: true,
    summary: "Hooks, scripts, briefs and creatives built for testing, not just for looking good.",
    title: "Ad creative built for testing | Pen of Wonder Marketing",
    description: "Hooks, scripts, static and video ad concepts and creative briefs, made in sets so the ad platforms have something to test.",
    intro:
      "One good-looking flier gives the ad platforms nothing to compare. We make creatives in sets, around different angles, so a test can show which one your buyers respond to.",
    includes: [
      { name: "Angles and hooks", detail: "The reasons someone might buy, each turned into an opening line that stops a scroll." },
      { name: "Scripts", detail: "Short video scripts that hook, show the offer and ask for one clear action." },
      { name: "Static and video concepts", detail: "Fliers and video ideas, made with your designer or briefed for you to shoot." },
      { name: "Creative briefs", detail: "Clear briefs your own team or designer can work from." },
      { name: "Iteration on winners", detail: "When an angle wins, new variations of it, so the ad doesn't wear out." },
    ],
    notes: [
      {
        heading: "How many creatives",
        body: "Three to five fliers and three to five videos, with several headlines and copy variations, is the floor before the first naira is spent. Once ads are running we keep adding new angles, because variety gives the algorithm more to learn from.",
      },
    ],
    questions: [
      { q: "Can you make creatives for ads someone else runs?", a: "Yes. Creative work can be bought on its own, with briefs your media buyer can use." },
      { q: "Do you shoot video?", a: "We write the scripts and briefs and can review your footage. For shoots we tell you what to record, or quote for working with a videographer." },
    ],
  },
  {
    slug: "landing-pages",
    name: "Landing pages",
    ask: "a landing page",
    confirmed: true,
    summary: "A standalone page, or the page your campaign sends people to, written and built to convert.",
    title: "Landing pages | Pen of Wonder Marketing",
    description: "Landing pages written and built to turn ad clicks into leads: copy, structure, tracking, and fast loading on phones.",
    intro:
      "The page an ad sends people to decides whether the click turns into a lead. We write it, build it and set up its tracking, sold on its own or as part of a campaign.",
    includes: [
      { name: "Copy", detail: "Written around one offer and one action, in your buyers' own words." },
      { name: "Structure", detail: "The order a doubtful buyer needs: the problem, the offer, the proof you can honestly show, the next step." },
      { name: "Build", detail: "A page that loads quickly on a mid-range phone on mobile data, where most Nigerian buyers will see it." },
      { name: "Tracking", detail: "Pixel and events set up, so the page's results show in your ad reports." },
    ],
    notes: [
      {
        heading: "Pages, not whole websites",
        body: "We build landing pages and small campaign sites. Full websites and business systems will come from Pen of Wonder Dev when it opens.",
      },
    ],
    questions: [
      { q: "Can I have a landing page without running ads with you?", a: "Yes. Landing pages are sold on their own too." },
    ],
  },
  {
    slug: "copywriting",
    name: "Copywriting",
    ask: "copywriting",
    confirmed: true,
    summary: "Sales pages, emails, ad copy and product descriptions that ask for the sale.",
    title: "Copywriting: sales pages, emails and ad copy | Pen of Wonder Marketing",
    description: "Sales pages, email sequences, ad copy and product descriptions, written from your customers' own words.",
    intro: "Copy that sells starts with how your customers describe their problem. We write from their words, not ours, and every draft says why it's built the way it is.",
    includes: [
      { name: "Sales pages", detail: "Long or short, for an offer, a course or a service." },
      { name: "Emails", detail: "Welcome sequences, launch emails and follow-ups for leads who went quiet." },
      { name: "Ad copy", detail: "Headlines and body copy in variations, ready to test." },
      { name: "Product descriptions", detail: "For online shops and catalogues." },
    ],
    notes: [
      {
        heading: "Copy, not CVs",
        body: "Marketing writes copy that sells. CVs, grant applications and business plans belong to Pen of Wonder Writing, which opens soon.",
      },
    ],
    questions: [
      { q: "How many revisions do I get?", a: "Your written quote says how many rounds are included and how long you have to ask for them." },
      { q: "Can you write in my voice?", a: "Yes. We'll read what you've already written and ask how you talk to customers before we start." },
    ],
  },
  {
    slug: "content-and-seo",
    name: "Content writing and SEO",
    ask: "content writing and SEO",
    confirmed: true,
    summary: "Website pages, blog articles and content plans, written to be found and read.",
    title: "Content writing and SEO | Pen of Wonder Marketing",
    description: "Website pages, blog articles and content plans, with the search basics done properly: topics people search for, titles, descriptions and internal links.",
    intro: "Content that brings people to you without paying for each click. We plan it around what your buyers actually search for, then write it so they keep reading.",
    includes: [
      { name: "Website pages", detail: "Home, about, service and product pages." },
      { name: "Blog articles", detail: "Articles that answer your buyers' real questions." },
      { name: "Content plans", detail: "Topics, order and timing for the next few months, based on what people search for." },
      { name: "Search basics", detail: "Page titles, descriptions, headings and links between your pages, done properly." },
    ],
    notes: [
      {
        heading: "What SEO can and can't promise",
        body: "Nobody can guarantee a place on Google's first page. What we can do is write useful pages on the right topics and get the basics right, which is what search engines reward over time.",
      },
    ],
    questions: [
      { q: "How long before content brings in visitors?", a: "Usually months, not weeks. Content is the slow, cheap channel; ads are the fast, paid one. Many clients use both." },
    ],
  },
  {
    slug: "social-media",
    name: "Social media marketing",
    ask: "social media marketing",
    confirmed: false,
    summary: "Content calendars, posting and community replies.",
    title: "Social media marketing | Pen of Wonder Marketing",
    description: "Content calendars, posting and community replies for your business's social media.",
    intro: "A steady presence on the platforms your buyers use: a content calendar, posts written and scheduled, and replies to comments and messages.",
    includes: [
      { name: "Content calendars", detail: "What to post, where and when, planned a month at a time." },
      { name: "Posting", detail: "Posts written, designed or briefed, and scheduled." },
      { name: "Community replies", detail: "Comments and messages answered in your voice." },
    ],
    notes: [],
    questions: [],
  },
];

export const liveServices = (showTodos: boolean) => services.filter((s) => s.confirmed || showTodos);
