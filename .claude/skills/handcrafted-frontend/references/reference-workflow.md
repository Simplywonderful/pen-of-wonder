# Working from references

References are the most reliable way to avoid generic output, because they replace the model's "average website" with a specific, human-made one. But copying a site is both a legal risk and its own kind of fake. The approach is: **borrow the system, not the surface.**

## Where good references come from

- Curated galleries of human-made sites: Godly, Lapa Ninja, Siteinspire, Httpster, Land-book, Awwwards, One Page Love. Mobbin for app and product UI patterns.
- Real businesses in the same trade, especially good local ones. A great Lagos restaurant site or a UK law firm site teaches more about the audience than a San Francisco SaaS template.
- Print: menus, posters, book covers, magazines, packaging. These are where many strong web concepts start.
- Clean, human-written starter repos (plain HTML/CSS boilerplates, minimal templates on GitHub) as a structural starting point, not a design.
- Tools like the slicer.dev browser extension or dev tools can capture a component's HTML/CSS. Treat that output as something to study, not paste.

## What to extract

When given a screenshot, URL, or template, write down in DESIGN.md under "References":

1. **Grid:** number of columns, max content width, gutters, how often content breaks the grid.
2. **Spacing rhythm:** the approximate vertical gap between sections and inside them. Is it tight and dense or airy?
3. **Type scale:** ratio between body and headings, how many sizes are in use, weight contrast, case, tracking.
4. **Hierarchy devices:** what they use to show importance (size, weight, colour, space, rules, numbers).
5. **Section transitions:** hard colour changes, rules, overlaps, or just space.
6. **Component attitude:** radius, borders vs shadows vs nothing, button style, link style.
7. **Motion:** what moves, when, and how fast.
8. **What makes it feel human:** the one or two odd, specific decisions that a template would never make.

## What NOT to take

- Logos, brand names, product names, trademarks, or anything that makes the new site look like it is that company.
- Their photographs, illustrations, icons (unless openly licensed), and copy.
- Their exact colour palette and font pairing together. Taking the spacing and grid is fine; taking the whole look is cloning.
- Anything that would make a visitor think the new site is affiliated with the reference.

## Prompt pattern when handing a reference to an AI editor

Use this shape (adjust to the project):

> Study the attached reference. Extract its grid, spacing rhythm, type scale ratios, and how sections transition. Write them into DESIGN.md under References. Then build [section] for [client] using our own tokens from DESIGN.md: our fonts, our colours, our copy. Do not reuse the reference's branding, images, colours, or text. Use semantic HTML and our CSS variables or Tailwind theme, no stock palette classes. Keep one decision from the reference that makes it feel handmade, and say which one you kept.

## Mixing references

Two or three references, each for a different thing, work better than one. For example: spacing from reference A, type attitude from reference B, the way images bleed off the edge from reference C. Mixing is how designers make something new instead of a copy.
