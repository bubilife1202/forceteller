'use client';

// HTML 다운로드 유틸리티
export function downloadAsHtml(content: string, filename: string) {
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
      color: #fff;
      min-height: 100vh;
      padding: 40px 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: rgba(255,255,255,0.05);
      border-radius: 24px;
      padding: 40px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .header h1 {
      font-size: 2rem;
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }
    .header p { color: #a78bfa; }
    .section {
      background: rgba(255,255,255,0.03);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 20px;
      border: 1px solid rgba(255,255,255,0.05);
    }
    .section-title {
      font-size: 1.25rem;
      color: #fbbf24;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .score {
      display: inline-block;
      font-size: 2rem;
      font-weight: bold;
      padding: 8px 24px;
      border-radius: 50px;
      margin: 10px 0;
    }
    .score.high { background: rgba(34,197,94,0.2); color: #4ade80; }
    .score.medium { background: rgba(251,191,36,0.2); color: #fbbf24; }
    .score.low { background: rgba(239,68,68,0.2); color: #f87171; }
    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
    .card {
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      padding: 16px;
      border: 1px solid rgba(255,255,255,0.05);
    }
    .card-title { color: #a78bfa; font-size: 0.875rem; margin-bottom: 8px; }
    .card-value { color: #fff; font-weight: bold; }
    ul { list-style: none; padding-left: 0; }
    li {
      padding: 8px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    li:last-child { border-bottom: none; }
    .check { color: #4ade80; }
    .cross { color: #f87171; }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
      color: #64748b;
    }
    .footer a { color: #a78bfa; text-decoration: none; }
    .progress-bar {
      height: 8px;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      overflow: hidden;
      margin: 8px 0;
    }
    .progress-fill {
      height: 100%;
      border-radius: 4px;
    }
    .progress-fill.high { background: linear-gradient(90deg, #22c55e, #4ade80); }
    .progress-fill.medium { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .progress-fill.low { background: linear-gradient(90deg, #ef4444, #f87171); }
    .message-box {
      background: linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.3));
      border: 2px solid rgba(251,191,36,0.4);
      border-radius: 16px;
      padding: 24px;
      margin: 20px 0;
      text-align: center;
    }
    .message-text {
      font-size: 1.125rem;
      line-height: 1.8;
      color: #fff;
    }
  </style>
</head>
<body>
  <div class="container">
    ${content}
    <div class="footer">
      <p>ForceTeller - AI 운세 서비스</p>
      <p style="margin-top: 8px; font-size: 0.875rem;">
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
