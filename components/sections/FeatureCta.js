'use client';

import Button from '@/components/ui/Button';
import { track } from '@/lib/analytics';

/** Secondary CTA on a capability or solution page, reported as feature_cta. */
export default function FeatureCta({ href, slug, label }) {
  return (
    <Button
      href={href}
      variant="secondary"
      size="lg"
      magnetic={false}
      onClick={() => track('feature_cta', { from: slug, to: href })}
    >
      {label}
    </Button>
  );
}
