---
title: "Ad Tracking for Small Businesses: Pixel, Conversions API and UTMs"
seoTitle: "Ad Tracking Explained: Pixel, Conversions API and UTMs"
summary: "To know which ad brought each lead, use three tools together: the Meta pixel to record what people do on your website, the Conversions API to send the same events from your server, and UTM tags so your own analytics can name the campaign behind every visit."
description: "How to track which ad brought each lead: the Meta pixel, the Conversions API and UTM tags explained, with a naming system and a test checklist."
topics: ["Tracking", "Measurement"]
draft: true
questions:
  - q: "What is the difference between the Meta pixel and the Conversions API?"
    a: "The Meta pixel is code on your website that records actions people take in their browser. The Conversions API sends events from your server, website platform or CRM straight to Meta, which Meta describes as a more reliable connection. Many businesses use both."
  - q: "Which UTM parameters should I use?"
    a: "Google Analytics says you should always use utm_source, utm_medium and utm_campaign. Add utm_content to tell different ads apart. Values are case sensitive, so pick one spelling and stick to it."
  - q: "How do I track leads that come through WhatsApp?"
    a: "Ask every new contact where they saw you and record the answer. If you use WhatsApp ads, Ads Manager also counts conversations started from each ad, which you can compare with what your team records."
---

To know which ad brought each lead, you need three tools working together. The **Meta pixel** records what people do on your website. The **Conversions API** sends those same events to Meta from your server, so fewer get lost. **UTM tags** on your ad links let your own analytics name the campaign behind every visit. Set up all three before you spend, not after.

## In short

- Without tracking, you can see what you spent but not what it bought.
- The pixel works in the visitor's browser. The Conversions API works from your server. They cover each other's gaps.
- UTM tags are short labels added to a link. They work with any analytics tool, not just Meta's.
- Test your tracking yourself by clicking your own ad and filling in your own form.

## Why tracking comes before spending

Tracking tells you which part of your spending worked. Without it, a month of ads ends with a number in Ads Manager and a feeling about whether it went well. With it, you can say "this ad, to this audience, brought these leads, and three of them became clients".

That's the difference between turning off the wrong ad and turning off the right one. It's also how you find your real [cost per client](/blog/what-is-a-good-cost-per-lead), not just your cost per lead.

## What does the Meta pixel do?

Meta describes the pixel as "a piece of code that you put on your website" that measures the actions people take there after seeing your ads. Each action, such as viewing a page, submitting a form or making a purchase, is called an event.

The pixel does three jobs for you:

1. **It counts results.** Ads Manager can show how many leads or sales each ad produced.
2. **It helps Meta find more of the right people.** With the Leads or Sales objective, Meta uses these events to look for people likely to do the same thing.
3. **It builds audiences.** You can show ads again to people who visited your page but didn't contact you.

Put it on every page an ad sends people to, and on the page people see after they convert, such as a thank-you page.

## What does the Conversions API add?

The pixel runs in the visitor's browser, and browsers don't always let it run. Ad blockers, privacy settings and slow connections all mean some events never reach Meta.

Meta describes the Conversions API as "a direct and more reliable connection" between your marketing data and Meta. Instead of relying only on the browser, your server, website platform or CRM sends the events too. It can also send events that never happen on a website at all, such as a sale recorded in your shop or a lead that came in by phone.

Meta says "many integrations don't require a developer". Many website builders and e-commerce platforms have a Conversions API setting you can switch on and connect to your pixel.

[YOUR STORY: a campaign where results looked poor until tracking was fixed, or the reverse]

## What are UTM tags?

UTM tags are short labels added to the end of a link. When someone clicks it, your analytics tool reads the labels and records where the visit came from. They look like this:

`yoursite.com/free-call?utm_source=facebook&utm_medium=paid_social&utm_campaign=free_call_nov&utm_content=video_problem`

Google Analytics says you should always use three: **utm_source**, **utm_medium** and **utm_campaign**. I add a fourth, **utm_content**, to tell individual ads apart.

| Tag | What it records | Example |
| --- | --- | --- |
| utm_source | Where the visit came from | facebook, instagram, linkedin |
| utm_medium | The kind of traffic | paid_social, email |
| utm_campaign | The campaign | free_call_nov |
| utm_content | The specific ad or creative | video_problem, image_result |

Google's guidance has two warnings worth taking seriously. Values are case sensitive, so "Facebook" and "facebook" count as two different sources. And missing tags show up as "(not set)" in your reports. Write your naming rules down once and use them every time.

## How do you track leads that never touch a website?

Many small businesses get leads through WhatsApp, phone calls or direct messages. No pixel sees those. Two things help:

- **Ask every new contact where they saw you**, and record it in one place: a spreadsheet, a CRM, even a notebook. Do it in the first reply, while they remember.
- **Compare with Ads Manager.** For ads that open a chat, Ads Manager counts the conversations each ad started. If your records show far fewer, some chats are being missed or not answered.

## How to check your tracking works

Before the campaign goes live, test it like a customer would:

- [ ] Click your own ad (or the ad's preview link) on your phone.
- [ ] Check the page loaded with the UTM tags still in the address.
- [ ] Fill in the form, or start the chat, as if you were a real lead.
- [ ] Check the lead arrived where your team will see it.
- [ ] Check Meta's Events Manager shows the event.
- [ ] Check your analytics tool shows the visit with the right campaign name.

If any step fails, fix it before you spend. A week of untracked ads is a week of decisions made in the dark.

## Sources

- Meta Business Help Centre, [About Meta pixel](https://www.facebook.com/business/help/742478679120153), checked 21 November 2026
- Meta Business Help Centre, [About Conversions API](https://www.facebook.com/business/help/2041148702652965), checked 21 November 2026
- Google Analytics Help, [URL builders: Collect campaign data with custom URLs](https://support.google.com/analytics/answer/10917952), checked 21 November 2026
