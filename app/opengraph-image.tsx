import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = '팔자왕 - 무료 사주 운세 서비스';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Stars decoration */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 60,
            fontSize: 80,
            display: 'flex',
          }}
        >
          ✨
        </div>
        <div
          style={{
            position: 'absolute',
            top: 100,
            right: 80,
            fontSize: 60,
            display: 'flex',
          }}
        >
          🌙
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: 100,
            fontSize: 50,
            display: 'flex',
          }}
        >
          ⭐
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 120,
            right: 120,
            fontSize: 70,
            display: 'flex',
          }}
        >
          🔮
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 120,
              marginBottom: 20,
              display: 'flex',
            }}
          >
            🏯
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 20,
              display: 'flex',
            }}
          >
            팔자왕
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#94a3b8',
              marginBottom: 30,
              display: 'flex',
            }}
          >
            무료 사주·운세·궁합 서비스
          </div>
          <div
            style={{
              display: 'flex',
              gap: 20,
              marginTop: 20,
            }}
          >
            <div
              style={{
                padding: '12px 24px',
                background: 'rgba(251, 191, 36, 0.2)',
                borderRadius: 50,
                color: '#fbbf24',
                fontSize: 24,
                display: 'flex',
              }}
            >
              오늘의 운세
            </div>
            <div
              style={{
                padding: '12px 24px',
                background: 'rgba(236, 72, 153, 0.2)',
                borderRadius: 50,
                color: '#ec4899',
                fontSize: 24,
                display: 'flex',
              }}
            >
              궁합
            </div>
            <div
              style={{
                padding: '12px 24px',
                background: 'rgba(139, 92, 246, 0.2)',
                borderRadius: 50,
                color: '#8b5cf6',
                fontSize: 24,
                display: 'flex',
              }}
            >
              꿈해몽
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
