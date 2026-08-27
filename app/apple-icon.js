import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const runtime = 'nodejs';

/** Apple touch icon — the mark on the brand background. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#05070b',
        }}
      >
        <div
          style={{
            width: 118,
            height: 118,
            borderRadius: 999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '11px solid #3d7dfb',
            boxShadow: '0 0 60px #3d7dfb',
          }}
        >
          <div style={{ width: 38, height: 38, borderRadius: 999, background: '#dfefff' }} />
        </div>
      </div>
    ),
    size,
  );
}
