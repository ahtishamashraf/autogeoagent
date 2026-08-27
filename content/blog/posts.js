import { site } from '@/lib/site';

/**
 * Blog content.
 *
 * Posts are authored as structured blocks rather than markup so every article
 * produces the same clean semantic HTML, and so word count, reading time and
 * the table of contents can be derived rather than maintained by hand.
 */

const rawPosts = [
  {
    slug: 'generative-engine-optimization-checklist',
    title: 'A Practical GEO Checklist for Existing Content',
    excerpt:
      'Most sites do not need new pages to start appearing in AI answers — they need their existing pages to answer the question in the first paragraph. Here is the audit that finds the gap.',
    category: 'GEO',
    publishedAt: '2026-08-04',
    modifiedAt: '2026-08-04',
    body: [
      {
        type: 'lead',
        text: 'If you already publish decent content, your first GEO wins are almost always in what you have, not in what you have yet to write. This is the audit we run first.',
      },
      { type: 'h2', id: 'the-question-set', text: 'Start with a question set, not a keyword list' },
      {
        type: 'p',
        text: 'Write down the twenty questions you most want to be the answer to, in the phrasing a person would type into an assistant. Not "ai seo software" — "what software can automate SEO for a small marketing team?". Generative engines are interpreting a question, so audit against questions.',
      },
      {
        type: 'p',
        text: 'Keep the list stable. The value of a fixed question set is that it lets you compare across months, which is the only realistic way to measure GEO today.',
      },
      { type: 'h2', id: 'the-first-paragraph-test', text: 'Apply the first-paragraph test' },
      {
        type: 'p',
        text: 'For each question, open the page that should answer it and read only the first paragraph. If someone who read nothing else would leave with the correct answer, the page passes. Most do not — they open with context, a story, or a definition of a different thing.',
      },
      {
        type: 'checklist',
        items: [
          'Two to three sentences that resolve the question completely.',
          'The subject named explicitly, not referred to as "it" or "this".',
          'No dependency on the heading above it to make sense.',
          'A concrete claim rather than a promise that the answer is coming.',
        ],
      },
      { type: 'h2', id: 'structure-pass', text: 'Do a structure pass' },
      {
        type: 'p',
        text: 'Once the answer is in place, check that the rest of the page survives extraction. The test is the same: can any single section be read in isolation and still mean something?',
      },
      {
        type: 'ul',
        items: [
          'Headings that state a claim or ask a question, not labels like "Overview".',
          'Comparisons expressed as tables rather than paragraphs.',
          'Processes expressed as ordered lists with real step names.',
          'One idea per paragraph.',
          'An FAQ covering the follow-up questions the page provokes.',
        ],
      },
      { type: 'h2', id: 'entity-pass', text: 'Do an entity pass' },
      {
        type: 'p',
        text: 'Search your site for the three or four concepts that matter most to your business and read how each one is described on different pages. Inconsistency here is extremely common and unusually cheap to fix.',
      },
      {
        type: 'table',
        caption: 'Common entity problems and their fixes',
        head: ['Problem', 'Fix'],
        rows: [
          ['The same concept described differently on five pages', 'Pick one canonical description and use it'],
          ['A product named inconsistently', 'Standardise the name; introduce aliases explicitly'],
          ['No definitional page for a core concept', 'Write one, and link to it from every mention'],
          ['Undated claims that may be stale', 'Add a date, or remove the claim'],
        ],
      },
      { type: 'h2', id: 'technical-pass', text: 'Do a technical pass' },
      {
        type: 'ul',
        items: [
          'Confirm pages render server-side — view source, not inspector.',
          'Check robots.txt for rules that block AI crawlers you would rather allow.',
          'Validate structured data and remove anything inaccurate.',
          'Make sure canonicals point where you think they do.',
          'Publish an llms.txt summarising your important pages in plain text.',
        ],
      },
      {
        type: 'callout',
        title: 'What this will not do',
        text: 'None of this guarantees a citation. Engines change how they retrieve and synthesise, and citation sets are unstable. What the audit does is remove the reasons you would obviously be skipped.',
      },
      { type: 'h2', id: 'then-measure', text: 'Then measure — carefully' },
      {
        type: 'p',
        text: 'Run your fixed question set across the answer engines your audience uses, on a schedule, and record whether you appear and how you are described. Add referral traffic from assistants and branded search volume as supporting signals. Read the full method in [generative engine optimization](/generative-engine-optimization).',
      },
    ],
  },
  {
    slug: 'what-ai-overviews-changed',
    title: 'What AI Overviews Changed About SEO Strategy',
    excerpt:
      'Less than the panic suggested, and more than the dismissals allowed. A clear-eyed look at what shifted when generated answers moved above the results.',
    category: 'AI Search',
    publishedAt: '2026-07-18',
    modifiedAt: '2026-07-18',
    body: [
      {
        type: 'lead',
        text: 'When generated answers appeared above search results, two bad takes arrived with them: that SEO was finished, and that nothing had changed. Both are wrong in instructive ways.',
      },
      { type: 'h2', id: 'what-did-not-change', text: 'What did not change' },
      {
        type: 'p',
        text: 'Retrieval still happens first. An AI Overview is generated over documents the engine has already indexed and judged relevant. If your page is not crawlable, not relevant, or not trusted, it is not a candidate — the generated layer never sees it.',
      },
      {
        type: 'p',
        text: 'That means the entire technical and authority foundation of SEO remains load-bearing. Nothing about generated answers removes the need to be indexable, fast, well-linked and credible.',
      },
      { type: 'h2', id: 'what-did-change', text: 'What genuinely changed' },
      {
        type: 'steps',
        items: [
          {
            title: 'The unit of visibility moved from page to passage',
            text: 'Ranking used to be about the page. Being used in an answer is about a specific passage that resolves the question on its own.',
          },
          {
            title: 'Some visibility no longer produces a click',
            text: 'You can influence a decision without a session. That breaks click-based measurement and makes brand demand a more important signal.',
          },
          {
            title: 'Specificity became a competitive advantage',
            text: 'Generic content is paraphrased without attribution. Original data, named methods and clear positions give an engine a reason to cite you.',
          },
          {
            title: 'Consistency across your own site started to matter more',
            text: 'When a model reconciles several of your pages and finds contradictions, confidence drops. Internal agreement is now a ranking-adjacent concern.',
          },
        ],
      },
      { type: 'h2', id: 'strategy-implications', text: 'What to do differently' },
      {
        type: 'ol',
        items: [
          'Rewrite the opening of your highest-intent pages to answer the question directly.',
          'Convert your best comparisons into real tables.',
          'Add an FAQ block to pages that generate obvious follow-up questions.',
          'Audit your core concepts for consistent naming and description.',
          'Add a fixed prompt set to your reporting alongside rank tracking.',
        ],
      },
      {
        type: 'callout',
        title: 'The uncomfortable part',
        text: 'Some informational queries will produce fewer clicks regardless of what you do. The strategic response is to be present in the answer and to invest more heavily in the queries where people still need to reach a site to act.',
      },
      {
        type: 'p',
        text: 'For the surface-by-surface detail, see [AI search optimization](/ai-search-optimization).',
      },
    ],
  },
  {
    slug: 'topical-authority-with-clusters',
    title: 'Topical Authority Is Structure, Not Volume',
    excerpt:
      'Publishing forty posts about a topic does not create authority. A pillar, a deliberate cluster and honest internal links do — and the difference shows up in both search and AI answers.',
    category: 'Strategy',
    publishedAt: '2026-06-26',
    modifiedAt: '2026-06-26',
    body: [
      {
        type: 'lead',
        text: 'Topical authority gets described as if it were a quantity. It behaves much more like a shape.',
      },
      { type: 'h2', id: 'what-authority-means', text: 'What topical authority actually means' },
      {
        type: 'p',
        text: 'A search system trying to decide whether you are a credible source on a subject is looking for coverage that fits together: a clear central page about the topic, supporting pages about its constituent parts, and links between them that describe the relationship. Forty unconnected posts do not produce that shape. Twelve deliberate ones do.',
      },
      { type: 'h2', id: 'the-shape', text: 'The shape that works' },
      {
        type: 'diagram',
        steps: ['Pillar', 'Cluster pages', 'Supporting answers', 'Internal links'],
        caption: 'A cluster is a pillar page plus the pages that complete it, joined by descriptive links.',
      },
      {
        type: 'steps',
        items: [
          {
            title: 'One pillar per topic',
            text: 'A comprehensive page that defines the topic and links to everything beneath it. It should answer the broadest version of the question completely.',
          },
          {
            title: 'Cluster pages for each real sub-question',
            text: 'One page per question that a reader would genuinely search separately. Not one per keyword variant.',
          },
          {
            title: 'Links that describe the relationship',
            text: 'Anchor text that says what the target page is about. "Read more" teaches a crawler nothing.',
          },
          {
            title: 'A definitional home for each concept',
            text: 'When you use a term repeatedly, one page should define it, and the others should link to it.',
          },
        ],
      },
      { type: 'h2', id: 'why-it-helps-geo', text: 'Why the same structure helps in AI answers' },
      {
        type: 'p',
        text: 'Retrieval systems pull passages, but they also use the surrounding context to judge whether a passage is trustworthy. A page that sits inside a coherent cluster, with links that explain how it relates to the topic, gives a model much more to work with than an orphaned post.',
      },
      { type: 'h2', id: 'common-failure', text: 'The most common failure' },
      {
        type: 'p',
        text: 'Cannibalisation. Three pages targeting near-identical questions split their signals and confuse both ranking and retrieval. Before writing anything new, check whether an existing page should have been the one to answer it.',
      },
      {
        type: 'checklist',
        items: [
          'Every page maps to exactly one primary question.',
          'No two pages compete for the same question.',
          'Every cluster page links up to the pillar.',
          'The pillar links down to every cluster page.',
          'Anchor text describes the destination.',
        ],
      },
    ],
  },
  {
    slug: 'measuring-ai-search-visibility',
    title: 'How to Measure AI Search Visibility Honestly',
    excerpt:
      'There is no rank tracker for generated answers, and pretending otherwise produces confident nonsense. Here is a measurement routine that is honest about its limits and still useful.',
    category: 'Measurement',
    publishedAt: '2026-05-30',
    modifiedAt: '2026-05-30',
    body: [
      {
        type: 'lead',
        text: 'AI visibility measurement is directional. Any dashboard presenting it as a precise, stable number is describing something the underlying systems do not actually provide.',
      },
      { type: 'h2', id: 'why-it-is-hard', text: 'Why it is genuinely hard' },
      {
        type: 'ul',
        items: [
          'Answers vary between users, sessions and phrasings of the same question.',
          'Citation sets change as engines update retrieval and synthesis.',
          'Many AI referrals arrive with no referrer, or none at all.',
          'There is no public API that reports "how often were you cited".',
        ],
      },
      { type: 'h2', id: 'the-routine', text: 'A routine that works anyway' },
      {
        type: 'steps',
        items: [
          {
            title: 'Fix a prompt set',
            text: 'Twenty to fifty questions with stable wording that represent real research and buying intent in your market.',
          },
          {
            title: 'Check on a schedule',
            text: 'Monthly is enough for most teams. Record presence, position in the source list, and how you are described.',
          },
          {
            title: 'Log the description, not just the link',
            text: 'How an engine characterises you is itself a signal. If the description is wrong, that is a content problem you can fix.',
          },
          {
            title: 'Track assistant referrals as a floor',
            text: 'Segment traffic from known assistants. Treat it as the minimum, never the total.',
          },
          {
            title: 'Watch branded search',
            text: 'Growth in brand queries often reflects exposure that produced no click at all.',
          },
          {
            title: 'Audit coverage separately',
            text: 'For every prompt, confirm you actually have a page that answers it directly. Missing coverage is the most fixable cause of missing citations.',
          },
        ],
      },
      {
        type: 'callout',
        title: 'Report it honestly',
        text: 'Present AI visibility as a trend with a stated method and known limitations. A number with a confident decimal point will eventually be wrong in a meeting.',
      },
      {
        type: 'p',
        text: 'The measurement stage is one of the seven in the [GetGeoAgent loop](/how-it-works) — and the one that determines what the next cycle does.',
      },
    ],
  },
  {
    slug: 'what-to-automate-in-seo',
    title: 'What to Automate in SEO — and What Never to',
    excerpt:
      'The dividing line is not difficulty. It is whether the task rewards consistency or judgement.',
    category: 'Automation',
    publishedAt: '2026-05-02',
    modifiedAt: '2026-05-02',
    body: [
      {
        type: 'lead',
        text: 'Teams usually automate the wrong half of SEO: they generate content and hand-maintain the research. It should be the other way round.',
      },
      { type: 'h2', id: 'the-test', text: 'The test' },
      {
        type: 'p',
        text: 'Ask whether the task rewards doing the same thing reliably, or whether it rewards knowing something a system cannot. Consistency work is what automation is for. Judgement work is what your team is for.',
      },
      {
        type: 'table',
        caption: 'Where automation helps and where it does not',
        head: ['Task', 'Automate?', 'Why'],
        rows: [
          ['Query and question discovery', 'Yes', 'Rewards frequency and breadth, not insight'],
          ['Intent classification', 'Yes', 'Consistent rules applied at scale'],
          ['Page-to-query mapping', 'Yes', 'Mechanical, and reveals cannibalisation'],
          ['Outline and structure', 'Yes', 'Follows a known shape for a known intent'],
          ['Metadata and schema', 'Yes', 'Rules-based and easy to get wrong by hand'],
          ['Internal link suggestions', 'Yes', 'Requires seeing the whole site at once'],
          ['First draft', 'Partly', 'Useful starting point; needs editorial review'],
          ['Positioning and messaging', 'No', 'Depends on product truth and strategy'],
          ['Claims about your product', 'No', 'Accuracy is a business risk, not a style choice'],
          ['Final approval', 'No', 'Someone must be accountable for what ships'],
        ],
      },
      { type: 'h2', id: 'why-drafts-are-partly', text: 'Why drafting is only "partly"' },
      {
        type: 'p',
        text: 'A generated draft built from real intent analysis, with a proper outline and semantic coverage checks, is a genuinely good starting point. The same generator pointed at a keyword with no structure produces filler. The difference is not the model — it is everything upstream of it.',
      },
      { type: 'h2', id: 'the-payoff', text: 'The payoff' },
      {
        type: 'p',
        text: 'When the consistency layer runs on its own, the research never goes stale, the structure is never skipped, and the metadata is never rushed. What is left for people is the part that actually needs them. That is the workflow [GetGeoAgent](/seo-automation) is built around.',
      },
    ],
  },
];

const countWords = (blocks) =>
  blocks.reduce((total, block) => {
    const parts = [];
    if (block.text) parts.push(block.text);
    if (block.items) {
      block.items.forEach((item) =>
        parts.push(typeof item === 'string' ? item : `${item.title} ${item.text}`),
      );
    }
    if (block.rows) block.rows.forEach((row) => parts.push(row.join(' ')));
    if (block.steps) parts.push(block.steps.join(' '));
    return total + parts.join(' ').split(/\s+/).filter(Boolean).length;
  }, 0);

export const posts = rawPosts
  .map((post) => {
    const wordCount = countWords(post.body);
    return {
      ...post,
      author: site.name,
      wordCount,
      readingTime: Math.max(2, Math.round(wordCount / 220)),
    };
  })
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export const postBySlug = (slug) => posts.find((post) => post.slug === slug);

export const relatedPosts = (slug, limit = 3) =>
  posts.filter((post) => post.slug !== slug).slice(0, limit);

export const categories = [...new Set(posts.map((post) => post.category))];
