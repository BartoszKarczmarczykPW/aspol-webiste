# ASPOL redesign: design.md

Local working-tree redesign of aspol.fr, using mdfellows.com as a **style** reference and keeping ASPOL's content, sections, colours, logo and Sanity wiring.
Nothing has been committed, pushed or deployed. Sanity schema changes exist only in code (not deployed) and no dataset content was changed.

> **Reminder before any commit:** `zdjecia/` (2 GB of source photos) is untracked and is only a temporary selection source. Remove it or add it to `.gitignore` before committing. The 15 selected photos are already copied to `public/assets/events/`.

---

## 1. Reference analysis (mdfellows.com)

**How it was analysed.** Firecrawl is not available in this Claude session, so I used the built-in browser instead. I captured the page at desktop and mobile widths, scrolled it section by section, and read computed styles (fonts, colours, section structure) with the page inspector. Tablet was reviewed on my own build, not on the reference, because the reference is a Framer site that scales fluidly between the two.

| Pattern on mdfellows.com | What I took | How it appears on ASPOL |
|---|---|---|
| Flat, fully saturated colour fields (periwinkle hero, black sections) instead of gradients | One flat field per section | Hero, Testimonials and inner-page heroes are flat **#004AAD**. The Statistics section and footer are flat **#122348**. Newsletter and the partner CTA are flat **#900c15**. |
| Giant poster-weight uppercase headlines (Proxima Nova Extrabold, around 42px even on small blocks) | Heavy, slightly extended, uppercase, tight leading | System sans stack at weight 800 and 112% stretch through the `.display` classes. |
| A huge black **dome/arc** that rises over the hero and becomes the next section | Arc as the section transition | The hero photo rises as a dome and widens on scroll. `.dome-top` gives Statistics, Testimonials, Newsletter and the footer a curved top edge. Inner-page heroes get a convex bottom edge. |
| Pill navigation with a pill CTA ending in a **dark circle with an arrow** | The pill and chip | Floating white pill header. The `Pill` component is the same label plus circular arrow chip, and the arrow swaps on hover. |
| Rounded white/blue **panels** (~32px radius) with large internal padding | One panel radius | `--radius-panel: 2rem`, and the radius **grows** on hover (to 3 to 3.5rem). |
| **Black-and-white photography** in rounded cards, circular portraits | Greyscale photos, colour on hover | `.photo-card` is greyscale at rest and returns to colour with a slow zoom on hover or focus. On touch devices photos stay in colour. |
| Vertical timeline with numbered circles | **Not copied.** ASPOL's content has no sequence, so numbers would encode nothing. | None. |
| Tight copy blocks, lots of whitespace, one idea per screen | Spacing rhythm | `.section-pad` is `clamp(4.5rem, 10vw, 9rem)` top and bottom. Copy columns are capped at 40 to 62 characters. |

Deliberately **not** taken: the reference's section list, its timeline, its tabs, its blue/black palette (ASPOL's navy, blue, red and white replace it) and its copy.

**Design idea in one line:** *a poster of ASPOL's Polish-French bridge.* The dome is the single memorable move (the hall photo rising out of the blue hero). Everything else stays quiet: flat colour, one heading style, one panel radius, one button.

---

## 2. Design tokens

All tokens live in `src/app/(website)/globals.css` (`@theme` block plus the `@layer components` design layer).

### Colour

The brand colours and logo are **unchanged**. The values were read from the existing `@theme` block in `globals.css`.

| Token | Hex | Role |
|---|---|---|
| `aspol-blue` | `#004AAD` | Hero field, testimonials, links and focus on light backgrounds |
| `aspol-navy` | `#143D73` | Logo navy, secondary text on light backgrounds |
| `aspol-dark` | `#122348` | "Ink" colour: headings, dark sections, footer |
| `aspol-red` | `#900c15` | Accent: Newsletter, partner CTA, role labels, red pills |
| `aspol-white` | `#FFFFFD` | Paper background, text on dark |

Derived neutrals (tints of the above, **no new brand colours**):

| Token | Definition | Use |
|---|---|---|
| `aspol-mist` | navy 6% mixed into white | Quiet panels (Team background, inputs section, chips) |
| `aspol-line` | navy 14% mixed into white | Hairlines, dividers |
| `aspol-ink-soft` | dark 72% mixed into white | Body copy on light backgrounds |

Contrast checks: white on `#004AAD` is about 7.6:1, white on `#900c15` about 9.3:1, `#900c15` on mist about 8.4:1, ink on paper above 14:1.

Focus ring: `--focus-ring` is brand blue on light backgrounds and flips to white inside any `.on-dark` container.

### Typography

All text uses the system UI sans-serif stack (`ui-sans-serif, system-ui, sans-serif, …`, i.e. Segoe UI on Windows, San Francisco on Apple devices). No web fonts are loaded, which keeps the site fast. (Archivo/Mulish were briefly wired in via `next/font` and then removed again on request.)

| Role | Settings |
|---|---|
| Display (`.display`) | weight 800, `font-stretch` 112%, uppercase, line-height 0.88 to 1, letter-spacing -0.015em, `text-wrap: balance` |
| Headings in subpages | same family, mixed case (`h1`-`h6` and the `font-serif` utility map to the sans stack) |
| Body and UI | 16 to 18px, line-height 1.6 to 1.7 |

| Class | Size |
|---|---|
| `.display-xl` | `clamp(2.9rem, 13.5vw, 9.5rem)` (hero only) |
| `.display-lg` | `clamp(2.25rem, 6.2vw, 5.75rem)` (section headlines) |
| `.display-md` | `clamp(1.625rem, 3.4vw, 2.75rem)` |
| `.display-sm` | `clamp(1.25rem, 2vw, 1.625rem)` (card titles) |
| Lead / sub-headline | 20 to 24px bold, sentence case |
| Body | 16 to 18px |

### Spacing, radii, shadows

| Token | Value |
|---|---|
| Container | `.container-x`: max-width 88rem, gutters `clamp(1rem, 4vw, 3rem)` |
| Section rhythm | `.section-pad`: `clamp(4.5rem, 10vw, 9rem)` block padding |
| Dome depth | `--dome: clamp(44px, 8vw, 128px)` |
| Panel radius | 2rem (32px). Hover: 3 to 3.5rem. |
| Card/photo radius | 1.75rem (team portraits), 2rem (everything else) |
| Pill / chips | 999px |
| Shadows | Almost none by design. Only the floating header (`0 12px 40px -12px rgba(18,35,72,.35)` after scroll) and the newsletter input. |

### Motion

| Token | Value |
|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)`, used for nearly everything |
| `--ease-in-out-quart` | `cubic-bezier(0.76, 0, 0.24, 1)` (reserved) |
| Fast | 300ms (colour, small hover) |
| Medium | 500 to 700ms (chip swap, radius morph, accordions) |
| Slow | 1000 to 1100ms (headline reveal, photo zoom) |

`prefers-reduced-motion`: the existing global rule shortens all transitions and animations to ~0ms. The hero dome is shown in its final (wide) state, stats show their final numbers immediately, the partner marquee stops and wraps, and the bounce/pulse accents only run under `motion-safe`.

---

## 3. Component specs

### `Pill` (`src/components/ui/Pill.tsx`)
Label (weight 800, uppercase, 14px, +0.04em) with a 43px circular arrow chip.
Variants: `light` (paper pill, dark chip), `dark`, `red`, `blue`, `ghost` (outlined, no chip when `noChip`).
Renders a Next `<Link>` for internal hrefs, `<a>` for external or `mailto:`, `<button>` otherwise. `PillFace` is a non-interactive version used inside a card that is already a link.

| State | Behaviour |
|---|---|
| Rest | Pill with chip |
| Hover / focus-visible | Arrow in the chip slides out to the right while a second arrow slides in from the left (500ms expo). Ghost variant fills with paper. |
| Active | `scale(0.97)` |
| Disabled | 60% opacity, no hover swap (form buttons) |
| Focus | 3px ring, blue on light, white on dark (`.on-dark`) |

### `Reveal` (`src/components/ui/Reveal.tsx`)
Word-by-word mask reveal for headlines. The `aria-label` carries the full string and the animated words are `aria-hidden`. Triggers once on intersect (`immediate` in heroes). Without JavaScript a `<noscript>` rule shows the text.

### `PageHero` (`src/components/layout/PageHero.tsx`)
Inner-page hero: flat tone (`blue`, `dark` or `red`), badge pill, `Reveal` h1, optional subtitle, actions, and an optional right-hand `aside` (photo or card). Convex curved bottom edge.

### Header (`src/components/layout/Header.tsx`)
Floating white pill, fixed at the top (max width 88rem).

| State | Behaviour |
|---|---|
| Top of page | Pill with hairline ring, no shadow |
| Scrolled (>10px) | Soft shadow fades in |
| Desktop (≥1024px) | Logo, six links (underline wipes in from the left on hover), EN/FR/PL segmented control, dark "Join us" pill |
| Below 1024px | Logo plus a round dark menu button (the three bars morph into an X). Join pill appears from 640px up. |
| Menu open | Full-screen **brand-blue** sheet that opens as a circle from the button. Oversized display-type links rise in with a stagger, language buttons and the Join pill sit at the bottom. Escape closes, Tab is trapped (the menu button stays reachable), focus returns to the button, body scroll is locked. |

The logo is the unmodified `aspol-logo-official.png` on a pure white pill.

### Cards and panels
| Component | Rest | Hover / focus |
|---|---|---|
| Feature panel (About) | Tonal panel (dark / mist / blue), icon in a circle | Radius 2rem → 3.25rem, icon circle tilts and scales |
| Lead panel (About "Pathway") | Greyscale photo, navy gradient, white text, `PillFace` | Photo returns to colour and zooms, radius grows, arrow swaps |
| Initiative card | Greyscale photo, dark gradient, white text, share chips in a white capsule | Colour and zoom, radius grows, icon tilts |
| Team card | Greyscale 4:5 portrait, LinkedIn chip (always visible, 44px) | Colour, zoom, radius 1.75rem → 3rem, chip turns blue |
| Accordion row (FAQ) | Hairline row, plus icon | Question turns blue; opening animates height via `grid-template-rows` 0fr → 1fr and the plus becomes a minus |
| Form field | White, 1px line ring | 2px blue ring on focus; error: red ring and red message (`role="alert"`) |

---

## 4. Section-by-section layout (home page)

Order is **unchanged**: Hero → Partners → About → Statistics → Initiatives → Team → Testimonials → FAQ → Newsletter → Contact → Footer. No sections were added, removed or reordered.

| # | Section | New layout |
|---|---|---|
| 1 | **Hero** (`Hero.tsx`) | Flat blue field. Badge "Est. 2016 · Paris, France" (existing hard-coded text), then the h1 ("{welcome} ASPOL") at poster size with the word-mask reveal. Below it, a two-column row: sub-headline plus description on the left, the two existing CTAs (Join ASPOL, Become a Partner) on the right. A "scroll to discover" link follows. The hall photo rises at the bottom as a **dome** and widens from 78% to 100% of the width as the page scrolls. |
| 2 | **Partners** (`PartnersLogos.tsx`) | Paper background. Display-size heading left, "Become a Partner" pill right. The logo marquee (70s loop, pauses on hover, wraps when reduced motion is on) shows logos as grey tiles that turn to colour on hover. |
| 3 | **About** (`About.tsx`) | Two-column header: huge title left, bold subtitle and description right, eyebrow as a small pill. The first feature (Pathway) becomes a full-width photographic panel that links to `/pathway`. The remaining features sit in an auto-fitting grid of tonal panels. Any number of features works. |
| 4 | **Statistics** (`Statistics.tsx`) | Navy section with a dome top edge and a low-opacity desaturated hall photo. 2 or 4 columns of giant counted-up numbers on hairlines. Counting uses the existing easing and respects reduced motion. |
| 5 | **Initiatives** (`Events.tsx`) | Heading left, intro right. The featured initiative is a two-part panel (blue text side + greyscale photo). Other initiatives are photographic cards in an auto-fit grid. Share buttons are kept inside a white capsule. Closing statement ("Interested in joining…") with a red pill. |
| 6 | **Team** (`Team.tsx`) | Mist background. 2/3/4-column grid of 4:5 greyscale portraits, name in display type, role in red, board label, LinkedIn chip. Easter egg on the web developer's name (HackerText) kept. Closing line plus red "volunteer" pill. |
| 7 | **Testimonials** (`Testimonials.tsx`) | Blue section with a dome top edge. A big navy panel: a paper-coloured **initials circle** (no invented portraits) beside the quote in large display-weight sentence case, name/role/year below. Prev/next round buttons and a segmented progress bar. Swipe, autopilot and ARIA behaviour kept. Under it, a horizontally scrolling strip of greyscale event photos. |
| 8 | **FAQ** (`FAQ.tsx`) | Two columns: sticky heading, intro and search on the left, hairline accordion on the right. Search and "no results" state kept. |
| 9 | **Newsletter** (`Newsletter.tsx`) | Red section with a dome top edge. Title and copy left, a single white pill input with a round submit chip right. Honeypot and timing fields untouched. |
| 10 | **Contact** (`Contact.tsx`) | Heading and intro, contact details as rows with round icon chips (left), the form in a mist panel (right), then a full-width blue "Join" panel with the sunset-terrace photo under a multiply layer. The `#contact` and `#join` anchors are kept. |
| 11 | **Footer** (`Footer.tsx`) | Navy dome. Large statement (the existing footer sentence) with the Join pill, then logo chip, links, legal links, social chips and credit line. The logo is shown **unmodified on a light chip** instead of the previous black/inverted treatment. |

Inner pages:

| Page | Change |
|---|---|
| `/events` | `PageHero` plus a restyled body: floating segmented Upcoming/Archive control, one shared event card (mist panel; featured events in navy), display-type date tag, round add-to-calendar button, mist calendar section with a navy-dot month view. |
| `/blog` | `PageHero` with the Instagram highlights inside (rounded posters, round arrow controls), filter chips, a navy featured-article panel and mist post cards with the same radius-morph hover as the home page. |
| `/blog/[slug]`, `/events/[slug]` | Same hero, cover image in a rounded frame, display-type lead, on-brand long-form text (`.article-body`), sponsor/partner tiles and a sticky details panel for events. |
| `/partners` | Fully recomposed in the new language: `PageHero` with the PPF X banner group photo, value panels, sticky scope list, navy "community profile" numbers, red CTA panel. All copy unchanged. |
| `/pathway` | `PageHero` replaces the old hero; later sections inherit the new `SpotlightCard` look (rounded 2rem, mist). |
| `/ppf` | Only the hero band of the registration page was restyled (blue, display type, curved edge). The form logic and layout are untouched. |
| `/404` | Rebuilt as a blue poster page with a huge "404" and a link list. |
| Event/blog/university detail pages, legal pages, DOB update, email preview | **Not redesigned in this pass.** They inherit the new header, footer, typography and colours. |

---

## 5. Animation and interaction catalogue

| # | Name | Trigger | What happens | Where |
|---|---|---|---|---|
| 1 | Headline word reveal | Hero on load; other headings when 35% in view | Each word rises out of an overflow mask, 55ms stagger, 1.05s expo | All `Reveal` headings |
| 2 | **Rising dome** (the signature move) | Scroll 0 → 70% of viewport height | Hero photo dome widens 78% → 100% (rAF-throttled, writes one CSS variable) | Hero |
| 3 | Pill arrow swap | Hover / focus | Arrow leaves right, second arrow enters from the left | All pills, `PillFace` inside cards |
| 4 | Panel radius morph | Hover | Corner radius grows 2rem → ~3.3rem | About, Initiatives, Team, Partners panels |
| 5 | Photo colour + zoom | Hover / focus-within | Greyscale → colour, scale 1.04, 0.7s / 1.1s | `.photo-card` (touch devices stay in colour) |
| 6 | Counter | 30% in view | Numbers count up to the CMS value (2.2s ease-out-quart) | Statistics |
| 7 | Partner marquee | Always | 70s linear loop, pauses on hover, static when reduced motion | Partners |
| 8 | Header shadow | Scroll > 10px | Shadow fades in | Header |
| 9 | Nav underline wipe | Hover / focus | Underline enters from left, exits right | Desktop nav |
| 10 | Mobile menu | Tap | Circular clip-path expands from the button, links rise with stagger, bars morph to X | Header |
| 11 | Accordion | Click | Height animates (`grid-template-rows`), plus becomes minus | FAQ |
| 12 | Quote swap | Slide change | New quote rises 18px and fades in once | Testimonials |
| 13 | Route transition | Navigation | Page eases up 12px while fading in (now pure CSS, so there is no flash if JS is slow) | `template.tsx` |
| 14 | Icon tilt | Hover | Icon circles rotate -12° and scale 1.1 | Panels, initiatives |

Removed: the old shine-sweep on buttons, the 3D team-card tilt, the blob and constellation hero background, scroll fade-ups on every section.

Performance notes: only one scroll listener (hero, rAF throttled, passive); everything else is CSS or a one-shot IntersectionObserver. The hero photo is the only `priority` image, with `sizes="100vw"`; all other photos are lazy with explicit `sizes`.

---

## 6. Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| **< 640px (mobile)** | Single column. Hero headline ~13.5vw (two lines), CTAs stack, dome is taller (aspect 1.55:1). Header shows logo and menu button only (Join lives in the menu). Panels are full width with 28px padding. Team grid 2 columns. Stats 2 columns. Testimonial photo strip scrolls with snap. FAQ accordion full width, "Contact us" button after the list. |
| **640-1023px (tablet)** | Join pill appears in the header. Hero dome aspect 2.3:1. Team 3 columns. About/Initiatives panels keep single column or two-up (auto-fit). Language switcher appears from 768px. |
| **≥ 1024px (desktop)** | Full navigation. Two-column section headers (7/5 split). Hero text and CTAs on one row. FAQ heading is sticky. Team 4 columns, stats 4 columns, featured initiative splits text/photo. |
| **≥ 1408px** | Content capped at 88rem; type sizes capped by their `clamp` maximums. |

Touch devices: photo cards stay in colour, hover-only effects are decorative only, tap targets are 44px or larger (menu button, chips, accordions, carousel dots).

### Mobile pass (phones and tablets)

Audited at 375px (home, events, blog, partners, pathway, a university guide, PPF) and 768px (home): no horizontal overflow on any page.

| Change | Why |
|---|---|
| Stand-alone pill buttons are full width below 640px (label left, arrow chip right; ghost pills centred). Labels may wrap and never exceed their container. | Thumb-sized targets; the long "Pathway to French Universities" pill used to run out of its panel. |
| Hover effects that swap the pill arrow only run where a real hover exists (`@media (hover: hover)`); keyboard focus keeps them. | No "stuck" hover state after a tap. |
| A floating "Join us" pill appears at the bottom after the hero on phones (white ring so it reads on navy and white), hides while a text field is focused, while the menu is open and when the footer is in view. Respects `env(safe-area-inset-bottom)`. | The header Join button is hidden on small screens, so joining was only possible from the menu. |
| Desktop navigation switches to the hamburger below 1280px (was 1024px); links never wrap. | The six links and language switcher did not fit around 1000px. |
| Footer links get 40px+ tap height on phones; footer bottom padding clears the floating button. | Touch targets were 32px. |
| Mobile menu bottom padding uses the safe-area inset. | Notched phones. |
| Team names and testimonial quotes scale down in the 2-column / narrow layouts. | Long names and quotes were cramped. |
| Pathway page body, university guide pages and the legal pages were rebuilt/restyled in the same language (mist panels, display headings, pill buttons). | They still had the old centred, thin-card look that clashed on every screen size. |
| Legacy global rule that turned every link inside an `<article>` red/underlined no longer touches pills or card links. | Pill labels inside cards were rendering red on navy. |
| PPF agenda: red date on dark navy replaced with soft white; faux-italic headings replaced with the display face. | Contrast and typography. |

### SEO pass

Audited on a local production build (`next build` + `next start`), reading the raw HTML crawlers receive for 11 routes plus the 404, the sitemap and robots.

| Found | Fix |
|---|---|
| The `metadata.ts` files next to `/events`, `/blog`, `/partners`, the legal pages and the two `[slug]` routes were never loaded (Next.js only reads metadata from `page`/`layout` files, and these pages are client components). All of them shipped the home page title, description and **canonical = https://aspol.fr**. | Added a small `layout.tsx` to each route that re-exports its metadata. Every page now has its own title, description, canonical, Open Graph and Twitter tags. |
| Blog article text was fetched in the browser, so the HTML contained only a spinner; the `/blog` and `/events` lists were also empty in the raw HTML. | The article, the blog index and the events index are now fetched on the server (`revalidate = 300`, Sanity cache tags kept) and handed to the same client views; the client fetch remains as a fallback. Articles, post links and event cards are now in the crawled HTML. A missing article returns the not-found page. |
| `/pathway/*` guides all shared one title and canonical. | Per-guide `generateMetadata` (title "Study at {university}: admissions guide | ASPOL", description, canonical). |
| `/pathway` and `/ppf` had Open Graph tags without an image; dynamic pages pointed at `og-image.svg` (social crawlers ignore SVG). | One shared `DEFAULT_OG_IMAGE` (1200×630 PNG) in `src/lib/seo.ts`, used everywhere; canonical added for `/pathway`. |
| Sitemap listed neither `/ppf` nor the nine university guides, and used a bundled blog list that can differ from Sanity (404 URLs). | Sitemap now includes them and builds blog URLs from Sanity (bundled list only as fallback). 30 URLs. |
| The hero headline stayed invisible until React hydrated (JS-driven reveal), delaying LCP and breaking without JS. | The hero headline uses a CSS-only entrance (`.is-now`); below-the-fold headings keep the observer-based reveal with a `<noscript>` fallback. |
| The `next/font` variables were set on `<body>`, but the theme variables that use them are declared on `:root`, so the web fonts never applied while four font files were still preloaded. | Web fonts removed entirely; the site uses the system font stack (no font requests, nothing to preload). |

Verified in the final HTML: one `<h1>` per page, unique title/description/canonical per route, all `<img>` have `alt` (only decorative ones are empty), valid JSON-LD (Organization, WebSite, Event), `noindex` on the 404, `/studio/` disallowed in robots.txt.

Known, left unchanged: the language is chosen client-side, so crawlers always get the English HTML (`<html lang="en">` and `?lang=` alternates are not server-rendered per language); the site-wide Event JSON-LD still describes PPF X on 17 April 2026, which is in the past and should be updated or removed; `/blog/<unknown>` answers HTTP 200 with a `noindex` not-found page (the route shows a loading shell first).

---

## 7. Sanity mapping

All pre-existing fields and GROQ projections are unchanged (new optional fields were only **added**, see the end of this section). The tables below list what each component reads; the new optional fields are in the next subsection.

| Component | Document / fetch | Fields used | Fallback if missing |
|---|---|---|---|
| `PartnersLogos` | `partner` via `getPartners()` | `name`, `website`, `logo.asset`, `logoPath`, `order`, `status` | Built-in partner list |
| `About` | `aboutSection` via `getAboutSection()` | `eyebrow`, `title`, `subtitle`, `description`, `features[]` (`order`, `link`, `title`, `description`; `icon` is not used for rendering) | Translation file (`t.about.*`) |
| `Statistics` | `statistics` via `getStatistics()` | `items[]` (`value`, `suffix`, `order`, `label`) | Built-in four statistics |
| `Events` (Initiatives) | `initiative` via `getInitiatives()` | `featured`, `icon` (decides icon + photo), `title`, `badge`, `description`, `order`, `status` | Translation file (`t.events.*`) |
| `Team` | `teamMember` via `getTeamMembers()` | `name`, `role`, `linkedin`, `photo.asset` (+ `lqip`), `order`, `status` | Built-in board list with local photos |
| `Testimonials` | `testimonial` via `getTestimonials()` | `name`, `role`, `text`, `year`, `order`, `status` | Built-in testimonials per language |
| `Events` page | `event` via `getEvents()` | all existing fields | n/a |
| `/blog` | `post` via `getPosts()` | all existing fields | n/a |
| Header/Hero/Footer/FAQ/Contact/Newsletter | Translation file and component constants (not Sanity) | n/a | n/a |

Variable-content handling: About features and Initiatives use `auto-fit` grids (any count); Team is a responsive grid (any count); Testimonials derive the progress bar from the array length; long headlines wrap (`text-wrap: balance`, `overflow-wrap`); missing team photos fall back to `default-avatar.svg`; missing partner logos are filtered out; missing optional fields (badge, year, eyebrow) simply hide.

### Sanity schema changes (applied in code, NOT deployed)

Approved by you and implemented **locally**. Every new field is **optional**: an empty field means the website keeps its built-in text or photo, so existing documents stay valid and the site looks identical until an editor fills something in. No dataset content was written and the Studio was not deployed. The Studio is embedded in this app at `/studio`, so the new fields appear there only after you deploy.

New document types (shown in the Studio sidebar, singletons open directly):

| Document | Kind | What editors control |
|---|---|---|
| **Site Settings** (`siteSettings`) | singleton | Membership form URL (used by every "Join" button), Facebook/Instagram/LinkedIn URLs and labels, contact email, location (EN/FR/PL), hero badge text, board season (e.g. 2026/27), footer statement (EN/FR/PL) |
| **Home Page Content** (`homePage`) | singleton | Hero title, subtitle, description, both button labels and photo; statistics background photo; headings, intros and button labels for Partners strip, Initiatives, Team, Testimonials, FAQ, Newsletter, Contact and the Join panel; event photo strip (up to 12 photos with alt text); Join panel photo. All text is EN/FR/PL. |
| **FAQ** (`faq`) | list | Question, answer (EN/FR/PL), order, active/inactive. If no active FAQ exists the built-in questions are shown. |
| **Partners Page** (`partnersPage`) | singleton | Hero (badge, title, subtitle, button, photo), value cards, collaboration list, community statistics and disciplines, final call to action. Lists replace the defaults only when they contain items. |

Optional fields added to existing types:

| Type | New field | Effect |
|---|---|---|
| `initiative` | `image` (with EN/FR/PL alt) | Card/panel photo; otherwise the built-in event photo by icon |
| `initiative` | `link` (URL) | Adds a "Learn more" button to the card |
| `aboutSection` → feature | `image` (with alt) | Background photo of the lead (first) panel |
| `testimonial` | `photo` (with alt) | Round portrait instead of the initials circle |

Code changes behind it: `src/sanity/schemaTypes/_fields.ts` (field helpers), `siteSettings.ts`, `homePage.ts`, `faq.ts`, `partnersPage.ts`, edits to `initiative.ts`, `aboutSection.ts`, `testimonial.ts`, `index.ts`, `src/sanity/structure.ts`; new queries `getSiteSettings`, `getHomePage`, `getFaqs`, `getPartnersPage` and extended image/link projections in `src/lib/sanity.ts` (existing projections only gained fields, none were changed or removed); `src/contexts/SiteContentContext.tsx` fetches the two singletons once for the whole site and falls back to defaults while loading or if Sanity is unreachable.

Wired into: Header, Hero, Partners strip, About, Statistics, Initiatives, Team, Testimonials, FAQ, Newsletter, Contact, Footer and `/partners`.

Still **not** editable in Sanity: the navigation labels, the `/pathway` and `/ppf` page copy, the legal pages, the university guides and the form validation/e-mail templates (they live in `translations.ts` and the page files). Say if you want any of these moved too.

Deploy order when you are ready (nothing here has been done): deploy the Studio/schema first, then create the documents in the Studio (they can stay empty), then deploy the site. Pre-existing queries keep working against a dataset that does not have the new fields yet.

---

## 8. Photo selection log

Method: all 182 photos (135 from `PPF 2024 Day 2`, 47 from `PPF DAY 1 - PAN`) were reviewed on contact sheets with a sharpness score (Laplacian variance), then the finalists were checked in detail. Criteria: sharp, well exposed, well composed, relevant to a student community, no closed eyes or awkward expressions, no near-duplicates, and no third-party watermark. Originals in `zdjecia/` were not modified or deleted. Selected photos are resized (max 2000px, JPEG q80) into `public/assets/events/` and served through `next/image` with responsive `sizes`, lazy loading (except the hero) and localised alt text (`src/lib/photos.ts`).

Event naming: `PPF 2024 (Day 2)` is the folder "PPF 2024 Day 2"; `PPF X 2026 (Day 1)` is the folder "PPF DAY 1 - PAN" (the banner in these photos reads "Paris Polish Forum X 2026").

### Used

| File | Event | Where | Why |
|---|---|---|---|
| `7Q4A0159.jpg` | PPF 2024 (Day 2) | hero (home): rising dome photograph | Widest, sharpest view of the gilded hall full of guests; reads instantly as 'the Forum'; strong leading lines. |
| `7Q4A0177.jpg` | PPF 2024 (Day 2) | Testimonials strip + Pathway page hero | Two smiling guests turning to the camera; sharp, expressive. |
| `7Q4A0402.jpg` | PPF 2024 (Day 2) | Initiatives (home): 'Mentoring' card | Small-group conversation, natural gestures, good depth. |
| `7Q4A0439.jpg` | PPF 2024 (Day 2) | About (home): lead 'Pathway' panel | Young guests laughing on a sunny terrace with the Eiffel Tower — sharp, well exposed, open expressions; fits the mentoring/pathway story. |
| `7Q4A0474.jpg` | PPF 2024 (Day 2) | Initiatives (home): 'Community' card | Three guests genuinely laughing; warm, no closed eyes. |
| `7Q4A0516.jpg` | PPF 2024 (Day 2) | Testimonials (home): photo strip; spare initiative slot | Group around a coffee table in the blue-and-gold salon; everybody looking at the camera. |
| `7Q4A0537.jpg` | PPF 2024 (Day 2) | Statistics (home): desaturated texture behind the numbers | Same hall from the aisle; crowd detail is soft enough to sit under type. |
| `7Q4A0551.jpg` | PPF 2024 (Day 2) | Events page hero card | Five speakers on stage under the screen; widest panel frame, sharp. |
| `7Q4A0694.jpg` | PPF 2024 (Day 2) | Initiatives (spare slot for extra CMS initiatives) | Group of friends on a salon sofa, relaxed and sharp. |
| `7Q4A0864.jpg` | PPF 2024 (Day 2) | Contact (home): 'Join our community' panel backdrop | Friends with drinks at dusk, warm light, decorative use under a blue multiply layer. |
| `7Q4A0889.jpg` | PPF 2024 (Day 2) | Testimonials (home): photo strip | Sunset terrace with the Eiffel Tower; best of the terrace burst (everyone looking at the camera, eyes open). |
| `Aspolska_V-2817.jpg` | PPF X 2026 (Day 1) | Initiatives (home): featured 'Paris Polish Forum' panel | Panel under the PPF X banner with French, Polish and EU flags; clear composition, the flags tell the Polish-French story. |
| `Aspolska_V-4033.jpg` | PPF X 2026 (Day 1) | Testimonials (home): photo strip; spare initiative slot | Violin and piano performance from PPF X, the cultural side of the event. |
| `Aspolska_V-4255.jpg` | PPF X 2026 (Day 1) | Testimonials (home): photo strip | Singer mid-performance; best frame of the sequence (clear face, no closed eyes). |
| `Aspolska_V-4825.jpg` | PPF X 2026 (Day 1) | Partners page hero | Speakers and organisers in front of the PPF X banner; evenly lit, centred. |

### Shortlisted but not used

| File | Event | Why not |
|---|---|---|
| `7Q4A0064.jpg` | PPF 2024 (Day 2) | good audience frame, redundant with 537/159 |
| `7Q4A0070.jpg` | PPF 2024 (Day 2) | atmospheric silhouette but too dark for any current slot |
| `7Q4A0812.jpg` | PPF 2024 (Day 2) | daytime terrace group, near-duplicate of 439 |
| `Aspolska_V-2332.jpg` | PPF X 2026 (Day 1) | speaker with flags, near-duplicate of V-2817 |
| `Aspolska_V-3437.jpg` | PPF X 2026 (Day 1) | interview on stage, mid-speech expression |

### Rejected (grouped by reason; `24` = PPF 2024 Day 2, `26` = PPF X Day 1)

**Carries a third-party 'iFrancja' watermark/credit; cannot be used on the site without licensing** (10)

2902fe9e-1af3-4665-8d90-80d2603404e7 (24), 4e83cda8-e999-4440-8013-996af5d79024 (24), 532eca27-4f3c-4b3e-a3fe-a73f3e33b162 (24), 5d28b361-7c06-45f3-8054-38ddb675c5a5 (24), 7a3789cf-a7aa-4c56-aa98-3a892c254350 (24), 8a98173d-afdd-4dca-8ddb-28da151883d5 (24), 9a2c9645-4aaa-4ba3-b0aa-e7507a0fecdf (24), b1c8b615-aa55-43bb-95cf-bdb1557b06a8 (24), c4de63c3-4203-4001-a952-75f2da24eb7e (24), e4af7cef-9b39-4c1e-a361-b98c1e3973e0 (24)

**Empty or detail shot (room, view, doorway, lone figure); no community content** (5)

7Q4A0060 (24), 7Q4A0256 (24), 7Q4A0457 (24), 7Q4A0499 (24), 7Q4A0686 (24)

**Weaker composition or redundant with a stronger frame** (1)

7Q4A0073 (24)

**Speaker mid-speech (open mouth, tight crop or awkward gesture); a stronger panel frame is used** (25)

7Q4A0076 (24), 7Q4A0099 (24), 7Q4A0103 (24), 7Q4A0110 (24), 7Q4A0127 (24), 7Q4A0129 (24), 7Q4A0132 (24), 7Q4A0133 (24), 7Q4A0147 (24), 7Q4A0154 (24), 7Q4A0450 (24), 7Q4A0453 (24), 7Q4A0486 (24), 7Q4A0566 (24), 7Q4A0577 (24), 7Q4A0580 (24), 7Q4A0591 (24), 7Q4A0600 (24), 7Q4A0602 (24), 7Q4A0608 (24), 7Q4A0628 (24), 7Q4A0632 (24), 7Q4A0645 (24), 7Q4A0672 (24), 7Q4A0676 (24)

**Audience/networking candid with closed eyes, turned heads, tight crop or redundant composition** (37)

7Q4A0089 (24), 7Q4A0090 (24), 7Q4A0094 (24), 7Q4A0117 (24), 7Q4A0120 (24), 7Q4A0131 (24), 7Q4A0136 (24), 7Q4A0138 (24), 7Q4A0145 (24), 7Q4A0163 (24), 7Q4A0168 (24), 7Q4A0171 (24), 7Q4A0172 (24), 7Q4A0184 (24), 7Q4A0192 (24), 7Q4A0201 (24), 7Q4A0206 (24), 7Q4A0404 (24), 7Q4A0411 (24), 7Q4A0413 (24), 7Q4A0419 (24), 7Q4A0445 (24), 7Q4A0461 (24), 7Q4A0462 (24), 7Q4A0472 (24), 7Q4A0475 (24), 7Q4A0495 (24), 7Q4A0539 (24), 7Q4A0541 (24), 7Q4A0571 (24), 7Q4A0572 (24), 7Q4A0658 (24), 7Q4A0660 (24), 7Q4A0662 (24), 7Q4A0680 (24), 7Q4A0749 (24), 7Q4A0763 (24)

**Catering/still-life; not people or community, low relevance to ASPOL's story** (16)

7Q4A0217 (24), 7Q4A0218 (24), 7Q4A0230 (24), 7Q4A0232 (24), 7Q4A0233 (24), 7Q4A0234 (24), 7Q4A0235 (24), 7Q4A0237 (24), 7Q4A0238 (24), 7Q4A0246 (24), 7Q4A0249 (24), 7Q4A0699 (24), 7Q4A0707 (24), 7Q4A0710 (24), 7Q4A0712 (24), 7Q4A0731 (24)

**Posed burst of the same people/spot as a used frame, or individual portrait; redundant** (13)

7Q4A0349 (24), 7Q4A0357 (24), 7Q4A0361 (24), 7Q4A0368 (24), 7Q4A0395 (24), 7Q4A0502 (24), 7Q4A0508 (24), 7Q4A0511 (24), 7Q4A0521 (24), 7Q4A0523 (24), 7Q4A0725 (24), 7Q4A0785 (24), 7Q4A0794 (24)

**Part of the sunset-terrace burst; weaker than the used frames (flash glare, someone mid-blink or off-camera)** (14)

7Q4A0832 (24), 7Q4A0841 (24), 7Q4A0843 (24), 7Q4A0846 (24), 7Q4A0849 (24), 7Q4A0854 (24), 7Q4A0856 (24), 7Q4A0858 (24), 7Q4A0873 (24), 7Q4A0875 (24), 7Q4A0882 (24), 7Q4A0886 (24), 7Q4A0894 (24), 7Q4A0930 (24)

**Soft focus / motion blur or heavy foreground blur in low light; not sharp enough** (22)

Aspolska_V-0953 (26), Aspolska_V-0999 (26), Aspolska_V-1009 (26), Aspolska_V-1043-2 (26), Aspolska_V-2014-3 (26), Aspolska_V-2035 (26), Aspolska_V-2348 (26), Aspolska_V-3067 (26), Aspolska_V-3177 (26), Aspolska_V-3360 (26), Aspolska_V-3748 (26), Aspolska_V-3789 (26), Aspolska_V-3924 (26), Aspolska_V-3962 (26), Aspolska_V-3996 (26), Aspolska_V-4112 (26), Aspolska_V-4176 (26), Aspolska_V-4779 (26), Aspolska_V-4818 (26), Aspolska_V-4855 (26), Aspolska_V-4887 (26), Aspolska_V-4908 (26)

**Detail (flowers, book); no people** (1)

Aspolska_V-0966 (26)

**Speaker mid-speech with awkward expression; near-duplicate of a better panel frame** (5)

Aspolska_V-2411 (26), Aspolska_V-2860 (26), Aspolska_V-3223 (26), Aspolska_V-3404 (26), Aspolska_V-3475 (26)

**Formal portrait of an individual guest speaker; not needed and near-duplicate** (3)

Aspolska_V-3569 (26), Aspolska_V-3575 (26), Aspolska_V-3615 (26)

**Near-duplicate of the used violin frame (V-4033)** (3)

Aspolska_V-4020 (26), Aspolska_V-4042 (26), Aspolska_V-4092 (26)

**Singer near-duplicates; worse timing or half-closed eyes** (3)

Aspolska_V-4199 (26), Aspolska_V-4217 (26), Aspolska_V-4322 (26)

**Stage line-up, dark and cluttered with banner/foreground** (2)

Aspolska_V-4345 (26), Aspolska_V-4506 (26)

**Redundant with a stronger frame from the same event** (1)

Aspolska_V-4738 (26)

**Near-duplicate of used group photo (V-4825); partly obscured by banner** (1)

Aspolska_V-4840 (26)

Totals: 182 reviewed, 15 used, 5 shortlisted-unused, 162 rejected.

---

## 9. Files changed and added

Modified:

- `src/app/(website)/layout.tsx`: Lora and Mulish removed (system font stack), theme colour `#143D73`, `<noscript>` rule for headline reveal
- `src/app/(website)/globals.css`: tokens, new `@layer components` design layer (display type, pill, dome, reveal, photo-card, nav link, page-in, quote-in), brand-colour focus ring and scrollbar, removed button shine sweep and the global mobile `section` padding
- `src/app/(website)/page.tsx`: wrapper background to paper (section order unchanged)
- `src/app/(website)/template.tsx`: route transition now pure CSS
- `src/app/(website)/not-found.tsx`: redesigned
- `src/app/(website)/events/page.tsx`: hero swapped to `PageHero` (imports cleaned)
- `src/app/(website)/blog/page.tsx`: hero recoloured (flat blue, curved edge, display type)
- `src/app/(website)/partners/page.tsx`: recomposed (content constants untouched)
- `src/app/(website)/pathway/page.tsx`: hero swapped to `PageHero`
- `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`: rebuilt (all links, tracking events, language switching, focus trap and a11y kept)
- `src/components/sections/Hero.tsx`, `PartnersLogos.tsx`, `About.tsx`, `Statistics.tsx`, `Events.tsx`, `Team.tsx`, `Testimonials.tsx`, `FAQ.tsx`, `Newsletter.tsx`, `Contact.tsx`: restyled (data fetching, form logic, validation and server actions kept)
- `src/components/ppf/PPFRegistration.tsx`: hero band only (class changes)
- `src/components/ui/cards/SpotlightCard.tsx`: default radius, fill and spotlight colour

Added:

- `src/components/ui/Pill.tsx`, `src/components/ui/Reveal.tsx`, `src/components/layout/PageHero.tsx`
- `src/lib/photos.ts` (photo catalogue with localised alt text)
- `src/contexts/SiteContentContext.tsx`, `src/sanity/schemaTypes/{_fields,siteSettings,homePage,faq,partnersPage}.ts` (CMS fields, see section 7)
- `public/assets/events/*.jpg` (15 selected photos, ~4.9 MB total)
- `design.md`

Untracked helper files that are **not** part of the redesign: `.claude/launch.json` (dev-server config for the preview) and `zdjecia/` (source photos, remove before committing).

Not used any more but left in place (safe to delete later): `src/components/ui/effects/SmoothBackground.tsx`, `ConstellationPoints.tsx`, `RippleButton.tsx` (no longer imported by the redesigned pages). `GlassCard.tsx` is still used by `/events/[slug]`.

---

## 10. Verification and known limits

- `npx tsc --noEmit`: clean. `npx next build` (production, local only): compiled successfully, 28 static pages generated, no errors.
- Dev server checked in the browser pane at 1440px and 375px for the home page, plus desktop checks of `/events`, `/blog`, `/partners`, `/pathway`. The mobile menu was opened and closed.
- Not tested: real devices, Safari/Firefox, a Lighthouse run, keyboard walk-through of every page, `/ppf` form flow after the hero change, and detail pages (`/blog/[slug]`, `/events/[slug]`, `/pathway/[slug]`) beyond the shared header/footer.
- The scroll-linked hero is the only scroll listener; remaining motion is CSS or one-shot observers, but Core Web Vitals have not been measured.
- Hard-coded strings that already existed are untouched (hero badge "Est. 2016 · Paris, France", FAQ and testimonial fallbacks, the "Core Disciplines:" label on `/partners`). New text added by the redesign: only the aria-label of the photo strip ("Moments from our events", also in FR/PL) and the image alt texts.
- Fonts: the previous web fonts (Lora, Mulish) were removed; the site uses the system font stack.
