import LegalPage from '@/components/sections/LegalPage';
import { privacyPolicy } from '@/content/legal/privacy';
import { buildMetadata } from '@/lib/metadata';

const description =
  'How GetGeoAgent collects, uses, shares and protects personal data across the website and the application, and the rights you have over your data.';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description,
  path: '/privacy-policy',
  ogKicker: 'Legal',
});

export default function Page() {
  return <LegalPage doc={privacyPolicy} path="/privacy-policy" description={description} />;
}
