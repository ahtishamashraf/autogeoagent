import { site } from '@/lib/site';

/**
 * Terms of service content. Company-specific details come from the site
 * configuration placeholders and must be completed and legally reviewed
 * before this document is relied on.
 */
export const termsOfService = {
  title: 'Terms of Service',
  lead: `The agreement between you and ${site.name} covering use of this website and the GetGeoAgent application.`,
  updated: site.legal.lastUpdated,
  blocks: [
    {
      type: 'callout',
      title: 'Configuration required',
      text: `This agreement uses placeholders for ${site.legal.legalEntityName}, ${site.legal.registeredAddress} and ${site.legal.jurisdiction}. Replace them in the site configuration and have the document reviewed by qualified counsel before publication.`,
    },
    { type: 'h2', id: 'agreement', text: '1. Agreement to these terms' },
    {
      type: 'p',
      text: `These Terms of Service ("Terms") form an agreement between you and ${site.legal.legalEntityName} ("${site.name}", "we", "us") governing your access to and use of the ${site.domain} website and the GetGeoAgent application at ${site.app.url} (together, the "Service"). By creating an account or using the Service you accept these Terms. If you are agreeing on behalf of an organisation, you confirm you have authority to bind it.`,
    },
    { type: 'h2', id: 'service', text: '2. The Service' },
    {
      type: 'p',
      text: 'GetGeoAgent provides software for search engine optimization and generative engine optimization, including research, content generation, optimization recommendations, publishing preparation and performance monitoring. We may add, change or remove features over time. We will not make material reductions to core functionality of a paid plan during a paid term without notice.',
    },
    { type: 'h2', id: 'accounts', text: '3. Accounts' },
    {
      type: 'ul',
      items: [
        'You must provide accurate account information and keep it current.',
        'You are responsible for safeguarding credentials and for all activity under your account.',
        'You must notify us promptly of any unauthorised use.',
        'Accounts are for the individual or organisation that registered them and may not be shared beyond your permitted users.',
        'You must be legally capable of entering into a binding contract.',
      ],
    },
    { type: 'h2', id: 'subscriptions', text: '4. Subscriptions and plans' },
    {
      type: 'p',
      text: 'Paid features are provided on a subscription basis. Plan scope, limits and current prices are presented in the application at the time of purchase. Subscriptions renew automatically for successive terms unless cancelled before the end of the current term. We may change prices for future terms with reasonable notice.',
    },
    { type: 'h2', id: 'payments', text: '5. Payments' },
    {
      type: 'p',
      text: 'Fees are charged in advance through our payment processor and are exclusive of taxes unless stated otherwise. You authorise us to charge your payment method for all fees incurred. If a payment fails we may suspend access until it is resolved. Except where required by law, fees are non-refundable, and cancelling stops future renewals rather than refunding the current term.',
    },
    { type: 'h2', id: 'acceptable-use', text: '6. Acceptable use' },
    {
      type: 'p',
      text: 'You agree not to use the Service to:',
    },
    {
      type: 'ul',
      items: [
        'Break the law, infringe intellectual property rights, or violate anyone’s privacy.',
        'Generate or publish content that is deceptive, defamatory, harassing, or unlawful.',
        'Produce spam, deliberately manipulative content, or material designed to deceive search or answer engines rather than inform readers.',
        'Reverse engineer, scrape, resell or attempt to extract the underlying models or source code of the Service.',
        'Circumvent usage limits, security controls or authentication.',
        'Interfere with the operation or integrity of the Service or its infrastructure.',
        'Submit content you do not have the right to submit, or connect websites you are not authorised to manage.',
      ],
    },
    { type: 'h2', id: 'customer-content', text: '7. Your content' },
    {
      type: 'p',
      text: 'You retain all rights in the content, data and materials you submit or connect to the Service ("Customer Content"). You grant us a limited, non-exclusive licence to host, process and transmit Customer Content solely to provide and support the Service, including transmitting it to our processors where required. You are responsible for having the rights necessary to grant that licence.',
    },
    { type: 'h2', id: 'generated-content', text: '8. Generated content' },
    {
      type: 'p',
      text: 'Subject to your compliance with these Terms and payment of applicable fees, you own the content the Service generates for you. Because generative models can produce similar output for different users, we do not warrant that generated content is unique. Generated content may contain errors or inaccurate statements, and you are responsible for reviewing, editing and verifying anything you publish. You must not present generated content in a way that is misleading about its nature where disclosure is legally required.',
    },
    { type: 'h2', id: 'connected-sites', text: '9. Connected websites and third-party services' },
    {
      type: 'p',
      text: 'The Service may connect to websites, content systems and third-party services you authorise. You are responsible for those authorisations and for the effects of changes published to your properties. Third-party services are governed by their own terms, and we are not responsible for their availability, accuracy or actions.',
    },
    { type: 'h2', id: 'no-guarantee', text: '10. No guarantee of results' },
    {
      type: 'p',
      text: 'Search engines and AI answer systems independently determine what they rank, retrieve and cite, and their behaviour changes without notice. We do not guarantee rankings, traffic, impressions, citations, inclusion in AI-generated answers, or any specific commercial outcome. The Service is designed to improve visibility signals; results depend on your website, market and competition.',
    },
    { type: 'h2', id: 'ip', text: '11. Our intellectual property' },
    {
      type: 'p',
      text: 'We and our licensors own the Service, including its software, models, interfaces, documentation and branding. These Terms grant you a limited, non-exclusive, non-transferable right to use the Service during your subscription. No other rights are granted.',
    },
    { type: 'h2', id: 'suspension', text: '12. Suspension and termination' },
    {
      type: 'p',
      text: 'You may cancel at any time in your account settings. We may suspend or terminate access if you materially breach these Terms, if required by law, or to protect the Service or other users — with notice where practicable. On termination your right to use the Service ends. We will make Customer Content available for export for a limited period, after which it may be deleted.',
    },
    { type: 'h2', id: 'warranties', text: '13. Disclaimers' },
    {
      type: 'p',
      text: 'The Service is provided "as is" and "as available". To the fullest extent permitted by law we disclaim all warranties, whether express, implied or statutory, including merchantability, fitness for a particular purpose, non-infringement, and any warranty that the Service will be uninterrupted, error-free or produce particular results. Nothing in these Terms excludes liability that cannot lawfully be excluded.',
    },
    { type: 'h2', id: 'liability', text: '14. Limitation of liability' },
    {
      type: 'p',
      text: 'To the fullest extent permitted by law, neither party is liable for indirect, incidental, special, consequential or punitive damages, or for loss of profits, revenue, goodwill or data. Our total aggregate liability arising out of or relating to the Service is limited to the fees you paid us in the twelve months before the event giving rise to the claim.',
    },
    { type: 'h2', id: 'indemnity', text: '15. Indemnity' },
    {
      type: 'p',
      text: 'You will indemnify and hold us harmless from claims, damages and reasonable costs arising from your Customer Content, your use of the Service in breach of these Terms, or your violation of law or third-party rights.',
    },
    { type: 'h2', id: 'changes', text: '16. Changes to these Terms' },
    {
      type: 'p',
      text: 'We may update these Terms as the Service or the law changes. We will provide notice of material changes through the application or by email. Continuing to use the Service after changes take effect means you accept the updated Terms.',
    },
    { type: 'h2', id: 'law', text: '17. Governing law and disputes' },
    {
      type: 'p',
      text: `These Terms are governed by the laws of ${site.legal.jurisdiction}, without regard to conflict of law rules. The courts of ${site.legal.jurisdiction} have exclusive jurisdiction, except that either party may seek injunctive relief where necessary to protect its intellectual property. Nothing here removes consumer rights that apply in your country of residence.`,
    },
    { type: 'h2', id: 'general', text: '18. General' },
    {
      type: 'p',
      text: 'These Terms, together with the [Privacy Policy](/privacy-policy), are the entire agreement between us regarding the Service. If any provision is found unenforceable, the rest remains in effect. Failure to enforce a provision is not a waiver. You may not assign these Terms without our consent; we may assign them in connection with a merger, acquisition or sale of assets.',
    },
    { type: 'h2', id: 'contact', text: '19. Contact' },
    {
      type: 'p',
      text: `Questions about these Terms: [${site.contactEmail}](mailto:${site.contactEmail}), or use the [contact page](/contact).`,
    },
  ],
};
