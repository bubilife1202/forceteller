'use client';

/**
 * DOM 요소를 HTML 파일로 다운로드 (화면 그대로 저장)
 * @param elementId - 저장할 요소의 ID
 * @param filename - 파일명 (확장자 제외)
 */
export function downloadElementAsHtml(elementId: string, filename: string) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error('Element not found:', elementId);
    return;
  }

  // 버튼들 임시 숨기기
  const buttons = element.querySelectorAll('button');
  const originalDisplays: string[] = [];
  buttons.forEach((btn, i) => {
    originalDisplays[i] = (btn as HTMLElement).style.display;
    (btn as HTMLElement).style.display = 'none';
  });

  // HTML 콘텐츠 복제
  const clone = element.cloneNode(true) as HTMLElement;

  // 버튼 요소 제거
  clone.querySelectorAll('button').forEach(btn => btn.remove());

  // 버튼 원복
  buttons.forEach((btn, i) => {
    (btn as HTMLElement).style.display = originalDisplays[i];
  });

  // 모든 스타일시트 수집
  const styles = Array.from(document.styleSheets)
    .map(sheet => {
      try {
        return Array.from(sheet.cssRules)
          .map(rule => rule.cssText)
          .join('\n');
      } catch {
        // 외부 스타일시트는 CORS로 인해 접근 불가할 수 있음
        return '';
      }
    })
    .join('\n');

  const htmlTemplate = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename}</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    ${styles}

    /* 추가 스타일 보정 */
    body {
      font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
      min-height: 100vh;
      margin: 0;
      padding: 20px;
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

    /* Tailwind 클래스 폴백 */
    .glass-strong {
      background: rgba(30, 41, 59, 0.8);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .gradient-text {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* SVG 아이콘 스타일 보정 */
    svg {
      display: inline-block;
      vertical-align: middle;
    }

    /* 프린트 스타일 */
    @media print {
      body {
        background: white !important;
        color: black !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      body::before, body::after {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  ${clone.outerHTML}

  <div style="text-align: center; padding: 40px 20px; border-top: 1px solid rgba(255,255,255,0.1); margin-top: 40px;">
    <p style="font-size: 1.5rem; color: #fbbf24; margin-bottom: 12px; font-weight: bold;">👑 팔자왕 👑</p>
    <p style="color: #c084fc;">
      <a href="https://www.threads.com/@palzawang" target="_blank" style="color: #c084fc; text-decoration: none;">
        📱 @palzawang
      </a>
    </p>
  </div>
</body>
</html>`;

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

// 기존 함수들 유지 (하위 호환성)
export function downloadAsHtml(content: string, filename: string) {
  const htmlTemplate = `<!DOCTYPE html>
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

    .header p { color: #c084fc; font-size: 1rem; }

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

    .score.high { background: rgba(34, 197, 94, 0.2); color: #4ade80; }
    .score.medium { background: rgba(251, 191, 36, 0.2); color: #fbbf24; }
    .score.low { background: rgba(239, 68, 68, 0.2); color: #f87171; }

    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }

    .card {
      background: rgba(30, 41, 59, 0.6);
      border-radius: 12px;
      padding: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .card-title { color: #c084fc; font-size: 0.875rem; margin-bottom: 8px; font-weight: 500; }
    .card-value { color: #f1f5f9; font-weight: 600; font-size: 1rem; }

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

    .footer a { color: #c084fc; text-decoration: none; }

    .progress-bar { height: 10px; background: rgba(255, 255, 255, 0.1); border-radius: 5px; overflow: hidden; margin: 10px 0; }
    .progress-fill { height: 100%; border-radius: 5px; }
    .progress-fill.high { background: linear-gradient(90deg, #22c55e, #4ade80); }
    .progress-fill.medium { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .progress-fill.low { background: linear-gradient(90deg, #ef4444, #f87171); }

    .message-box {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.25));
      border: 2px solid rgba(251, 191, 36, 0.3);
      border-radius: 16px;
      padding: 24px;
      margin: 20px 0;
      text-align: center;
    }

    .message-text { font-size: 1.125rem; line-height: 1.9; color: #f1f5f9; }

    .text-gold { color: #fbbf24; }
    .text-purple { color: #c084fc; }
    .text-green { color: #4ade80; }
    .text-red { color: #f87171; }
    .text-cyan { color: #22d3ee; }
    .text-blue { color: #60a5fa; }
    .text-muted { color: #94a3b8; }

    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 0.875rem; font-weight: 500; }
    .badge-gold { background: rgba(251, 191, 36, 0.2); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); }
    .badge-purple { background: rgba(192, 132, 252, 0.2); color: #c084fc; border: 1px solid rgba(192, 132, 252, 0.3); }
    .badge-green { background: rgba(74, 222, 128, 0.2); color: #4ade80; border: 1px solid rgba(74, 222, 128, 0.3); }
    .badge-red { background: rgba(248, 113, 113, 0.2); color: #f87171; border: 1px solid rgba(248, 113, 113, 0.3); }

    .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); margin: 20px 0; }

    .highlight-box {
      background: linear-gradient(135deg, rgba(109, 40, 217, 0.2), rgba(192, 132, 252, 0.15));
      border: 1px solid rgba(192, 132, 252, 0.3);
      border-radius: 12px;
      padding: 16px;
      margin: 12px 0;
    }

    .stat-row { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
    .stat-row:last-child { border-bottom: none; }
    .stat-label { color: #94a3b8; }
    .stat-value { color: #f1f5f9; font-weight: 600; }

    .icon-text { display: flex; align-items: center; gap: 8px; }
    .subsection { background: rgba(15, 23, 42, 0.4); border-radius: 12px; padding: 16px; margin-top: 12px; }
    .subsection-title { color: #c084fc; font-size: 1rem; margin-bottom: 12px; font-weight: 600; }
    .tag-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; padding: 6px 12px; font-size: 0.875rem; color: #cbd5e1; }
  </style>
</head>
<body>
  <div class="container">
    ${content}
    <div class="footer">
      <p style="font-size: 1.3rem; color: #fbbf24; margin-bottom: 12px; font-weight: bold;">👑 팔자왕 👑</p>
      <p style="margin-bottom: 8px;">
        <a href="https://www.threads.com/@palzawang" target="_blank" style="color: #c084fc; text-decoration: none;">
          📱 @palzawang
        </a>
      </p>
    </div>
  </div>
</body>
</html>`;

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

// 이메일 보내기 유틸리티
export function sendByEmail(subject: string, body: string) {
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
}

// 유틸리티 함수들
export function getScoreClass(score: number): string {
  if (score >= 70) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
}

export function createProgressBarHtml(score: number, label: string): string {
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

export function createSectionHtml(title: string, content: string, emoji?: string): string {
  return `
    <div class="section">
      <h2 class="section-title">${emoji ? emoji + ' ' : ''}${title}</h2>
      ${content}
    </div>
  `;
}

export function createScoreBadgeHtml(score: number, label?: string): string {
  const scoreClass = getScoreClass(score);
  return `
    <div class="score ${scoreClass}">
      ${score}점 ${label ? `<span style="font-size: 1rem; opacity: 0.8;">${label}</span>` : ''}
    </div>
  `;
}

export function createMessageBoxHtml(message: string): string {
  return `
    <div class="message-box">
      <p class="message-text">${message}</p>
    </div>
  `;
}

export function createGridHtml(cards: string[]): string {
  return `<div class="grid">${cards.join('')}</div>`;
}

export function createCardHtml(title: string, value: string | number, emoji?: string): string {
  return `
    <div class="card">
      <div class="card-title">${emoji ? emoji + ' ' : ''}${title}</div>
      <div class="card-value">${value}</div>
    </div>
  `;
}
