import Container from '@/components/ui/Container';
import PageHero from '@/components/sections/PageHero';
import ContactForm from '@/components/sections/ContactForm';
import RelatedLinks from '@/components/sections/RelatedLinks';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/metadata';
import { breadcrumbSchema, graph, organizationSchema, webPageSchema } from '@/lib/seo';
import { site } from '@/lib/site';

const description =
  'Contact the GetGeoAgent team about the product, pricing, partnerships or support.';

export const metadata = buildMetadata({
  title: 'Contact',
  description,
  path: '/contact',
  ogKicker: 'Contact',
  keywords: ['contact GetGeoAgent', 'GetGeoAgent support'],
});

const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Contact' }];

const routes = [
  {
    title: 'Product and pricing',
    body: 'Questions about what the agent does, how plans are scoped, or whether it fits your team.',
    email: site.contactEmail,
  },
  {
    title: 'Support',
    body: 'Already using GetGeoAgent and need help with your account or a running cycle.',
    email: site.supportEmail,
  },
  {
    title: 'Privacy',
    body: 'Data requests, processing questions or anything covered by the privacy policy.',
    email: site.privacyEmail,
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        id="contact-graph"
        data={graph([
          organizationSchema(),
          webPageSchema({ path: '/contact', title: 'Contact', description, breadcrumb: true }),
          breadcrumbSchema(breadcrumbs, '/contact'),
        ])}
      />

      <PageHero
        eyebrow="Contact"
        title="Talk to us"
        lead="Tell us what you are trying to grow and we will tell you honestly whether GetGeoAgent is the right fit."
        breadcrumbs={breadcrumbs}
      />

      <Container className="pb-20 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
          <ContactForm />

          <div>
            <h2 className="t-micro text-faint">Direct routes</h2>
            <dl className="mt-5 border-t border-white/8">
              {routes.map((route) => (
                <div key={route.title} className="border-b border-white/8 py-5">
                  <dt className="t-h4 text-ink">{route.title}</dt>
                  <dd className="t-body mt-2 text-[0.9rem]">{route.body}</dd>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${route.email}`}
                      className="link-underline text-sm text-[var(--scene-glow)]"
                    >
                      {route.email}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <p className="t-h4 text-ink">Already have an account?</p>
              <p className="t-body mt-2 text-[0.9rem]">
                Account and billing questions are fastest inside the application.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a href={site.app.login} rel="noopener" className="btn btn-secondary btn-sm">
                  Login
                </a>
                <a href={site.app.signup} rel="noopener" className="btn btn-primary btn-sm">
                  Create Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <RelatedLinks paths={['/features', '/pricing', '/about']} />
    </>
  );
}
