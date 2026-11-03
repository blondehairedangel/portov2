# DESIGN.md — Neil Stanley Portfolio

Status: **Draft for review** (Phase 1–2). Nothing is implemented yet.

---

## 1. Visual concept: "The Ledger"

The site is set like a well-typeset personal dossier. Structure comes from a strict grid,
hairline rules, and typography. There are almost no cards, no shadows, and no decorative
shapes.

Three devices carry the identity across every page:

1. **Hairline rules as architecture.** Content sits in rows separated by 1px rules
   (`--border`), the way a printed index or an annual report is laid out. Rows replace cards.
2. **A sans/serif voice split.** Headlines are set in Geist Sans, tight and confident.
   One word per headline at most switches to an italic editorial serif (Newsreader Italic).
   Example: `Learning. Building.` *`Troubleshooting.`* The serif is the "creative" half of the
   brand; the sans is the "technical" half. It is used sparingly so it keeps its meaning.
3. **Mono metadata.** Dates, locations, section numbers, and tool names are set in Geist Mono,
   small, uppercase, tracked. This reads as "technical" without resorting to code motifs,
   terminal windows, or icons.

What the site will deliberately not have: gradients, glass panels, floating blobs, icon grids,
skill-level bars, colorful badge clouds, testimonial carousels, or a centered SaaS hero.

Apple influence is in the discipline (whitespace, type hierarchy, calm motion, precise
alignment), not in the look of apple.com.

---

## 2. Color tokens

Defined as CSS custom properties and mapped into Tailwind v4 via `@theme`. The `.dark`
class on `<html>` swaps the values.

| Token              | Light     | Dark      | Use                                              |
| ------------------ | --------- | --------- | ------------------------------------------------ |
| `--bg`             | `#FAFAFA` | `#101010` | Page background                                  |
| `--bg-subtle`      | `#F4F4F4` | `#171717` | Project visual placeholders                      |
| `--fg`             | `#171717` | `#F5F5F5` | Primary text                                     |
| `--fg-muted`       | `#737373` | `#A3A3A3` | Secondary text, metadata                         |
| `--border`         | `#E5E5E5` | `#303030` | Hairline rules                                   |
| `--border-strong`  | `#D4D4D4` | `#404040` | Focus-adjacent rules, active row                 |
| `--accent`         | `#2563EB` | `#60A5FA` | Links on hover, focus ring, progress line        |

Accent rules: the accent never fills a large area. It appears on the focus ring, link hover
underlines, the ledger-row hover rule, and the scroll progress line. Primary buttons are
`--fg` on `--bg` (inverted), not blue.

Contrast (WCAG 2.2):
- `--fg-muted` on `--bg`: 4.54:1 light, 7.54:1 dark. Passes AA for body text, but only just
  in light mode, so metadata will never go lighter than this token or sit on `--bg-subtle`.
- `--accent` on `--bg`: 4.95:1 light, 7.48:1 dark.
- `--fg` on `--bg`: 17.18:1 light.

Project placeholder tints (very desaturated, one per project, only inside placeholder
visuals): Artevo warm stone, FoJo sage, ToolHub concrete/amber, LockSpot slate.
Exact values are tuned during implementation against both themes.

---

## 3. Typography

| Role      | Family                    | Source                          |
| --------- | ------------------------- | ------------------------------- |
| UI / body | Geist Sans (variable)     | `geist` package (next/font/local) |
| Metadata  | Geist Mono (variable)     | `geist` package                  |
| Accent    | Newsreader, Italic 400    | `next/font/google` (self-hosted at build, latin subset) |

Why Newsreader: it has optical sizing, so the italic holds up at 140px display sizes, and it
is less overused on portfolio sites than Instrument Serif or Playfair. Only the italic is
loaded, which keeps the font payload to one extra file.

### Fluid type scale

| Token         | Size                              | Line height | Tracking  | Weight |
| ------------- | --------------------------------- | ----------- | --------- | ------ |
| `display-xl`  | `clamp(2.75rem, 9vw, 9rem)`       | 0.92        | -0.045em  | 500    |
| `display-l`   | `clamp(2.5rem, 5.5vw, 5rem)`      | 1.0         | -0.035em  | 500    |
| `title`       | `clamp(1.75rem, 3.4vw, 2.75rem)`  | 1.1         | -0.03em   | 500    |
| `heading`     | `clamp(1.5rem, 2.4vw, 2rem)`      | 1.15        | -0.02em   | 500    |
| `lead`        | `clamp(1.25rem, 1.8vw, 1.5rem)`   | 1.4         | -0.01em   | 400    |
| `body`        | `1.0625rem` (17px)                | 1.6         | 0         | 400    |
| `small`       | `0.875rem`                        | 1.5         | 0         | 400    |
| `label` (mono)| `0.75rem`, uppercase              | 1.4         | 0.08em    | 400    |

Rules:
- Two weights of Geist Sans in practice: 400 and 500. No bold body text.
- Body measure capped at about 64ch.
- Serif italic only inside `display-xl` / `display-l` headlines, one word or short phrase.
- `text-wrap: balance` on headlines, `text-wrap: pretty` on paragraphs.

---

## 4. Spacing system

4px base unit. Tailwind's default spacing scale is used directly; no custom scale.

Rhythm tokens (CSS variables, fluid):
- `--section-y`: `clamp(6rem, 12vw, 12rem)` vertical padding between major sections.
- `--block-gap`: `clamp(2.5rem, 5vw, 4.5rem)` between a section heading and its content.
- `--row-y`: `clamp(1.25rem, 2vw, 1.75rem)` vertical padding inside ledger rows.

---

## 5. Grid system

| Breakpoint      | Columns | Gutter | Outer margin               |
| --------------- | ------- | ------ | -------------------------- |
| < 768px         | 4       | 16px   | 20px                       |
| 768–1023px      | 8       | 20px   | 32px                       |
| ≥ 1024px        | 12      | 24px   | `clamp(40px, 5vw, 80px)`   |

Max content width 1440px. A shared `.grid-layout` utility applies columns and gutters so every
section aligns to the same vertical lines. Section labels always sit in columns 1–3 on
desktop; content starts at column 4 or later. This consistent left "index column" is what
makes the pages feel edited.

---

## 6. Page compositions

### Header
- 64px tall including its 1px border, sticky. Solid `--bg` background (no transparency or
  blur) so scrolling content never shows through.
- A bottom hairline fades in once the page scrolls (CSS scroll-driven animation; no JS).
- Left: wordmark "Neil Stanley" (Geist Sans 500). Right: three text links (Home, neils.cc, Blog), theme toggle.
  neils.cc and Blog are external and open in a new tab. The homepage sections are reached by
  scrolling or the hero's section index, not the header.
- Active page: text color `--fg` with a 1px underline; inactive links `--fg-muted`. External
  links are never marked active.
- Mobile (< 768px): wordmark + "Menu" text button + theme toggle. Menu opens a full-screen
  sheet with large stacked links numbered `01–03` in mono. Focus is trapped, Esc closes,
  body scroll is locked.

### Home: Hero (asymmetric, oversized type)

```
┌───────────────────────────────────────────────────────────────────────┐
│ NEIL STANLEY — PORTFOLIO    NORTH JAKARTA, ID    INFORMATION SYSTEMS · IT│  mono strip
│───────────────────────────────────────────────────────────────────────│
│                                                                       │
│ Learning. Building.                                                   │  display-xl
│ Troubleshooting.   (serif italic)                                     │
│                                                                       │
│                                   Information Systems student at      │  cols 7–12
│                                   BINUS University. Currently L1 IT   │  lead
│                                   Support at PT DEWAWEB.              │
│                                   [ Get in Touch ]  Explore My Work → │
│───────────────────────────────────────────────────────────────────────│
│ 01 About      02 Experience      03 Work      04 Contact              │  section index
└───────────────────────────────────────────────────────────────────────┘
```

- The headline hugs the left margin; the intro and CTAs sit low and right, so the eye moves
  diagonally. The bottom index row is functional (anchor links) and doubles as a
  table of contents.
- No availability indicator (decision 4 in CONTENT.md). The strip states identity and
  location only.
- No hero image. LCP is the headline text, which is the fastest possible LCP element.
- Mobile: headline wraps to 3–4 lines at about 52–60px, intro stacks below, CTAs become
  full-width 48px-tall buttons, the section index becomes a 2×2 grid.

### Home: About
Two columns. Left (cols 1–3): label `01 — About`. Right (cols 4–12): headline
"A little about me." then a `lead` paragraph, then body paragraphs in two columns on wide
screens. Below, a three-row "Now" ledger:

```
STUDYING     Information Systems, BINUS University            2023 – 2027
WORKING      L1 IT Support, PT DEWAWEB                        Present
EXPLORING    UI/UX design, content creation, software development
```

### Home: Experience preview
A ledger, not a timeline of dots. Each row: period (mono, cols 1–3) · role + organization
(cols 4–9) · location (cols 10–12). Hover: muted text in the row turns `--fg` and a short
accent rule slides in at the left. (No background fill: `--fg-muted` on `--bg-subtle` is only
4.32:1 and would fail AA.) All five roles are listed with a link to `/experience/` for full details.

### Home: Skills
Four disciplines laid out as four columns on desktop (2×2 on tablet, stacked on mobile).
Each column has a large mono numeral, a discipline name, and its skills as plain text lines
separated by hairlines. Hovering one column dims the others to 40% (CSS `:has()`, no JS).
Tools are listed underneath as one running line of mono text grouped by purpose, not
as logos or badges.

### Home: Selected Work
Magazine-style asymmetric grid for the four projects:

```
┌──────────────────────────────┐  ┌──────────────────┐
│                              │  │                  │   row 1: 7 cols + 5 cols
│      Artevo (large)          │  │                  │   (right one offset down)
│                              │  │    FoJo          │
└──────────────────────────────┘  │                  │
 01  Artevo App   UI · UX · Figma └──────────────────┘
                                   02  FoJo App
┌──────────────────┐  ┌──────────────────────────────┐
│    ToolHub       │  │      LockSpot (large)        │   row 2: 5 cols + 7 cols
└──────────────────┘  └──────────────────────────────┘
```

Visual sizes alternate so the section never reads as a grid of identical cards. Text sits
below each visual, separated by a hairline. Hover: visual scales to 1.03 over 600ms, title
gets an underline. Mobile: single column, all visuals at the same 4:3 ratio.

### Home: Education
Compact three-row ledger. BINUS University is set in `heading` size with the degree as the
title; the two school rows are `body` size and muted.

### Home: Contact CTA
Large headline "Let's" + serif italic "*Connect.*" Supporting copy. The email
`hello@neils.cc` set at `heading` size as a link, with a small "Copy" button beside it.
Location as a mono row. No social links (LinkedIn removed by decision).

### Footer
Hairline top rule. Left: "Neil Stanley © 2026" (year computed at build). Centre: page
links. Right: "Built with Next.js." plus a three-state theme control
(System / Light / Dark), which gives a way back to the system setting after a manual choice.

### Secondary pages
Each page opens with a smaller page hero: mono breadcrumb label, `display-l` headline with
one serif word, and a `lead` sentence. Content then expands the matching home section:
- **About:** full biography, "Now" ledger, education, skills.
- **Experience:** every role as an expanded ledger entry: period, role, organization,
  location, description, and expertise as a mono comma list.
- **Projects:** an index list of the four projects followed by full-width editorial
  spreads alternating left/right.
- **Project detail pages:** not built for now (decision 1 in CONTENT.md).
- **Contact:** the contact block at full size, nothing else competing with it.

---

## 7. Motion principles

Motion library: **Motion for React**, loaded through `LazyMotion` + `m` components with the
`domAnimation` feature set to keep the bundle small.

| Where            | What                                                         | How                     |
| ---------------- | ------------------------------------------------------------ | ----------------------- |
| Hero             | Headline lines rise 24px and fade in, 80ms stagger; intro and CTAs follow; whole sequence ≤ 700ms | **CSS keyframes** (runs at first paint, no hydration wait, protects LCP) |
| Section reveal   | Section block fades in and rises 16px once on entering viewport | Motion `whileInView`, `once: true` |
| Mobile menu      | Sheet fades in, links stagger 40ms                           | Motion `AnimatePresence` |
| Theme change     | 250ms cross-fade of the whole page                           | View Transitions API, instant fallback |
| Hover states     | Underlines, row fills, image scale                           | CSS transitions          |
| Header rule / scroll progress | 1px accent progress line under the header   | CSS scroll-driven animations; hidden where unsupported |

Easing: one curve everywhere, `cubic-bezier(0.22, 1, 0.36, 1)` (soft ease-out).
Durations: 150–250ms for hovers, 500–700ms for reveals.

Rules:
- Reveal whole sections or blocks, never individual paragraphs or words below the hero.
- `prefers-reduced-motion: reduce` disables all transforms; opacity changes become instant.
  Motion's `MotionConfig reducedMotion="user"` plus a CSS media query cover both systems.
- Content hidden for a reveal must still be visible without JavaScript (`<noscript>` style
  override).
- No parallax, no scroll hijacking, no cursor followers, no 3D tilt.

---

## 8. Responsive principles

- Mobile-first CSS. Layout changes at 768px and 1024px; type is fluid in between, so there are
  no jumps.
- Each section has a deliberate mobile composition (described per section above), not a
  shrunk desktop layout.
- Touch targets ≥ 44×44px. Buttons are 48px tall on mobile.
- No horizontal overflow at 375px: long strings (email) use `overflow-wrap: anywhere`, and
  display type is checked at 375px with the longest word.
- Viewports verified in QA: 1440, 1280, 1024, 768, 390, 375.

---

## 9. Accessibility checklist

- Semantic landmarks: `header`, `nav`, `main`, `footer`; one `h1` per page.
- Skip-to-content link.
- Visible focus ring: 2px `--accent`, 3px offset, on every interactive element.
- Mobile menu and theme toggle have accessible names and `aria-expanded` / `aria-pressed`.
- Placeholder project visuals are decorative SVGs with descriptive `alt`/`aria-label`.
- Color is never the only signal (active nav uses an underline as well as color).
