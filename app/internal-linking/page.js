import FeaturePage from '@/components/sections/FeaturePage';
import InternalLinkVisual from '@/components/visuals/InternalLinkVisual';
import { internalLinking } from '@/content/product/internal-linking';
import { buildMetadata } from '@/lib/metadata';

const description =
  'The agent reads your whole site at once, finds pages that genuinely relate, proposes contextual links with descriptive anchors and surfaces orphan pages.';

export const metadata = buildMetadata({
  title: 'Automated Internal Linking',
  description,
  path: '/internal-linking',
  ogKicker: 'InternalLinking',
  keywords: ['automated internal linking', 'internal link building', 'internal linking tool', 'orphan pages', 'topical authority'],
});

export default function Page() {
  return (
    <FeaturePage
      doc={internalLinking}
      description={description}
      related={['/content-planner', '/technical-seo', '/seo-audit']}
      visual={
        <InternalLinkVisual />
      }
    />
  );
}
