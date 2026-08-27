import Script from 'next/script';
import { isProductionDeployment } from '@/lib/deployment';

/**
 * GA4 loader.
 *
 * Renders nothing unless NEXT_PUBLIC_GA_ID is set and this is the production
 * deployment, so preview deployments never pollute reporting and no
 * placeholder measurement ID is ever shipped.
 */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !isProductionDeployment) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
