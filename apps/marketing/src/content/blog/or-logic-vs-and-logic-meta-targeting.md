---
title: "OR Logic vs AND Logic: The Targeting Mistake That Starves a Campaign of Leads"
seoTitle: "OR vs AND Logic in Meta Targeting: The Hidden Lead Killer"
summary: "A campaign was getting engagement but almost no leads. The cause: every interest sat in one targeting box, which Meta reads as OR logic, matching anyone who fits any one condition. Switching to Meta's Narrow Audience function (AND logic) made the audience match all the conditions at once, and leads rose sharply within days at a far lower cost per lead, with nothing else about the campaign changed."
description: "A campaign had plenty of messages and almost no leads. The problem wasn't the creative or the offer. It was OR logic hiding inside Meta's targeting box."
publishDate: 2026-06-22
topics: ["Meta ads", "Audience targeting"]
draft: false
questions:
  - q: "What's the difference between OR logic and AND logic in Meta targeting?"
    a: "Putting multiple interests in a single Meta targeting field creates OR logic: the ad shows to anyone matching any one interest, which can balloon your audience into the millions. Meta's Narrow Audience function creates AND logic instead, reaching only people who match multiple conditions at once: a much smaller, more precise intersection."
  - q: "Why is a large targeted audience often a problem, not an advantage?"
    a: "A wide audience sounds like more opportunity, but for a limited daily budget the algorithm can't concentrate spend on the people most likely to convert. It just finds whoever engages most cheaply. A tighter, AND-logic audience gives the algorithm a real chance to find your actual buyer instead of the cheapest click."
  - q: "How do I know if my Meta campaign has an OR-logic targeting problem?"
    a: "Check your ad set's audience size against your daily budget: several million people on a modest budget is a red flag. Also check every individual interest in your targeting box and ask whether it genuinely belongs, the way an unrelated interest like 'angel investors' quietly diluted this campaign's audience."
---

## A campaign can look active and still convert nothing

A campaign can have plenty of people message it over three weeks and still produce almost no leads. That's what I went back to investigate.

The instinct when this happens is to blame the obvious things: the creative, the offer, the price point. Something visible you can point to and fix. I went into the account expecting to find one of those.

The problem was inside the targeting.

## Why one targeting box quietly ruins an audience

When I opened the ad set and looked at the audience setup, everything was sitting in a single targeting box. On the surface that looks organised. What it actually means is that every interest in that box is connected by **OR logic**. The platform shows your ad to anyone who matches *any one* of those conditions. You don't need to match two of them. One is enough.

For the daily budget running on that campaign, the resulting audience was far too large. The algorithm can't find the right buyer in a pool that wide. It just serves the ad to whoever engages most cheaply, which is not the same as whoever is most likely to pay.

There was also a specific interest in the targeting that had no business being there: angel investors. Angel investors give capital to businesses. They aren't looking to apply for grants or loans. Including them in the targeting for a funding-related service was quietly pulling in an audience with no reason to buy.

## The fix: AND logic, not OR logic

The fix was Meta's **Narrow Audience** function, which creates AND logic. Instead of reaching anyone who is a CEO *or* interested in small business funding, the campaign now reached people who are a CEO or founder *and* interested in funding or loans: the intersection, not the union.

| | OR logic (one box) | AND logic (Narrow Audience) |
| --- | --- | --- |
| Who sees the ad | Anyone matching any one interest | Only people matching every condition |
| Audience size | Often millions | Much smaller and more precise |
| What the algorithm finds | The cheapest engagement | People closer to your actual buyer |

Within days, leads rose sharply and the cost per lead fell to a small fraction of what it had been. Same budget structure. Same creative. Same offer. The targeting was the only variable.

## Why this is easy to miss

What I keep learning about Meta Ads Manager is that the interface doesn't make the consequences of your choices obvious. Putting everything in one box looks perfectly fine. It doesn't look wrong. The logic running underneath can work against you for weeks before you go looking for it, which is exactly why [verifying tracking and setup before drawing conclusions](/blog/why-most-ad-budgets-actually-get-wasted) matters as much as the targeting itself.

## How to check your own targeting

1. Open each ad set and look at the detailed targeting.
2. If several interests sit in one box, they're joined by OR.
3. Ask of each interest: would someone with only this interest buy from me?
4. Use Narrow Audience to require the conditions that must be true together, such as a job title *and* a buying interest.
5. Check the estimated audience size against your daily budget before you publish.

If your ads are getting engagement but not conversions, take a look at your targeting logic: is it OR or AND? [Send me your setup on WhatsApp](/contact) and let's look at it together.
