// The campaign process as a test log: the same five steps the founder's portfolio names, written fresh.
export const steps = [
  {
    name: "Diagnose",
    line: "We audit your ads, your offer and your tracking, and agree the one number that matters.",
    detail: [
      "We look at what's running now, what it has cost, what it has brought in, and whether that can even be measured. Often the first finding is that it can't.",
      "We also check the basics outside the ad account: whether the offer has sold without ads, whether there are enough creatives to test, and how fast leads get a reply.",
      "You get a short written diagnosis and the one number we'll judge the work by, such as cost per lead or cost per sale.",
    ],
  },
  {
    name: "Hypothesise",
    line: "We write down which audiences and angles we expect to win, and why.",
    detail: [
      "Each test starts as a sentence: this audience, shown this angle, should bring leads below this cost, because of this reason. Writing it down stops anyone from rewriting the goal after the results come in.",
    ],
  },
  {
    name: "Build",
    line: "Creatives, campaign structure, pixel and events, checked before launch.",
    detail: [
      "We build the campaigns, the creatives and copy variations, the landing page if there is one, and the tracking: pixel or Conversions API, events and UTM tags.",
      "Nothing launches until a test lead has gone all the way through and shown up in the reports.",
    ],
  },
  {
    name: "Test",
    line: "Controlled tests across platforms. The data decides.",
    detail: [
      "We change one thing at a time where we can, give each test enough time and budget to mean something, and don't react to a single bad day.",
      "When the learning phase is the reason a campaign looks slow, we say so, rather than reset it by changing things too early.",
    ],
  },
  {
    name: "Scale and report",
    line: "Budget moves to what wins, and you get a plain-English report on a schedule we agree.",
    detail: [
      "Winners get more budget and new variations; losers are switched off. The report says what ran, what it cost, what it brought in and what we'll do next, in words, not just a dashboard.",
      "We keep asking how leads are being answered, because slow replies can make good ads look bad.",
    ],
  },
] as const;
