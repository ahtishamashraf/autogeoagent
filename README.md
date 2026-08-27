# GetGeoAgent — marketing website

The public website for **GetGeoAgent**, an AI agent for SEO (Search Engine
Optimization) and GEO (Generative Engine Optimization).

Production domain: `https://getgeoagent.com`
Application: `https://app.autogeoagent.com`

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js (App Router, JavaScript) |
| Styling | Tailwind CSS v4 with CSS-first tokens |
| Scroll engine | GSAP ScrollTrigger + Lenis |
| 3D | Three.js via React Three Fiber |
| Fonts | Sora (display) and Inter (text) via `next/font` |

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config)
```

## How the cinematic homepage works

The homepage is one continuous scroll-driven experience rather than a stack of
sections. Everything is a **pure function of scroll position**, which is what
makes it reverse exactly when the user scrolls back up.

```
components/experience/
  Experience.js        assembles the whole thing
  ScrollController.js  measures the document, drives one frame loop
  CameraRig.js         camera keyframes on a continuous story axis
  Atmosphere.js        scene-tinted light, grid, grain, scrims
  CanvasLayer.js       lazy-loads WebGL behind a CSS fallback
  SceneUI.js           the floating product interfaces (HTML, not WebGL)
  scenes/              the semantic story sections and their copy motion
  three/               AgentCore, ParticleField, KeywordGraph, shaders
```

- `lib/scene-config.js` is the single source of truth. A scene's `weight` is its
  scroll length in viewport heights, and it drives both the CSS section height
  and the measured timeline.
- `ScrollController` measures the real DOM offsets on every ScrollTrigger
  refresh, so mobile weights take effect without a second table.
- `lib/experience-store.js` holds the frame state. Continuous consumers (WebGL,
  DOM transforms) subscribe per frame; only the scene navigator re-renders in
  React, and only when the active scene changes.
- `lib/hooks.js` exposes `useSceneMotion(sceneIndex, fn)`, where `fn` receives a
  scene-relative `t` (0 at the scene's start, 1 at its end).

### Layouts

- **Desktop** — copy and interface sit side by side; the agent is between them.
- **Below `lg`** — the story stacks: copy holds in the upper half, the agent and
  its interfaces own the lower half. The camera aims above the origin so the
  agent never sits behind the headline.
- **`prefers-reduced-motion`** — the wrapper becomes an ordinary vertical
  document: one static hero visual, then every scene as a normal section. No
  WebGL, no smooth scrolling, no scroll-driven animation.

## Configuration

Everything brand-, legal- and deployment-specific lives in **`lib/site.js`**.

### Needs real values before launch

| Location | Field | Notes |
| --- | --- | --- |
| `lib/site.js` | `legal.legalEntityName` | Registered company name |
| `lib/site.js` | `legal.registeredAddress` | Registered business address |
| `lib/site.js` | `legal.jurisdiction` | Governing law and courts |
| `lib/site.js` | `contactEmail`, `supportEmail`, `privacyEmail` | Currently plausible defaults on the brand domain — confirm they exist |
| `lib/site.js` | `social` | Only add profiles that genuinely exist; empty entries are omitted from JSON-LD |
| `lib/pricing.js` | `published`, `plans` | No prices are shown until `published: true` and `plans` are filled in |

The privacy policy and terms of service are written as standard SaaS documents
around those placeholders. **They must be reviewed by qualified counsel before
they are relied on.**

### Contact form

`/api/contact` refuses to pretend. With no delivery configured it returns `501`
and the UI tells the visitor to email directly. Configure one of:

```bash
CONTACT_WEBHOOK_URL=https://…      # POSTs the submission as JSON
# or
RESEND_API_KEY=…
CONTACT_TO_EMAIL=…
CONTACT_FROM_EMAIL=…               # must be a verified sender
```

## SEO and GEO

- Every page is server-rendered with a self-canonical on `getgeoagent.com` —
  never on the application domain.
- `lib/routes.js` is the route registry; `sitemap.xml`, `llms.txt`,
  `llms-full.txt` and the footer all read from it.
- `lib/seo.js` builds the JSON-LD graph. It never emits reviews, ratings,
  prices, customer counts or awards.
- Open Graph images are generated at `/api/og` from the page title.
- `robots.txt` explicitly allows search *and* AI crawlers — being readable by
  generative engines is the point of the product.

## Content

| Path | Contains |
| --- | --- |
| `content/story.js` | The seven workflow stages, shared by the homepage and `/how-it-works` |
| `content/capabilities.js` | Platform capabilities, use cases, principles |
| `content/faqs.js` | Homepage and pricing FAQs (also emitted as `FAQPage`) |
| `content/learn/` | The long-form educational pages |
| `content/product.js` | The product page copy |
| `content/blog/posts.js` | Blog posts as structured blocks; word count, reading time and the contents list are derived |
| `content/legal/` | Privacy policy and terms |

Blocks are rendered by `components/sections/ArticleBody.js`, which produces real
headings, lists and tables — so every page has the same clean semantic HTML.

## Claims policy

The site is deliberately conservative:

- No fabricated testimonials, logos, reviews, ratings or customer results.
- Every simulated interface is labelled *Product visualization*,
  *Illustrative data* or *AI visibility simulation*.
- No guarantees of rankings, traffic or AI citations anywhere — the language is
  "designed to improve", "helps build visibility", "optimize for".
