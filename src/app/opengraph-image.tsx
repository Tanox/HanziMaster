// src/app/opengraph-image.tsx v5.2.49
// 约定式动态 OG 图：仅用拉丁文案与几何田字格，避免 Satori 默认字体缺中文字形。
import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'HanziMaster — learn 12 foundational Chinese characters, one stroke at a time';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: 72,
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#101216',
        color: '#faf9f6',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 720 }}>
        <div style={{ fontSize: 26, letterSpacing: 8, color: '#e05c4b' }}>HANZIMASTER</div>
        <div
          style={{
            display: 'flex',
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.08,
            marginTop: 28,
          }}
        >
          Learn Chinese characters, one stroke at a time.
        </div>
        <div style={{ display: 'flex', fontSize: 27, color: '#a8a29e', marginTop: 36 }}>
          Stroke order · Tian-zi-ge writing · Pinyin quizzes
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: 300,
          height: 300,
          border: '3px solid #e05c4b',
          position: 'relative',
        }}
      >
        {[0, 1, 2, 3].map((cell) => (
          <div
            key={cell}
            style={{ display: 'flex', width: '50%', height: '50%', border: '1px solid #7c4a44' }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            top: '47%',
            left: '16%',
            width: '68%',
            height: 12,
            borderRadius: 6,
            background: '#faf9f6',
          }}
        />
      </div>
    </div>,
    size,
  );
}
