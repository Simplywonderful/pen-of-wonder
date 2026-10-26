# The AI-slop catalogue

What makes a site read as "vibe-coded", grouped by where it shows up, with the fix. One tell on its own proves nothing; plenty of human designers use Inter. It is the pile-up of defaults that gives a site away. Use this as a checklist, not a list of laws.

Sources this was compiled from are listed at the bottom.

## 1. Copy and content (the biggest tell)

Visitors read before they inspect CSS. Generic copy outs a site faster than any gradient.

| Tell | Fix |
|---|---|
| Power words: elevate, seamless, unlock, empower, effortless, supercharge, streamline, leverage, harness, unleash, robust, cutting-edge, state-of-the-art, world-class, game-changing, next-level, innovative solutions, tailored, delve | Say the concrete thing. "We file your company registration with CAC in 5 working days" beats "Seamless business solutions". |
| Openers: "In today's fast-paced world", "Whether you're a X or a Y", "Look no further", "Take your X to the next level" | Start with the visitor's actual problem, in their words. |
| Triads: "Fast. Simple. Secure." and three-adjective lists | One specific claim with evidence. |
| Em dashes everywhere | Use full stops, commas, colons, or brackets. A human writer uses the odd dash; AI uses one per sentence. |
| Headline with one word in italic serif or gradient | Let the whole headline carry the weight, or emphasise with scale, not a gimmick. |
| Vague CTAs: "Get started", "Learn more", "Discover" | Say what happens: "Book a free 20-minute call", "See 2025 prices". |
| Generic About page, no people, no location | Real names, faces, city, founding story, credentials. |
| Invented proof: made-up testimonials, fake logos, "10,000+ happy clients", 5-star widgets | Only real, attributable proof. Otherwise a visible `[TODO]` and a note to the user. Fabricated proof is also a trust and legal problem, not just a style one. |
| Leftovers: lorem ipsum, "Your Company", "[Insert]", John Doe, Acme, example.com, dead `#` links | Real content or a clearly marked TODO list handed to the user. |
| Every section has heading + subheading + three items | Vary the shape. Some sections are a single sentence. |

## 2. Typography

| Tell | Fix |
|---|---|
| Inter (or Roboto, Open Sans, Lato, Arial, system stack) for everything | Choose a face for a reason tied to the concept. See `type-and-colour.md`. |
| The "new defaults" that AI now reaches for when told to avoid Inter: Space Grotesk, Instrument Serif, Playfair Display, DM Sans, Plus Jakarta Sans, Outfit, Geist, Manrope, Satoshi, Clash Display | Not banned, but each needs a written reason. If you picked it because it "looks premium", pick again. |
| Only weights 400 and 600, headings barely bigger than body | Real contrast in scale and weight. A clear scale with a ratio. |
| All-caps labels and eyebrows above every heading | Use eyebrows rarely and only when they add information. |
| Long, unbalanced line lengths; cramped line-height | 60 to 75 characters per line for body; `text-wrap: balance` on headings. |

## 3. Colour and surface

| Tell | Fix |
|---|---|
| Purple, indigo, or blue-to-violet gradients (e.g. `#6366F1` to `#8B5CF6`, Tailwind `indigo-500`, `violet-500`) | Colour from the client's world and concept. |
| Gradients as the default background for heroes, buttons, CTAs | Flat colour by default; gradient only when it depicts something (light, sky, a material). |
| Gradient text (`bg-clip-text text-transparent`) | Solid colour text. |
| Glassmorphism (`backdrop-blur` panels), coloured glows, blurred blobs, aurora backgrounds | Depth from contrast, spacing, and type. |
| Permanent dark mode with neon accents for a business that has no reason to be dark | Choose light or dark from the concept and audience. |
| Five saturated colours competing | One dominant, one accent, tinted neutrals. |
| Light grey body text on white | WCAG AA, 4.5:1 minimum for body text. |
| Tailwind's stock palette (slate, zinc, gray, indigo) used unmodified | A custom palette in `@theme`, stock palette removed. |
| Meaningless coloured status dots and "live" pulses | Only show status that exists. |

## 4. Layout and components

| Tell | Fix |
|---|---|
| The recipe: badge pill above centred H1, two buttons, logo strip, 3 icon cards, stats row, testimonial carousel, 3-tier pricing, gradient CTA band, 4-column footer | Structure from real content and the page's one job. |
| Badge or pill above the H1 ("New: ...", "Trusted by 10k+") | Only if there is real news. |
| Three identical cards, each with an icon on top | A list, a table, prose, or cards with genuinely different content. |
| Coloured left or top border on cards and callouts (`border-l-4`) | Separate with space and type. If a callout needs marking, use a background tint or a label. |
| Nested cards (card inside card inside section card) | One level. Group with whitespace and proximity. |
| Everything `rounded-2xl` with a soft shadow | A radius and shadow policy in tokens. Many good sites use small radii and no shadows. |
| Hover lift on every card (`hover:-translate-y-1` + bigger shadow) | Hover states that match the element's job: underline for links, colour shift for buttons. |
| Numbered steps "1, 2, 3" in circles | Only if the order really matters to the user. |
| Stats banner with round numbers | Real figures in context, or nothing. |
| Emoji as icons, bullets, or nav items | One icon set, used sparingly, or none. |
| Bento grid for content that is not modular | Only for genuinely modular content. |
| Everything centred | Left-aligned text for anything longer than a line; centre only for short, deliberate moments. |

## 5. Motion

| Tell | Fix |
|---|---|
| Every section fades up on scroll (`whileInView` on everything) | One orchestrated load moment plus feedback on real interactions. |
| `transition-all` on everything | Transition only the properties that change. |
| Floating, bobbing, pulsing decorative elements | Motion that explains something (a menu opening, a state change). |
| No `prefers-reduced-motion` handling | Always handle it. |

## 6. Effects (the newer tells)

| Tell | Fix |
|---|---|
| Animated shader-gradient blob behind the hero, in a stock preset | Only if the concept is light, water, sky or fabric, in brand colours, behind a poster. See `immersive-effects.md`. |
| Liquid glass on the nav, every card and every button | One glass panel over a real photo at most, or none. |
| A floating 3D object that depicts nothing (torus, blob, abstract crystal) | 3D only for a real product or place the visitor cares about. |
| Scroll-jacking: smooth-scroll libraries, pinned sections that trap the wheel | Native scrolling. Scroll-scrub only real footage, and keep it short. |
| Three effects on one page | One signature effect per site. |
| A WebGL effect with no poster, no reduced-motion handling, loaded in the main bundle | `EffectFrame` + lazy import. |

## 7. Imagery

| Tell | Fix |
|---|---|
| AI-rendered people with perfect skin, 3D clay figures, abstract gradient orbs | Real photography of the client, their place, their work. |
| Stock photos that could be any company | Specific photos, even if simpler. A real phone photo of the real shop beats a perfect stock image. |
| No width/height (layout shift), no alt text | Always set dimensions and meaningful alt. |
| Default framework favicon, no OG image | Custom favicon and a designed OG image. |

## 8. Code (for anyone who opens the source)

| Tell | Fix |
|---|---|
| Section-label comments: `<!-- Hero Section -->`, `{/* Features */}` | Semantic elements and meaningful class names make the structure obvious. Comments explain *why*, never *what*. |
| `<div onClick>` instead of `<button>`; div soup | Semantic HTML: `header`, `nav`, `main`, `section` with a heading, `article`, `footer`, `button`, `a`. |
| Near-duplicate components (`Card`, `FeatureCard`, `ServiceCard`) | One component with props, or honest separate components with different jobs. |
| Mixed naming conventions in one file | One convention, applied everywhere. |
| Unused imports, dead code, `console.log`, commented-out blocks | Clean up before handing over. |
| `try { } catch (e) { console.log(e) }` and nothing else | Handle the error or show the user something useful. |
| Hard-coded hex and pixel values scattered in components | Tokens. |
| Inline styles mixed with a CSS framework | One styling approach. |
| A new dependency for every small feature | Use the platform (CSS, native elements) first. |
| Multiple `<h1>` per page, duplicate titles and meta descriptions | One H1, unique meta per page. |
| Secrets in client code, `.env` committed | Server-side keys only; `.env*` in `.gitignore`. |
| Builder fingerprints left in (generator meta tags, `v0`/`lovable` script URLs, boilerplate SVGs) | Remove them. |
| One giant commit | Small commits with plain messages, if the project uses git. |

## Sources

- Anthropic, "Improving frontend design through Skills" (claude.com/blog/improving-frontend-design-through-skills)
- Developers Digest, "AI Design Slop: 16 Patterns That Out Your App as Vibe-Coded"
- The Fountain Institute, "7 Signs a UI Has Been Vibe Coded"
- Sinton Agency, "How to Spot a Vibe Coded Website (and Fix It)"
- Slopdar, "How to tell if a website is AI-generated: 10 signs"
- HustleToAI, "How to Tell If a Website Was Vibe Coded: A Developer's Detection Guide"

Compiled September 2026. These trends move: what AI over-uses shifts as models and prompts change. Re-check every few months.
