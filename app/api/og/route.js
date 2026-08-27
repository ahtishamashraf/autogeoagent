import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

const clip = (value, max) => (value && value.length > max ? `${value.slice(0, max - 1)}…` : value);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = clip(searchParams.get('title') || 'Your AI Agent for SEO & GEO', 78);
  const kicker = clip(searchParams.get('kicker') || 'AI SEO + GEO Agent', 42);
  const accent = searchParams.get('accent') || '#3d7dfb';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#05070b',
          backgroundImage: `radial-gradient(900px 520px at 78% 8%, ${accent}44, transparent 62%), radial-gradient(700px 480px at 8% 100%, #7c5cff33, transparent 60%)`,
          color: '#eef3fb',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `3px solid ${accent}`,
              boxShadow: `0 0 40px ${accent}`,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: '#ffffff',
              }}
            />
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>GetGeoAgent</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#8593a9',
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              fontSize: title.length > 46 ? 66 : 82,
              lineHeight: 1.04,
              letterSpacing: '-0.04em',
              fontWeight: 600,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#8593a9',
            borderTop: '1px solid rgba(148,176,220,0.2)',
            paddingTop: 26,
          }}
        >
          <div>{site.domain}</div>
          <div style={{ color: accent }}>{site.secondaryTagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
