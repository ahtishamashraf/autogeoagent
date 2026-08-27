# GetGeoAgent — marketing website

The public website for **GetGeoAgent**, an AI agent for SEO (Search Engine
Optimization) and GEO (Generative Engine Optimization).

Canonical domain: `https://www.autogeoagent.com`
Application: `https://app.autogeoagent.com`
Visible brand: **GetGeoAgent** — independent of the domain, see [Domains](#domains).

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
| `lib/site.js` | `contactEmail`, `supportEmail`, `privacyEmail` | Currently plausible defaults on the canonical domain — confirm they exist |
| `lib/site.js` | `social` | Only add profiles that genuinely exist; empty entries are omitted from JSON-LD |
| `lib/pricing.js` | `plans[].price` | Published prices. Confirm each one before launch |
| `lib/pricing.js` | `annual` | The 20% annual discount is advertised. Turn it off (`enabled: false`) unless annual billing genuinely exists in the application |
| `lib/pricing.js` | `plans[].features` | Only list what the application actually does today |

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

## Domains

| Host | Behaviour |
| --- | --- |
| `www.autogeoagent.com` | **Canonical.** Every canonical, Open Graph URL, sitemap entry and JSON-LD `@id` is built from it |
| `autogeoagent.com` | 308 redirect to the canonical host |
| `getgeoagent.com`, `www.getgeoagent.com` | 308 redirect to the canonical host |
| `autogeoagent.vercel.app` | Served, but `X-Robots-Tag: noindex, nofollow`. Set `REDIRECT_VERCEL_HOST=1` to redirect it instead |
| `app.autogeoagent.com` | The product application. Not part of this site and never used as a canonical |

The canonical origin lives in one place — `SITE_URL` in `lib/site.js`, overridable
with `NEXT_PUBLIC_SITE_URL`. Host normalisation is in `middleware.js`.

The visible brand is **GetGeoAgent** (`site.name`) and is deliberately independent
of the domain: moving where the site is hosted does not rename the product.

## Launch checklist

1. **DNS** — point `www.autogeoagent.com` at the deployment and add the apex plus
   any legacy hosts so `middleware.js` can redirect them.
2. **Vercel host** — once DNS resolves, set `REDIRECT_VERCEL_HOST=1` so
   `autogeoagent.vercel.app` redirects instead of merely being noindexed.
3. **Search Console** — verify the `https://www.autogeoagent.com` property (a
   domain property covers the apex too), submit `https://www.autogeoagent.com/sitemap.xml`,
   and use the URL Inspection tool on the homepage and two interior pages to
   confirm the canonical Google picks matches the one declared.
4. **Bing Webmaster Tools** — verify the same property and submit the same
   sitemap; it can import the Search Console verification.
5. **Analytics** — set `NEXT_PUBLIC_GA_ID` to load GA4. Without it no analytics
   script is loaded at all, and events still queue on `window.dataLayer` for a
   tag manager. Events emitted: `signup_click`, `login_click`, `pricing_cta`,
   `pricing_toggle`, `feature_cta`, `contact_submit`, `scene_navigate`.
6. **Contact delivery** — configure one of the options below, then submit the
   form once and confirm the message arrives.
7. **Legal** — replace the `lib/site.js` placeholders and have counsel review
   the privacy policy and terms.
8. **Pricing** — confirm every figure in `lib/pricing.js`, including whether
   annual billing exists. Nothing on the pricing page should describe a plan the
   application cannot actually provision.
9. **Structured data** — run the homepage, `/pricing`, `/how-it-works` and one
   blog post through Google's Rich Results Test after the domain is live.
10. **Preview deployments** — these are noindexed automatically by
    `lib/deployment.js`; no action needed.

## SEO and GEO

- Every page is server-rendered with a self-canonical on the canonical host —
  never on the application domain, the apex or the Vercel host.
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
| `content/story.js` | The seven cinematic scenes — written for motion, used only by the homepage |
| `content/how-it-works.js` | The definitive eight-stage loop, used by `/how-it-works` and `llms-full.txt` |
| `content/product/` | The nine capability pages |
| `content/ai-search/` | The five AI-surface pages |
| `content/solutions/` | The four industry pages |
| `content/resources/glossary.js` | Glossary terms, also emitted as `DefinedTermSet` |
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
- `/research` publishes a method and no findings, because no study has been run.
- Blog references link to primary documentation, and `citation` in the Article
  schema is emitted only from those real links.
