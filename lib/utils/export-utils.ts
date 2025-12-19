'use client';

// HTML 다운로드 유틸리티 - 화면과 동일한 스타일
export function downloadAsHtml(content: string, filename: string) {
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0f172a;
      color: #f1f5f9;
      min-height: 100vh;
      padding: 40px 20px;
      position: relative;
    }

    /* 별빛 배경 효과 */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 0;
      background:
        radial-gradient(ellipse at top, rgba(109, 40, 217, 0.15), transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(192, 132, 252, 0.1), transparent 50%),
        radial-gradient(ellipse at bottom left, rgba(251, 191, 36, 0.05), transparent 50%);
      pointer-events: none;
    }

    /* 별 효과 */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 0;
      background-image:
        radial-gradient(1px 1px at 20px 30px, rgba(251, 191, 36, 0.4), transparent),
        radial-gradient(1px 1px at 60px 70px, rgba(192, 132, 252, 0.3), transparent),
        radial-gradient(1px 1px at 50px 120px, white, transparent),
        radial-gradient(1px 1px at 130px 20px, rgba(251, 191, 36, 0.5), transparent),
        radial-gradient(1px 1px at 160px 90px, white, transparent);
      background-size: 200px 200px;
      background-repeat: repeat;
      pointer-events: none;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Noto Serif KR', 'Noto Sans KR', serif;
      font-weight: 600;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(30, 41, 59, 0.6);
      border-radius: 24px;
      padding: 40px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      position: relative;
      z-index: 1;
      box-shadow: 0 0 40px rgba(109, 40, 217, 0.1);
    }

    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header h1 {
      font-size: 2rem;
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 12px;
    }

    .header p {
      color: #c084fc;
      font-size: 1rem;
    }

    .section {
      background: rgba(30, 41, 59, 0.5);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .section-title {
      font-size: 1.25rem;
      color: #fbbf24;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Noto Serif KR', serif;
    }

    .score {
      display: inline-block;
      font-size: 2rem;
      font-weight: bold;
      padding: 8px 24px;
      border-radius: 50px;
      margin: 10px 0;
    }

    .score.high {
      background: rgba(34, 197, 94, 0.2);
      color: #4ade80;
      box-shadow: 0 0 20px rgba(34, 197, 94, 0.2);
    }
    .score.medium {
      background: rgba(251, 191, 36, 0.2);
      color: #fbbf24;
      box-shadow: 0 0 20px rgba(251, 191, 36, 0.2);
    }
    .score.low {
      background: rgba(239, 68, 68, 0.2);
      color: #f87171;
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.2);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }
    @media (max-width: 600px) {
      .grid { grid-template-columns: 1fr; }
    }

    .card {
      background: rgba(30, 41, 59, 0.6);
      border-radius: 12px;
      padding: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .card-title {
      color: #c084fc;
      font-size: 0.875rem;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .card-value {
      color: #f1f5f9;
      font-weight: 600;
      font-size: 1rem;
    }

    ul { list-style: none; padding-left: 0; }

    li {
      padding: 10px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: flex-start;
      gap: 10px;
      color: #cbd5e1;
    }

    li:last-child { border-bottom: none; }

    .check { color: #4ade80; font-weight: bold; }
    .cross { color: #f87171; font-weight: bold; }

    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: #64748b;
    }

    .footer a {
      color: #c084fc;
      text-decoration: none;
    }

    .progress-bar {
      height: 10px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      overflow: hidden;
      margin: 10px 0;
    }

    .progress-fill {
      height: 100%;
      border-radius: 5px;
    }

    .progress-fill.high {
      background: linear-gradient(90deg, #22c55e, #4ade80);
      box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
    }
    .progress-fill.medium {
      background: linear-gradient(90deg, #f59e0b, #fbbf24);
      box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
    }
    .progress-fill.low {
      background: linear-gradient(90deg, #ef4444, #f87171);
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
    }

    .message-box {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.25));
      border: 2px solid rgba(251, 191, 36, 0.3);
      border-radius: 16px;
      padding: 24px;
      margin: 20px 0;
      text-align: center;
      box-shadow: 0 0 30px rgba(251, 191, 36, 0.1);
    }

    .message-text {
      font-size: 1.125rem;
      line-height: 1.9;
      color: #f1f5f9;
    }

    /* 추가 유틸리티 스타일 */
    .text-gold { color: #fbbf24; }
    .text-purple { color: #c084fc; }
    .text-green { color: #4ade80; }
    .text-red { color: #f87171; }
    .text-cyan { color: #22d3ee; }
    .text-blue { color: #60a5fa; }
    .text-muted { color: #94a3b8; }

    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .badge-gold {
      background: rgba(251, 191, 36, 0.2);
      color: #fbbf24;
      border: 1px solid rgba(251, 191, 36, 0.3);
    }

    .badge-purple {
      background: rgba(192, 132, 252, 0.2);
      color: #c084fc;
      border: 1px solid rgba(192, 132, 252, 0.3);
    }

    .badge-green {
      background: rgba(74, 222, 128, 0.2);
      color: #4ade80;
      border: 1px solid rgba(74, 222, 128, 0.3);
    }

    .badge-red {
      background: rgba(248, 113, 113, 0.2);
      color: #f87171;
      border: 1px solid rgba(248, 113, 113, 0.3);
    }

    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      margin: 20px 0;
    }

    .highlight-box {
      background: linear-gradient(135deg, rgba(109, 40, 217, 0.2), rgba(192, 132, 252, 0.15));
      border: 1px solid rgba(192, 132, 252, 0.3);
      border-radius: 12px;
      padding: 16px;
      margin: 12px 0;
    }

    .stat-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .stat-row:last-child { border-bottom: none; }

    .stat-label { color: #94a3b8; }
    .stat-value { color: #f1f5f9; font-weight: 600; }

    .icon-text {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .subsection {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 12px;
      padding: 16px;
      margin-top: 12px;
    }

    .subsection-title {
      color: #c084fc;
      font-size: 1rem;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tag {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.875rem;
      color: #cbd5e1;
    }
  </style>
</head>
<body>
  <div class="container">
    ${content}
    <div class="footer">
      <p style="font-size: 1.1rem; color: #c084fc; margin-bottom: 8px;">✨ ForceTeller ✨</p>
      <p style="color: #64748b;">AI 기반 프리미엄 운세 서비스</p>
      <p style="margin-top: 12px; font-size: 0.875rem; color: #475569;">
        생성일: ${new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  </div>
</body>
</html>
`;

  const blob = new Blob([htmlTemplate], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// 이메일 보내기 유틸리티 (mailto: 링크 사용)
export function sendByEmail(subject: string, body: string) {
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}

// 점수에 따른 클래스 반환
export function getScoreClass(score: number): string {
  if (score >= 70) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

// 진행바 HTML 생성
export function createProgressBarHtml(score: number, label: string, color: string): string {
  const scoreClass = getScoreClass(score);
  return `
    <div class="card">
      <div class="card-title">${label}</div>
      <div class="card-value">${score}점</div>
      <div class="progress-bar">
        <div class="progress-fill ${scoreClass}" style="width: ${score}%"></div>
      </div>
    </div>
  `;
}

// 리스트 HTML 생성 (체크/X 표시)
export function createListHtml(items: string[], type: 'check' | 'cross'): string {
  return `
    <ul>
      ${items.map(item => `
        <li>
          <span class="${type}">${type === 'check' ? '✓' : '✗'}</span>
          <span>${item}</span>
        </li>
      `).join('')}
    </ul>
  `;
}

// 섹션 HTML 생성
export function createSectionHtml(title: string, content: string, emoji?: string): string {
  return `
    <div class="section">
      <h2 class="section-title">${emoji ? emoji + ' ' : ''}${title}</h2>
      ${content}
    </div>
  `;
}

// 점수 배지 HTML 생성
export function createScoreBadgeHtml(score: number, label?: string): string {
  const scoreClass = getScoreClass(score);
  return `
    <div class="score ${scoreClass}">
      ${score}점 ${label ? `<span style="font-size: 1rem; opacity: 0.8;">${label}</span>` : ''}
    </div>
  `;
}

// 메시지 박스 HTML 생성
export function createMessageBoxHtml(message: string): string {
  return `
    <div class="message-box">
      <p class="message-text">${message}</p>
    </div>
  `;
}

// 그리드 HTML 생성
export function createGridHtml(cards: string[]): string {
  return `
    <div class="grid">
      ${cards.join('')}
    </div>
  `;
}

// 카드 HTML 생성
export function createCardHtml(title: string, value: string | number, emoji?: string): string {
  return `
    <div class="card">
      <div class="card-title">${emoji ? emoji + ' ' : ''}${title}</div>
      <div class="card-value">${value}</div>
    </div>
  `;
}
