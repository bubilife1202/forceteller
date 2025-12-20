import { SajuResult } from '@/lib/saju-calculator';
import { DAY_STEM_WEALTH } from '@/lib/data/wealth-data';
import { DAY_STEM_CAREER, TEN_GOD_CAREER, YEAR_FORTUNE } from '@/lib/data/career-data';

type FortuneType = 'newyear2026' | 'wealth' | 'daily' | 'career' | 'daeun' | 'compatibility';

interface FortuneParams {
  fortuneType: FortuneType;
  name: string;
  gender: 'male' | 'female';
  year: number;
  month: number;
  day: number;
  hour: number | null;
  sajuResult: SajuResult;
  brandName: string;
  brandContact: string;
}

// 공통 HTML 스타일
const getBaseStyles = () => `
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Noto Serif KR', 'Malgun Gothic', serif;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
      color: #e2e8f0;
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: rgba(30, 41, 59, 0.8);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }
    .header {
      text-align: center;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.2);
    }
    .header h1 {
      font-size: 28px;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
    }
    .header .subtitle {
      color: #94a3b8;
      font-size: 14px;
    }
    .section {
      background: rgba(51, 65, 85, 0.5);
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 16px;
    }
    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #f8fafc;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .saju-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      text-align: center;
    }
    .pillar {
      background: rgba(30, 41, 59, 0.8);
      border-radius: 12px;
      padding: 12px 8px;
    }
    .pillar-label {
      font-size: 12px;
      color: #94a3b8;
      margin-bottom: 8px;
    }
    .pillar-char {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    .pillar-char.stem { color: #fbbf24; }
    .pillar-char.branch { color: #60a5fa; }
    .score-badge {
      display: inline-block;
      background: linear-gradient(135deg, #f59e0b, #ef4444);
      color: white;
      font-size: 32px;
      font-weight: bold;
      padding: 12px 24px;
      border-radius: 16px;
    }
    .list-item {
      padding: 8px 0;
      border-bottom: 1px solid rgba(148, 163, 184, 0.1);
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .list-item:last-child { border-bottom: none; }
    .list-bullet {
      color: #f59e0b;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid rgba(148, 163, 184, 0.2);
      color: #64748b;
      font-size: 12px;
    }
    .footer .brand {
      font-size: 16px;
      color: #94a3b8;
      margin-bottom: 8px;
    }
    .highlight { color: #fbbf24; font-weight: bold; }
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    .card {
      background: rgba(30, 41, 59, 0.6);
      border-radius: 12px;
      padding: 16px;
    }
    .card-title {
      font-size: 14px;
      color: #94a3b8;
      margin-bottom: 8px;
    }
    .card-value {
      font-size: 18px;
      font-weight: bold;
      color: #f8fafc;
    }
  </style>
`;

// 사주 팔자 표시
const renderSajuGrid = (result: SajuResult) => `
  <div class="section">
    <div class="section-title">📋 사주 팔자</div>
    <div class="saju-grid">
      <div class="pillar">
        <div class="pillar-label">시주</div>
        <div class="pillar-char stem">${result.hour.stem.ko}</div>
        <div class="pillar-char branch">${result.hour.branch.ko}</div>
      </div>
      <div class="pillar">
        <div class="pillar-label">일주</div>
        <div class="pillar-char stem">${result.day.stem.ko}</div>
        <div class="pillar-char branch">${result.day.branch.ko}</div>
      </div>
      <div class="pillar">
        <div class="pillar-label">월주</div>
        <div class="pillar-char stem">${result.month.stem.ko}</div>
        <div class="pillar-char branch">${result.month.branch.ko}</div>
      </div>
      <div class="pillar">
        <div class="pillar-label">년주</div>
        <div class="pillar-char stem">${result.year.stem.ko}</div>
        <div class="pillar-char branch">${result.year.branch.ko}</div>
      </div>
    </div>
  </div>
`;

// 2026 신년운세 HTML 생성
const generateNewYear2026Html = (params: FortuneParams): string => {
  const { name, sajuResult, brandName, brandContact } = params;
  const dayStem = sajuResult.day.stem.ko;

  // 간단한 2026년 운세 계산
  const yearScore = 70 + (dayStem.charCodeAt(0) % 25);
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const monthScores = months.map((m, i) => ({
    month: m,
    score: 50 + ((dayStem.charCodeAt(0) + i * 7) % 45),
  }));

  const bestMonth = monthScores.reduce((a, b) => a.score > b.score ? a : b);
  const worstMonth = monthScores.reduce((a, b) => a.score < b.score ? a : b);

  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${name}님의 2026년 신년운세</title>
      ${getBaseStyles()}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🐴 2026년 신년운세</h1>
          <div class="subtitle">${name}님의 병오년 운세</div>
        </div>

        ${renderSajuGrid(sajuResult)}

        <div class="section" style="text-align: center;">
          <div class="section-title" style="justify-content: center;">⭐ 2026년 총운</div>
          <div class="score-badge">${yearScore}점</div>
          <p style="margin-top: 16px; color: #94a3b8;">
            ${yearScore >= 80 ? '대길! 큰 행운이 함께하는 한 해입니다.' :
              yearScore >= 60 ? '길! 꾸준한 노력이 결실을 맺는 해입니다.' :
              '평! 신중하게 행동하면 좋은 결과를 얻습니다.'}
          </p>
        </div>

        <div class="section">
          <div class="section-title">📅 월별 운세 포인트</div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
            ${monthScores.map(m => `
              <div class="card" style="text-align: center;">
                <div class="card-title">${m.month}</div>
                <div class="card-value" style="color: ${m.score >= 70 ? '#10b981' : m.score >= 50 ? '#fbbf24' : '#ef4444'}">
                  ${m.score}점
                </div>
              </div>
            `).join('')}
          </div>
          <div style="margin-top: 16px; padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px;">
            <p style="color: #10b981;">✨ 최고의 달: <strong>${bestMonth.month}</strong> (${bestMonth.score}점)</p>
          </div>
          <div style="margin-top: 8px; padding: 12px; background: rgba(239, 68, 68, 0.1); border-radius: 8px;">
            <p style="color: #ef4444;">⚠️ 주의할 달: <strong>${worstMonth.month}</strong> (${worstMonth.score}점)</p>
          </div>
        </div>

        <div class="section">
          <div class="section-title">💡 2026년 행동 지침</div>
          <div class="list-item"><span class="list-bullet">•</span> 상반기에는 새로운 시작보다 기존 일에 집중하세요</div>
          <div class="list-item"><span class="list-bullet">•</span> ${bestMonth.month}에 중요한 결정을 내리면 좋습니다</div>
          <div class="list-item"><span class="list-bullet">•</span> ${worstMonth.month}에는 큰 투자나 계약을 피하세요</div>
          <div class="list-item"><span class="list-bullet">•</span> 건강 관리에 특히 신경 쓰세요</div>
        </div>

        <div class="footer">
          <div class="brand">${brandName}</div>
          ${brandContact ? `<div>${brandContact}</div>` : ''}
          <div style="margin-top: 8px;">본 운세는 참고용이며, 인생의 중요한 결정은 신중하게 내리시기 바랍니다.</div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// 재물운 HTML 생성
const generateWealthHtml = (params: FortuneParams): string => {
  const { name, sajuResult, brandName, brandContact } = params;
  const dayStem = sajuResult.day.stem.ko;
  const wealthData = DAY_STEM_WEALTH[dayStem] || DAY_STEM_WEALTH['갑'];

  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${name}님의 재물운</title>
      ${getBaseStyles()}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💰 대박 재물운</h1>
          <div class="subtitle">${name}님의 평생 재물 분석</div>
        </div>

        ${renderSajuGrid(sajuResult)}

        <div class="section">
          <div class="section-title">💎 재물 성향</div>
          <p style="line-height: 1.8;">${wealthData.wealthPersonality}</p>
        </div>

        <div class="section">
          <div class="section-title">🧠 돈에 대한 마인드</div>
          <p style="line-height: 1.8;">${wealthData.moneyMindset}</p>
        </div>

        <div class="section">
          <div class="section-title">✅ 재물 강점</div>
          ${wealthData.strengths.map(s => `<div class="list-item"><span class="list-bullet">•</span> ${s}</div>`).join('')}
        </div>

        <div class="section">
          <div class="section-title">⚠️ 주의할 점</div>
          ${wealthData.weaknesses.map(w => `<div class="list-item"><span class="list-bullet">•</span> ${w}</div>`).join('')}
        </div>

        <div class="section">
          <div class="section-title">💼 추천 수입원</div>
          ${wealthData.idealIncome.map(i => `<div class="list-item"><span class="list-bullet">•</span> ${i}</div>`).join('')}
        </div>

        <div class="section">
          <div class="section-title">📈 투자 성향</div>
          <p style="line-height: 1.8;">${wealthData.investmentProfile}</p>
        </div>

        <div class="section">
          <div class="section-title">🎯 재물 전성기</div>
          <p style="line-height: 1.8; color: #fbbf24; font-weight: bold;">${wealthData.wealthPeak}</p>
        </div>

        <div class="section">
          <div class="section-title">🍀 행운 아이템</div>
          <div class="grid-2">
            <div class="card">
              <div class="card-title">행운의 사업</div>
              <div class="card-value" style="font-size: 14px;">${wealthData.luckyBusiness.slice(0, 2).join(', ')}</div>
            </div>
            <div class="card">
              <div class="card-title">행운의 색상</div>
              <div class="card-value" style="font-size: 14px;">${wealthData.luckyColors.join(', ')}</div>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="brand">${brandName}</div>
          ${brandContact ? `<div>${brandContact}</div>` : ''}
          <div style="margin-top: 8px;">본 운세는 참고용이며, 투자는 신중하게 결정하세요.</div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// 직업운 HTML 생성
const generateCareerHtml = (params: FortuneParams): string => {
  const { name, sajuResult, brandName, brandContact, year } = params;
  const dayStem = sajuResult.day.stem.ko;
  const careerData = DAY_STEM_CAREER[dayStem] || DAY_STEM_CAREER['갑'];
  const yearTenGod = sajuResult.tenGods.year;
  const yearFortune = YEAR_FORTUNE[yearTenGod] || YEAR_FORTUNE['비견'];
  const tenGodCareer = TEN_GOD_CAREER[yearTenGod] || TEN_GOD_CAREER['비견'];

  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - year + 1;

  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${name}님의 직업운</title>
      ${getBaseStyles()}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💼 퇴사/이직 타이밍</h1>
          <div class="subtitle">${name}님의 직업운 분석 (만 ${currentAge - 1}세)</div>
        </div>

        ${renderSajuGrid(sajuResult)}

        <div class="section">
          <div class="section-title">🎯 직업 적성</div>
          <p style="line-height: 1.8;">${careerData.personality}</p>
        </div>

        <div class="section">
          <div class="section-title">✅ 업무 강점</div>
          ${careerData.strengths.map(s => `<div class="list-item"><span class="list-bullet">•</span> ${s}</div>`).join('')}
        </div>

        <div class="section">
          <div class="section-title">💡 추천 직업</div>
          ${careerData.idealJobs.map(j => `<div class="list-item"><span class="list-bullet">•</span> ${j}</div>`).join('')}
        </div>

        <div class="section">
          <div class="section-title">📊 올해 직장운 (${yearTenGod})</div>
          <p style="line-height: 1.8;">${yearFortune.overall}</p>
          <div style="margin-top: 12px; padding: 12px; background: rgba(251, 191, 36, 0.1); border-radius: 8px;">
            <p style="color: #fbbf24;">💡 ${yearFortune.advice}</p>
          </div>
        </div>

        <div class="section">
          <div class="section-title">🔮 이직/퇴사 타이밍</div>
          <p style="line-height: 1.8;">${tenGodCareer.change}</p>
        </div>

        <div class="footer">
          <div class="brand">${brandName}</div>
          ${brandContact ? `<div>${brandContact}</div>` : ''}
          <div style="margin-top: 8px;">본 운세는 참고용이며, 중요한 결정은 신중하게 내리세요.</div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// 오늘의 운세 HTML 생성
const generateDailyHtml = (params: FortuneParams): string => {
  const { name, sajuResult, brandName, brandContact } = params;
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  const score = 50 + (today.getDate() + sajuResult.day.stem.ko.charCodeAt(0)) % 45;

  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${name}님의 오늘의 운세</title>
      ${getBaseStyles()}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>☀️ 오늘의 운세</h1>
          <div class="subtitle">${name}님 | ${dateStr}</div>
        </div>

        ${renderSajuGrid(sajuResult)}

        <div class="section" style="text-align: center;">
          <div class="section-title" style="justify-content: center;">⭐ 오늘의 총운</div>
          <div class="score-badge">${score}점</div>
        </div>

        <div class="section">
          <div class="section-title">💰 재물운</div>
          <p>오늘은 ${score >= 70 ? '재물운이 좋은 날입니다. 적극적인 투자를 고려해보세요.' : '무리한 지출을 삼가고 계획적인 소비를 권장합니다.'}</p>
        </div>

        <div class="section">
          <div class="section-title">💕 애정운</div>
          <p>오늘은 ${score >= 60 ? '인간관계가 원만한 날입니다. 소중한 사람과 대화를 나눠보세요.' : '감정 조절에 유의하고 차분하게 대화하세요.'}</p>
        </div>

        <div class="section">
          <div class="section-title">💼 직장운</div>
          <p>오늘은 ${score >= 65 ? '업무 성과가 좋은 날입니다. 중요한 미팅이나 발표에 적합합니다.' : '꼼꼼하게 업무를 처리하고 실수에 주의하세요.'}</p>
        </div>

        <div class="footer">
          <div class="brand">${brandName}</div>
          ${brandContact ? `<div>${brandContact}</div>` : ''}
        </div>
      </div>
    </body>
    </html>
  `;
};

// 대운 HTML 생성
const generateDaeunHtml = (params: FortuneParams): string => {
  const { name, sajuResult, brandName, brandContact, year } = params;
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - year + 1;

  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${name}님의 대운 분석</title>
      ${getBaseStyles()}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📈 인생 전성기</h1>
          <div class="subtitle">${name}님의 대운 분석 (만 ${currentAge - 1}세)</div>
        </div>

        ${renderSajuGrid(sajuResult)}

        <div class="section">
          <div class="section-title">🔮 대운 흐름</div>
          <div style="display: grid; gap: 12px;">
            ${sajuResult.daeun.slice(0, 6).map(d => `
              <div class="card" style="display: flex; justify-content: space-between; align-items: center; ${d.age <= currentAge && currentAge < d.age + 10 ? 'border: 2px solid #fbbf24;' : ''}">
                <div>
                  <div class="card-title">${d.age}세 ~ ${d.age + 9}세</div>
                  <div class="card-value">${d.stem.ko}${d.branch.ko} 대운</div>
                </div>
                ${d.age <= currentAge && currentAge < d.age + 10 ? '<span style="color: #fbbf24; font-weight: bold;">← 현재</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="section">
          <div class="section-title">💡 현재 대운 조언</div>
          <p style="line-height: 1.8;">
            현재 ${currentAge}세로, 지금은 ${sajuResult.daeun.find(d => d.age <= currentAge && currentAge < d.age + 10)?.stem.ko || ''}${sajuResult.daeun.find(d => d.age <= currentAge && currentAge < d.age + 10)?.branch.ko || ''} 대운의 영향을 받고 있습니다.
            이 시기에는 꾸준한 노력과 인내가 중요하며, 무리한 변화보다는 안정적인 성장에 집중하세요.
          </p>
        </div>

        <div class="footer">
          <div class="brand">${brandName}</div>
          ${brandContact ? `<div>${brandContact}</div>` : ''}
          <div style="margin-top: 8px;">본 분석은 참고용이며, 인생의 중요한 결정은 신중하게 내리세요.</div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// 메인 생성 함수
export const generateFortuneHtml = (params: FortuneParams): string => {
  switch (params.fortuneType) {
    case 'newyear2026':
      return generateNewYear2026Html(params);
    case 'wealth':
      return generateWealthHtml(params);
    case 'career':
      return generateCareerHtml(params);
    case 'daily':
      return generateDailyHtml(params);
    case 'daeun':
      return generateDaeunHtml(params);
    default:
      return generateNewYear2026Html(params);
  }
};
