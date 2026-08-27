export const aiVisibilityTracking = {
  slug: '/ai-visibility-tracking',
  eyebrow: 'AI visibility',
  title: 'AI Search Visibility Tracking',
  lead: 'A fixed set of prompts, checked on a schedule across AI answer surfaces, so you can see whether your presence in generated answers is improving.',
  secondaryCta: { label: 'See GEO optimization', href: '/geo-optimization' },
  blocks: [
    {
      type: 'answer',
      label: 'What it does',
      text: 'GetGeoAgent maintains a stable set of prompts that represent real buying and research intent in your market, runs them against AI answer surfaces on a schedule, and records whether you appear, how you are described, and who appears instead of you.',
    },
    {
      type: 'callout',
      title: 'Directional, not exact — and we say so',
      text: 'There is no rank tracker for generated answers. Responses vary by user, session and phrasing, and citation sets change as engines update. Anything presenting AI visibility as a precise, stable number is describing something the underlying systems do not provide.',
    },
    { type: 'h2', id: 'why-measure', text: 'Why measure it at all' },
    {
      type: 'p',
      text: 'Because a growing share of research now ends in a generated answer, and being absent from those answers is invisible in every classic metric you have. Traffic looks flat, rankings look fine, and a competitor is being named as the answer to your category question. Directional measurement is far better than none.',
    },
    { type: 'h2', id: 'method', text: 'The method' },
    {
      type: 'steps',
      items: [
        { title: 'Fix a prompt set', text: 'Twenty to fifty questions in the phrasing people actually use with assistants. Stable wording is what makes results comparable across months.' },
        { title: 'Check on a schedule', text: 'The same prompts, run across the answer surfaces your audience uses, at a regular interval.' },
        { title: 'Record presence and position', text: 'Whether you are referenced, and where you appear in the source list when one is shown.' },
        { title: 'Record the description', text: 'How the engine characterises you. A wrong description is a content problem you can fix.' },
        { title: 'Record who else appears', text: 'Which competitors are being cited for the questions you want to own.' },
        { title: 'Audit coverage', text: 'For every prompt, whether you actually have a page that answers it directly. Missing coverage is the most fixable cause of missing citations.' },
      ],
    },
    { type: 'h2', id: 'outcomes', text: 'What a result looks like' },
    {
      type: 'table',
      caption: 'Outcome categories recorded for each prompt and surface',
      head: ['Outcome', 'What it means', 'What to do'],
      rows: [
        ['Cited', 'You are named as a source in the answer', 'Protect the page; keep it current'],
        ['Brand mention', 'You are referenced without a link', 'Strengthen the citable specifics on the page'],
        ['Competitor cited', 'Someone else answers your question', 'Compare coverage; close the gap'],
        ['Not mentioned', 'You do not appear at all', 'Check you have a page that answers it directly'],
      ],
    },
    { type: 'h2', id: 'supporting-signals', text: 'Supporting signals' },
    {
      type: 'ul',
      items: [
        '**Assistant referral traffic.** Real but incomplete — treat it as a floor, never a total, since much AI exposure produces no referrer.',
        '**Branded search volume.** Rising brand queries often reflect exposure that never produced a click.',
        '**Coverage completeness.** The share of your prompt set that has a page answering it directly.',
      ],
    },
    { type: 'h2', id: 'from-tracking-to-action', text: 'From tracking to action' },
    {
      type: 'p',
      text: 'A prompt where you do not appear becomes a coverage check: do you have a page that answers it in its opening paragraph? If not, it goes to the [content planner](/content-planner). If the page exists but buries the answer, it goes to the [content optimizer](/content-optimizer). That loop is the point — see [how it works](/how-it-works).',
    },
  ],
  faqs: [
    {
      question: 'Can you guarantee my site appears in AI answers?',
      answer:
        'No. Engines decide what they retrieve and cite, and their behaviour changes frequently. Tracking tells you where you stand and what to improve; it does not secure a citation.',
    },
    {
      question: 'Which surfaces are checked?',
      answer:
        'The AI answer surfaces your audience uses. The principles are the same across them — see [AI search optimization](/ai-search-optimization) for a surface-by-surface breakdown.',
    },
    {
      question: 'How often should the prompt set run?',
      answer:
        'Monthly is enough for most teams. Running daily mostly measures the natural variance in generated answers rather than any change you made.',
    },
    {
      question: 'Is the data in the product real customer data?',
      answer:
        'The examples shown on this website are illustrative product visualizations. Inside the application, results come from your own prompt set run against live answer surfaces.',
    },
  ],
};
