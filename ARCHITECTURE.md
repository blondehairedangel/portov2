# ARCHITECTURE.md — Neil Stanley Portfolio

Status: **Draft for review** (Phase 1–2).

---

## 1. Repository analysis (Phase 1 findings)

The workspace was empty at session start: no repository, no `package.json`, no existing
configuration. Everything below is a fresh setup, so there is no existing config to preserve.

Environment (checked 2 Nov 2026):

| Tool            | Version available | Notes                                   |
| --------------- | ----------------- | --------------------------------------- |
| Node.js         | 22.23.4           | Next.js 16 requires ≥ 20.9              |
| npm             | 11.4.2            | Chosen package manager (see below)      |
| pnpm / yarn / bun | 12.16 / 1.22 / 1.2 | Available, not used                  |
| agent-browser   | installed         | For visual QA screenshots (Phase 7)     |

Latest stable packages on npm:

| Package                | Latest  | Plan                                                    |
| ---------------------- | ------- | ------------------------------------------------------- |
| next                   | 16.4.3  | Use                                                     |
| react / react-dom      | 19.3.1  | Use                                                     |
| tailwindcss + @tailwindcss/postcss | 4.3.3 | Use (CSS-first config, no `tailwind.config`) |
| motion                 | 14.9.0  | Use (`motion/react`)                                    |
| lucide-react           | 1.66.0  | Use, tree-shaken; only 3–4 icons expected               |
| geist                  | 1.9.0   | Use for Geist Sans / Mono                               |
| typescript             | 7.0.2   | **Pinned to 5.9.3.** Tested: `next build` and `tsc` both worked with TS 7.0.2 and caught type errors, but `eslint-config-next`'s typescript-eslint throws "does not support TS 7.0", so linting failed. Revisit when typescript-eslint supports TS 7. |
| eslint                 | 10.14.0 | Use. Runs cleanly with `eslint-config-next@16.4.3` on TS 5.9.3 |

Package manager: **npm**. It is present on every VPS and CI image, needs no extra setup, and
the project has few dependencies, so pnpm's advantages are small here.

---

## 2. Rendering strategy

- `next.config.ts`:
  ```ts
  output: "export",
  trailingSlash: true,        // /about/ → out/about/index.html (works with OLS directory index)
  images: { unoptimized: true },
  ```
- All pages are React Server Components rendered at build time.
- No dynamic routes. Project detail pages are deferred (CONTENT.md decision 1).
- `sitemap.ts`, `robots.ts`, and `opengraph-image.tsx` are statically generated
  (`export const dynamic = "force-static"`).
- `not-found.tsx` → `out/404.html`.
- No API routes, no middleware, no server actions, no `headers()`/`cookies()`. Nothing needs
  a Node.js runtime after build.

### Images
`images.unoptimized: true` means `next/image` does no runtime resizing, so assets are
prepared ahead of time:
- Project images: exported to AVIF + WebP at 2 widths (e.g. 960 and 1920), served through a
  small `<picture>` component with explicit `width`/`height` (prevents CLS) and
  `loading="lazy"` below the fold.
- Until real screenshots exist, project visuals are inline SVG placeholders rendered by a
  server component: zero network requests and no layout shift.
- No hero image, so no eager-loaded image is needed on the homepage.

---

## 3. Client JavaScript budget

Server Components by default. The only Client Components planned:

| Component        | Why it must be client                         |
| ---------------- | --------------------------------------------- |
| `ThemeToggle`    | Reads/writes `localStorage`, toggles class    |
| `MobileMenu`     | Open state, focus trap, scroll lock           |
| `Reveal`         | Motion `whileInView`                           |
| `MotionProvider` | `LazyMotion` + `MotionConfig` wrapper          |
| `CopyEmail`      | Clipboard API                                  |
| `NavLink`        | `usePathname()` for active state               |

Done without JavaScript: hero entrance (CSS keyframes), header rule and scroll progress (CSS
scroll-driven animations), skill column dimming (`:has()`), all hover states.

Theme handling: a ~15-line inline script in `<head>` sets `class="dark"` before first paint
from `localStorage` or `prefers-color-scheme`, which prevents a flash of the wrong theme. This
replaces a `next-themes` dependency.

Target: < 90 KB gzipped first-load JS for the homepage (React + Next runtime is the bulk;
Motion via LazyMotion adds roughly 15–20 KB). Measured from the build output in Phase 8.

---

## 4. Directory structure

```
neil-stanley/
├── DESIGN.md / ARCHITECTURE.md / CONTENT.md / DEPLOYMENT.md (Phase 8)
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg, apple-touch-icon.png
│   └── projects/                 # real screenshots go here later (AVIF/WebP)
└── src/
    ├── app/
    │   ├── layout.tsx            # fonts, theme script, header, footer, JSON-LD
    │   ├── page.tsx              # Home
    │   ├── globals.css           # tokens, @theme, base styles, keyframes
    │   ├── not-found.tsx
    │   ├── sitemap.ts, robots.ts, opengraph-image.tsx
    │   ├── about/page.tsx
    │   ├── experience/page.tsx
    │   ├── projects/page.tsx
    │   └── contact/page.tsx
    ├── components/
    │   ├── layout/   Navbar, NavLink, MobileMenu, Footer, ThemeToggle, ThemeScript
    │   ├── sections/ Hero, About, Experience, Skills, Projects, Education, Contact
    │   ├── motion/   MotionProvider, Reveal
    │   └── ui/       Button, SectionHeading, ProjectVisual, ProjectPlaceholder, CopyEmail
    ├── data/
    │   ├── profile.ts            # name, roles, intro, email, location, links, SEO strings
    │   ├── experience.ts
    │   ├── skills.ts
    │   ├── projects.ts
    │   └── education.ts
    └── lib/
        ├── utils.ts              # cn(), formatPeriod()
        ├── metadata.ts           # buildMetadata(page) → title, description, canonical, OG
        └── jsonld.ts             # Person schema
```

Changes from the suggested structure, and why:
- `TextReveal.tsx` and `ScrollProgress.tsx` are dropped: the hero entrance and the progress
  line are pure CSS, so they don't need components.
- `ProjectCard.tsx` becomes `ProjectVisual` + `ProjectPlaceholder`, because projects are laid
  out differently on the home page, the index page, and the detail page; a single "card"
  would force them all into one shape.
- `lib/metadata.ts` and `lib/jsonld.ts` keep SEO logic in one place.

Sections are reused across pages through props (e.g. `<Experience variant="preview" />` on
Home, `variant="full"` on `/experience/`), so there is one source for each block.

---

## 5. Content model

Structured TypeScript, not MDX. The content is short, structured records (roles, skills,
projects), so typed objects give compile-time checks with no extra MDX tooling. MDX can be
added later for long case studies without changing the data files.

```ts
// data/experience.ts
type Experience = {
  organization: string;
  role: string;
  location: string;
  start: string | null;        // "2022-05"; null = not supplied (rendered as nothing)
  end: string | "present" | null;
  summary: string[];           // paragraphs
  expertise: string[];
};

// data/projects.ts
type Project = {
  slug: string;
  name: string;
  description: string;
  categories: string[];
  tools: string[];
  url: string | null;          // null → "View Live" link not rendered
  image: { src: string; alt: string; width: number; height: number } | null; // null → placeholder
  tint: "stone" | "sage" | "concrete" | "slate";
};
```

`profile.ts` holds no social links; LinkedIn is excluded by decision.

A `TODO(content)` comment marks every placeholder value, so `grep -r "TODO(content)" src/data`
lists everything still missing.

---

## 6. SEO

- `metadataBase: new URL("https://neil-stanley.com")`.
- `lib/metadata.ts` builds per-page `title`, `description`, `alternates.canonical` (always
  with trailing slash), `openGraph`, and `twitter` (`summary_large_image`).
- Title template: `%s — Neil Stanley`; Home uses the full title
  "Neil Stanley — Information Systems Student & IT Support".
- `opengraph-image.tsx`: a typographic 1200×630 image generated at build (name + headline in
  the site's style).
- JSON-LD `Person` in the root layout: `name`, `url`, `email`, `jobTitle`, `worksFor`
  (PT DEWAWEB), `affiliation` (BINUS University), `address` (North Jakarta, ID). No `sameAs`.
- `sitemap.xml` lists the 5 pages.

---

## 7. Quality gates (Phase 8)

| Check          | Command / tool                                   |
| -------------- | ------------------------------------------------ |
| Types          | `tsc --noEmit` (or `tsgo` if TS 7 is used)       |
| Lint           | `eslint .` (Next 16 removed `next lint`)         |
| Build          | `next build` → verify `out/` contents            |
| Static serving | Serve `out/` with a plain static server, click through every route |
| Links          | Crawl `out/` with `linkinator` (run via npx, not added as a dependency) |
| Lighthouse     | `npx lighthouse` against the static server, mobile + desktop |
| Visual QA      | agent-browser screenshots at 1440/1280/1024/768/390/375, both themes |

---

## 8. Deployment outline (full guide written as DEPLOYMENT.md in Phase 8)

- Build locally or in CI: `npm ci && npm run build` → `out/`.
- Upload: `rsync -avz --delete out/ user@vps:/var/www/neil-stanley.com/html/`.
- OpenLiteSpeed vhost document root → that directory; index file `index.html`;
  custom 404 → `/404.html`. No rewrite rules needed because of `trailingSlash: true`.
- Permissions: directories 755, files 644, owned by the vhost user.
- Cache headers via OLS contexts: `/_next/static/` → `public, max-age=31536000, immutable`;
  HTML → `public, max-age=0, must-revalidate`.
- Cloudflare: Full (strict) TLS with an origin certificate; cache rule for `/_next/static/*`;
  purge HTML (or "purge everything") after each deploy.
- No production deployment is run without your explicit approval.
