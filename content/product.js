/** Long-form copy for the product pages. */

export const seoAutomation = {
  slug: '/seo-automation',
  eyebrow: 'SEO Automation',
  title: 'SEO Automation That Actually Runs',
  lead: 'Automate the repeatable layer of SEO — research, intent, structure, metadata, internal links and monitoring — so your team spends its time on judgement instead of maintenance.',
  blocks: [
    {
      type: 'answer',
      label: 'What gets automated',
      text: 'SEO automation means handing the repeatable parts of a search programme to software: discovering queries, classifying intent, mapping pages to topics, drafting structured content, generating metadata and schema, proposing internal links, running pre-publish checks and tracking what moved. Strategy and editorial judgement stay with people.',
    },
    { type: 'h2', id: 'why-automate', text: 'Why the repeatable layer is worth automating' },
    {
      type: 'p',
      text: 'Most SEO programmes do not fail because nobody knows what to do. They fail because the work is repetitive, spread across tools, and quietly ages. A keyword export from March is stale by June. A content brief written by hand takes an afternoon. Internal links get added when someone remembers. Metadata is filled in at the last minute.',
    },
    {
      type: 'p',
      text: 'None of that requires human creativity — it requires consistency. That is exactly what an agent is good at, and exactly what teams run out of time for.',
    },
    { type: 'h2', id: 'what-it-does', text: 'What GetGeoAgent automates' },
    {
      type: 'steps',
      items: [
        {
          title: 'Keyword and query research',
          text: 'Continuous discovery across your topic space, including the question phrasings people use in AI assistants, grouped into clusters rather than dumped into a list.',
        },
        {
          title: 'Search intent classification',
          text: 'Every query is labelled by what the searcher expects, so the right page type gets built instead of one generic article per keyword.',
        },
        {
          title: 'Page-to-query mapping',
          text: 'Existing pages are matched to the queries they should own, which exposes cannibalisation and genuine gaps.',
        },
        {
          title: 'Content structure and drafting',
          text: 'Briefs and drafts built from intent: a direct answer, the supporting sections, comparisons where they help, and the follow-up questions readers ask.',
        },
        {
          title: 'Metadata and structured data',
          text: 'Titles, descriptions, heading hierarchy and JSON-LD generated with the draft rather than bolted on afterwards.',
        },
        {
          title: 'Internal linking',
          text: 'Link suggestions with real anchor text between related pages, so clusters reinforce each other.',
        },
        {
          title: 'Technical and on-page checks',
          text: 'Pre-publish review of the on-page factors that are easy to get wrong and expensive to fix later.',
        },
        {
          title: 'Monitoring and refresh',
          text: 'Rankings, impressions and clicks tracked per page and per topic, with decaying pages flagged for refresh.',
        },
      ],
    },
    { type: 'h2', id: 'what-stays-human', text: 'What stays human' },
    {
      type: 'p',
      text: 'Automation is only credible if it is honest about its limits. GetGeoAgent does not decide your positioning, know your product roadmap, or have opinions about your brand voice. It produces a strong, structured starting point; the editorial pass belongs to you.',
    },
    {
      type: 'ul',
      items: [
        'Positioning and messaging decisions.',
        'Product truth — what is actually shipping and what is not.',
        'Voice, tone and the judgement call on what is worth saying.',
        'Final approval before anything is published.',
      ],
    },
    { type: 'h2', id: 'vs-tools', text: 'How this differs from a traditional SEO tool' },
    {
      type: 'table',
      caption: 'Traditional SEO tooling compared with an agent workflow',
      head: ['Traditional SEO tool', 'GetGeoAgent'],
      rows: [
        ['Exports data you interpret', 'Produces a plan and acts on it'],
        ['Research happens when you run it', 'Research runs continuously'],
        ['Briefs written manually', 'Briefs and drafts generated from intent'],
        ['Metadata added at publish time', 'Metadata and schema generated with the draft'],
        ['Internal links added ad hoc', 'Links proposed across the whole cluster'],
        ['Reporting shows what happened', 'Findings feed back into the next cycle'],
      ],
    },
    {
      type: 'callout',
      title: 'SEO and GEO in one workflow',
      text: 'Because the agent already maintains the topic model and the content structure, extending it to generative search is a change of emphasis rather than a second programme. See [GEO optimization](/geo-optimization).',
    },
  ],
  faqs: [
    {
      question: 'Does SEO automation replace an SEO team?',
      answer:
        'No. It removes the repetitive layer — research, structure, metadata, link suggestions, monitoring — so the people on your team can spend their time on strategy, positioning and editorial quality.',
    },
    {
      question: 'Will automated content hurt my rankings?',
      answer:
        'Thin, duplicated content hurts rankings regardless of how it was produced. GetGeoAgent is built around intent, semantic coverage and structure, and the workflow assumes human review before publishing.',
    },
    {
      question: 'Can it work with my existing content?',
      answer:
        'Yes. Mapping existing pages to the queries they should own is part of the research stage, and decaying pages are flagged for refresh rather than replaced with new ones.',
    },
    {
      question: 'How often does the agent run?',
      answer:
        'Continuously, on a cycle. Research, optimization and refresh detection re-run rather than waiting for someone to start a new campaign.',
    },
  ],
};

export const geoOptimization = {
  slug: '/geo-optimization',
  eyebrow: 'GEO Optimization',
  title: 'GEO Optimization Software',
  lead: 'Generative Engine Optimization, built into the same workflow as your SEO: entity clarity, answer-ready structure, structured data and citation signals — measured over time.',
  blocks: [
    {
      type: 'answer',
      label: 'What GEO software does',
      text: 'GEO software helps make your content legible to AI answer systems: it identifies the questions people ask, checks whether your pages answer them directly, structures content so passages can be extracted cleanly, generates the machine-readable context engines rely on, and tracks whether your visibility on those surfaces is improving.',
    },
    { type: 'h2', id: 'the-problem', text: 'The problem GEO solves' },
    {
      type: 'p',
      text: 'A growing share of search sessions end in a generated answer. If your page is not retrieved, or is retrieved but paraphrased without attribution, you are invisible in that session — even if you rank well in the conventional results underneath. Read [what is GEO](/what-is-geo) for the underlying discipline.',
    },
    { type: 'h2', id: 'capabilities', text: 'What the agent does for GEO' },
    {
      type: 'steps',
      items: [
        {
          title: 'Question discovery',
          text: 'Builds and maintains a set of the questions your market asks, in the phrasing people actually use with assistants — not just head keywords.',
        },
        {
          title: 'Coverage analysis',
          text: 'Checks whether you have a page that answers each question directly, and flags the ones that bury the answer or do not exist.',
        },
        {
          title: 'Entity clarity',
          text: 'Keeps naming consistent across the site and ensures important concepts have a definitional home rather than being described differently on every page.',
        },
        {
          title: 'Answer-ready structure',
          text: 'Drafts open with a self-contained answer, then use headings, lists and tables so passages survive extraction.',
        },
        {
          title: 'Structured data',
          text: 'Generates accurate JSON-LD alongside the content — Article, FAQPage, BreadcrumbList and organisation context.',
        },
        {
          title: 'Source and authority signals',
          text: 'Encourages specificity, dated claims and internal consistency, which are what make a passage worth attributing.',
        },
        {
          title: 'AI crawlability',
          text: 'Surfaces technical issues that keep AI systems from reading your pages, including client-side rendering and robots rules.',
        },
        {
          title: 'Visibility monitoring',
          text: 'Tracks a stable prompt set over time so you can see directional movement instead of guessing.',
        },
      ],
    },
    { type: 'h2', id: 'what-we-dont-claim', text: 'What GEO software cannot do' },
    {
      type: 'p',
      text: 'It is worth being explicit. No software controls which sources an answer engine cites. Citation sets are unstable, vary by user and phrasing, and change as engines update. GEO improves the probability that your content is retrieved, understood and attributed — it does not guarantee any of those things.',
    },
    {
      type: 'callout',
      title: 'GEO works because SEO works',
      text: 'Generative engines retrieve from the indexed web. A page that is not crawlable, relevant or trusted never reaches the point where GEO matters — which is why GetGeoAgent runs both in one workflow. See [SEO automation](/seo-automation).',
    },
  ],
  faqs: [
    {
      question: 'What is GEO optimization?',
      answer:
        'GEO optimization is the work of improving content so AI-powered answer systems can understand, evaluate and cite it — through direct answers, clear entities, extractable structure and accurate machine-readable context.',
    },
    {
      question: 'Can you guarantee my site appears in AI answers?',
      answer:
        'No. Engines decide what to retrieve and cite, and their behaviour changes frequently. GetGeoAgent is designed to improve the signals that make visibility more likely.',
    },
    {
      question: 'Which AI engines does this apply to?',
      answer:
        'The same principles apply across AI Overviews, AI Mode, ChatGPT Search, Gemini, Perplexity and Copilot. See [AI search optimization](/ai-search-optimization) for surface-by-surface detail.',
    },
    {
      question: 'Do I need GEO if my SEO is already working?',
      answer:
        'If a meaningful share of your audience is asking questions in AI assistants, yes. Ranking well does not automatically mean being used in a generated answer, though it makes it considerably more likely.',
    },
  ],
};

export const aiSeoAgent = {
  slug: '/ai-seo-agent',
  eyebrow: 'AI SEO Agent',
  title: 'An AI SEO Agent, Not Another SEO Tool',
  lead: 'A tool waits to be used. An agent runs a workflow, keeps state between cycles, and acts on what it learns. That difference is the whole product.',
  blocks: [
    {
      type: 'answer',
      label: 'Definition',
      text: 'An AI SEO agent is software that runs an end-to-end search workflow on its own schedule — researching opportunities, deciding what to build, producing structured content, preparing it for publishing, measuring the outcome and adjusting the plan — rather than presenting data for a person to interpret and act on.',
    },
    { type: 'h2', id: 'tool-vs-agent', text: 'Tool versus agent' },
    {
      type: 'table',
      caption: 'How an SEO tool and an SEO agent differ in practice',
      head: ['Dimension', 'SEO tool', 'AI SEO agent'],
      rows: [
        ['Trigger', 'You open it and run a report', 'Runs on a continuous cycle'],
        ['Output', 'Data and exports', 'A plan, drafts and prepared pages'],
        ['Memory', 'Each report starts fresh', 'Keeps the topic model and history between cycles'],
        ['Scope', 'One task per tool', 'One workflow across research, content, publishing and measurement'],
        ['Feedback', 'You interpret the numbers', 'Performance feeds the next cycle automatically'],
        ['Failure mode', 'Reports nobody reads', 'Work that needs review, not work that needs starting'],
      ],
    },
    { type: 'h2', id: 'how-it-thinks', text: 'How the agent works' },
    {
      type: 'p',
      text: 'The agent maintains three things between cycles: a model of your topic space, a picture of your site and what each page is for, and a record of what happened to everything it produced. Each cycle reads all three, decides what would most improve visibility, and does that work.',
    },
    {
      type: 'diagram',
      steps: ['Research', 'Strategy', 'Create', 'Publish', 'Measure', 'Improve'],
      caption: 'The loop the agent runs continuously.',
    },
    {
      type: 'p',
      text: 'Because the state persists, the second cycle is better than the first: it knows which clusters moved, which pages under-performed, and which questions appeared in the market that were not there before.',
    },
    { type: 'h2', id: 'oversight', text: 'Autonomy with oversight' },
    {
      type: 'p',
      text: 'Autonomy is useful up to the point where judgement is required. The agent proposes and prepares; you approve. Nothing reaches your site without passing the pre-publish pipeline and your review.',
    },
    {
      type: 'checklist',
      items: [
        'Every draft is reviewable before it is approved.',
        'Recommendations state what they are based on.',
        'Pre-publish checks run on every page: on-page, metadata, schema, internal links.',
        'Performance is reported honestly, including what did not work.',
      ],
    },
  ],
  faqs: [
    {
      question: 'What is an AI SEO agent?',
      answer:
        'Software that runs a complete SEO workflow autonomously — research, strategy, content creation, publishing preparation, monitoring and optimization — while keeping state between cycles so each run builds on the last.',
    },
    {
      question: 'How is it different from an AI writing tool?',
      answer:
        'A writing tool produces text when prompted. An agent decides what should be written and why, based on a maintained topic model and measured performance, then structures it for search and generative engines.',
    },
    {
      question: 'Does the agent publish without approval?',
      answer:
        'The workflow is built around review. Content moves through the pre-publish pipeline and waits for approval before it goes live.',
    },
    {
      question: 'Does it work for GEO as well as SEO?',
      answer:
        'Yes — they run as one workflow. See [SEO automation](/seo-automation) and [GEO optimization](/geo-optimization).',
    },
  ],
};

export const about = {
  eyebrow: 'About',
  title: 'Search changed. Most SEO workflows did not.',
  lead: 'GetGeoAgent exists because the work that builds search visibility is repetitive, continuous and badly served by tools that only produce reports.',
  blocks: [
    { type: 'h2', id: 'why', text: 'Why we built it' },
    {
      type: 'p',
      text: 'Search used to have one surface. Now a query can end in a list of links, an AI-generated summary with citations, or a conversation that never shows a result page at all. The fundamentals did not disappear — but the work required to stay visible got wider, and it got continuous.',
    },
    {
      type: 'p',
      text: 'Most teams responded by adding tools. More dashboards, more exports, more places where a recommendation sits until someone has an afternoon free. The bottleneck was never information. It was execution.',
    },
    {
      type: 'p',
      text: 'GetGeoAgent is built the other way around: one agent that runs the whole loop, keeps its own state, and produces work rather than reports.',
    },
    { type: 'h2', id: 'principles', text: 'What we believe' },
    {
      type: 'steps',
      items: [
        {
          title: 'Intent before volume',
          text: 'A query is only worth targeting when you can genuinely answer it better than what already ranks. Publishing more is not a strategy.',
        },
        {
          title: 'Structure is a feature',
          text: 'Clear entities, ordered headings and accurate schema are what let both crawlers and generative engines use your content confidently.',
        },
        {
          title: 'Editorial judgement stays human',
          text: 'The agent removes the repetitive layer. Positioning, product truth and voice remain yours.',
        },
        {
          title: 'Honest measurement',
          text: 'GEO measurement is directional, not exact. We would rather say that than invent precision that does not exist.',
        },
        {
          title: 'No guarantees',
          text: 'Nobody controls what search engines rank or what answer engines cite. We build for probability, and we say so.',
        },
      ],
    },
    { type: 'h2', id: 'product', text: 'What the product is today' },
    {
      type: 'p',
      text: 'GetGeoAgent runs a seven-stage loop across SEO and GEO: research, strategy, creation, publishing preparation, monitoring, improvement, and back to research. You can read the full workflow in [how it works](/how-it-works), or start with the [platform features](/features).',
    },
    {
      type: 'callout',
      title: 'Talk to us',
      text: 'Questions about the product, a partnership, or whether this fits your team? [Get in touch](/contact).',
    },
  ],
};
