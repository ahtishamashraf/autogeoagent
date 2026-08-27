import { site } from '@/lib/site';

/**
 * Privacy policy content.
 *
 * Company-specific details come from lib/site.js placeholders. This document
 * describes standard SaaS data handling and must be reviewed by qualified
 * counsel — and the placeholders replaced — before it is relied on.
 */
export const privacyPolicy = {
  title: 'Privacy Policy',
  lead: `How ${site.name} collects, uses and protects personal data across this website and the GetGeoAgent application.`,
  updated: site.legal.lastUpdated,
  blocks: [
    {
      type: 'callout',
      title: 'Configuration required',
      text: `This policy uses placeholders for ${site.legal.legalEntityName}, ${site.legal.registeredAddress} and ${site.legal.jurisdiction}. Replace them in the site configuration and have the document reviewed by qualified counsel before publication.`,
    },
    { type: 'h2', id: 'who-we-are', text: '1. Who we are' },
    {
      type: 'p',
      text: `${site.name} ("we", "us") provides an AI-powered SEO and Generative Engine Optimization platform. The data controller is ${site.legal.legalEntityName}, registered at ${site.legal.registeredAddress}. You can reach us at [${site.privacyEmail}](mailto:${site.privacyEmail}).`,
    },
    { type: 'h2', id: 'scope', text: '2. Scope of this policy' },
    {
      type: 'p',
      text: `This policy covers the ${site.domain} website and the GetGeoAgent application at ${site.app.url}. It does not cover third-party websites we link to, which have their own policies.`,
    },
    { type: 'h2', id: 'what-we-collect', text: '3. Information we collect' },
    {
      type: 'table',
      caption: 'Categories of personal data we process',
      head: ['Category', 'Examples', 'Source'],
      rows: [
        ['Account data', 'Name, email address, password hash, organisation name', 'Provided by you'],
        ['Billing data', 'Plan, billing contact, transaction records', 'You and our payment processor'],
        ['Website data', 'Domains you connect and content retrieved from them', 'Provided or authorised by you'],
        ['Usage data', 'Feature usage, actions taken in the application, timestamps', 'Collected automatically'],
        ['Technical data', 'IP address, browser and device type, log data', 'Collected automatically'],
        ['Support data', 'Messages you send us and their contents', 'Provided by you'],
      ],
    },
    {
      type: 'p',
      text: 'We do not intentionally collect special categories of personal data, and we ask that you do not submit them through the service.',
    },
    { type: 'h2', id: 'how-we-use', text: '4. How we use personal data' },
    {
      type: 'ul',
      items: [
        'Providing the service, including running research, content and optimization cycles you request.',
        'Authenticating users and securing accounts.',
        'Processing payments and managing subscriptions.',
        'Providing support and responding to enquiries.',
        'Monitoring performance, diagnosing faults and improving the product.',
        'Detecting, preventing and investigating abuse or security incidents.',
        'Sending service communications, and marketing communications where you have opted in or where permitted by law.',
        'Meeting legal, accounting and regulatory obligations.',
      ],
    },
    { type: 'h2', id: 'legal-bases', text: '5. Legal bases for processing' },
    {
      type: 'p',
      text: 'Where data protection law such as the UK GDPR or EU GDPR applies, we rely on: performance of a contract (providing the service you signed up for); legitimate interests (securing and improving the service, and direct marketing to business contacts); consent (optional cookies and marketing where required); and legal obligation (tax, accounting and lawful requests).',
    },
    { type: 'h2', id: 'ai-processing', text: '6. AI processing' },
    {
      type: 'p',
      text: 'The service uses machine learning models to analyse search data and generate content. Content you submit, and content retrieved from websites you connect, may be processed by us and by third-party model providers acting as our processors in order to deliver the features you use. We do not sell your data, and we do not use your private customer content to train publicly available foundation models.',
    },
    { type: 'h2', id: 'cookies', text: '7. Cookies and similar technologies' },
    {
      type: 'p',
      text: 'We use strictly necessary cookies to operate the website and application, including keeping you signed in. Where we use analytics or preference cookies that are not strictly necessary, we request consent where required by law. You can control cookies in your browser settings, though disabling necessary cookies will break parts of the service.',
    },
    { type: 'h2', id: 'sharing', text: '8. Sharing personal data' },
    {
      type: 'p',
      text: 'We share personal data with service providers who process it on our behalf under contract — for example cloud hosting, AI model providers, payment processing, error monitoring, analytics and customer support tooling. We may also disclose data where required by law, to enforce our terms, or in connection with a merger, acquisition or sale of assets, in which case we will notify affected users.',
    },
    { type: 'h2', id: 'transfers', text: '9. International transfers' },
    {
      type: 'p',
      text: 'Our providers may process data outside your country. Where we transfer personal data internationally we use appropriate safeguards, such as standard contractual clauses or an adequacy decision, as required by applicable law.',
    },
    { type: 'h2', id: 'retention', text: '10. Retention' },
    {
      type: 'p',
      text: 'We keep personal data only as long as necessary for the purposes described here. Account and content data is retained while your account is active and for a limited period afterwards to allow recovery and to meet legal obligations. Billing records are retained for the period required by tax and accounting law. Logs are retained on a short rolling basis.',
    },
    { type: 'h2', id: 'your-rights', text: '11. Your rights' },
    {
      type: 'ul',
      items: [
        'Access — request a copy of the personal data we hold about you.',
        'Rectification — ask us to correct inaccurate or incomplete data.',
        'Erasure — ask us to delete personal data, subject to legal exceptions.',
        'Restriction — ask us to limit how we process your data in certain circumstances.',
        'Portability — receive certain data in a structured, machine-readable format.',
        'Objection — object to processing based on legitimate interests, including direct marketing.',
        'Withdraw consent — where processing is based on consent, at any time.',
        'Complain — to your local supervisory authority.',
      ],
    },
    {
      type: 'p',
      text: `To exercise any of these rights, contact [${site.privacyEmail}](mailto:${site.privacyEmail}). We may need to verify your identity before acting on a request.`,
    },
    { type: 'h2', id: 'security', text: '12. Security' },
    {
      type: 'p',
      text: 'We use technical and organisational measures appropriate to the risk, including encryption in transit, access controls, least-privilege permissions and logging. No system is perfectly secure, and we cannot guarantee absolute security. If a breach affects your personal data we will notify you and the relevant authorities where required.',
    },
    { type: 'h2', id: 'children', text: '13. Children' },
    {
      type: 'p',
      text: 'The service is intended for business use and is not directed at children. We do not knowingly collect personal data from children. If you believe a child has provided us data, contact us and we will delete it.',
    },
    { type: 'h2', id: 'changes', text: '14. Changes to this policy' },
    {
      type: 'p',
      text: 'We may update this policy as the service or the law changes. Material changes will be communicated through the application or by email, and the date below will always reflect the current version.',
    },
    { type: 'h2', id: 'contact', text: '15. Contact' },
    {
      type: 'p',
      text: `Privacy enquiries: [${site.privacyEmail}](mailto:${site.privacyEmail}). General enquiries: [${site.contactEmail}](mailto:${site.contactEmail}), or use the [contact page](/contact).`,
    },
  ],
};
