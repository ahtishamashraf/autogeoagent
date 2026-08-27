import LegalPage from '@/components/sections/LegalPage';
import { termsOfService } from '@/content/legal/terms';
import { buildMetadata } from '@/lib/metadata';

const description =
  'The terms governing use of the GetGeoAgent website and application: accounts, subscriptions, acceptable use, content ownership, disclaimers and liability.';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description,
  path: '/terms-of-service',
  ogKicker: 'Legal',
});

export default function Page() {
  return <LegalPage doc={termsOfService} path="/terms-of-service" description={description} />;
}
