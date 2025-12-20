// HTML 다운로드 유틸리티

export interface DownloadOptions {
  title: string;
  date: string;
  content: string;
  primaryColor?: string;
}

export function generateStyledHTML(options: DownloadOptions): string {
  const { title, date, content, primaryColor = '#f59e0b' } = options;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - 팔자왕</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Noto+Serif+KR:wght@400;600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Noto Sans KR', sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      min-height: 100vh;
      color: #e2e8f0;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
    }

    .header {
      text-align: center;
      margin-bottom: 30px;
      padding: 30px;
      background: rgba(30, 41, 59, 0.8);
      border-radius: 20px;
      border: 1px solid rgba(148, 163, 184, 0.1);
    }

    .header h1 {
      font-family: 'Noto Serif KR', serif;
      font-size: 28px;
      color: white;
      margin-bottom: 8px;
    }

    .header .date {
      color: ${primaryColor};
      font-size: 14px;
    }

    .section {
      background: rgba(30, 41, 59, 0.8);
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 16px;
      border: 1px solid rgba(148, 163, 184, 0.1);
    }

    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: white;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .section-title .icon {
      font-size: 20px;
    }

    .score-box {
      text-align: center;
      padding: 24px;
      background: rgba(15, 23, 42, 0.5);
      border-radius: 16px;
      margin-bottom: 16px;
    }

    .score-value {
      font-size: 48px;
      font-weight: 700;
      color: ${primaryColor};
    }

    .score-label {
      color: #94a3b8;
      font-size: 14px;
    }

    .grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }

    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .stat-card {
      background: rgba(15, 23, 42, 0.5);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
    }

    .stat-label {
      color: #94a3b8;
      font-size: 12px;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 18px;
      font-weight: 700;
      color: white;
    }

    .stat-value.yellow { color: #fbbf24; }
    .stat-value.pink { color: #ec4899; }
    .stat-value.blue { color: #3b82f6; }
    .stat-value.green { color: #22c55e; }
    .stat-value.purple { color: #a855f7; }
    .stat-value.orange { color: #f97316; }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #334155;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 8px;
    }

    .progress-bar .fill {
      height: 100%;
      border-radius: 4px;
    }

    .progress-bar .fill.yellow { background: #fbbf24; }
    .progress-bar .fill.pink { background: #ec4899; }
    .progress-bar .fill.blue { background: #3b82f6; }
    .progress-bar .fill.green { background: #22c55e; }

    .advice-box {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(249, 115, 22, 0.2));
      border: 1px solid rgba(245, 158, 11, 0.3);
      border-radius: 16px;
      padding: 20px;
    }

    .advice-title {
      color: #fcd34d;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .advice-text {
      color: white;
      font-size: 18px;
      line-height: 1.6;
    }

    .list-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .list-item .bullet {
      color: ${primaryColor};
      flex-shrink: 0;
    }

    .footer {
      text-align: center;
      padding: 20px;
      color: #64748b;
      font-size: 12px;
    }

    .footer a {
      color: ${primaryColor};
      text-decoration: none;
    }

    @media print {
      body {
        background: white;
        color: #1e293b;
      }

      .section {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
      }

      .score-box, .stat-card {
        background: #f1f5f9;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${title}</h1>
      <p class="date">${date}</p>
    </div>

    ${content}

    <div class="footer">
      <p>팔자왕 - 무료 사주 운세 서비스</p>
      <p><a href="https://palzawang.co.kr">https://palzawang.co.kr</a></p>
    </div>
  </div>
</body>
</html>`;
}

export function downloadHTML(filename: string, html: string): void {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
