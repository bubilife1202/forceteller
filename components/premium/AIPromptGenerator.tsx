'use client';

import { motion } from 'framer-motion';
import { Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { SajuResult } from '@/lib/saju-calculator';

interface AIPromptGeneratorProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
}

export default function AIPromptGenerator({
  result,
  name,
  gender,
  birthDate,
}: AIPromptGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<'종합' | '재물' | '애정' | '직업'>('종합');

  const generatePrompt = () => {
    const genderText = gender === 'male' ? '남자' : '여자';

    // 오행 분포
    const elementsText = Object.entries(result.elements)
      .map(([key, value]) => `- ${key}: ${value.toFixed(1)}%${
        result.elementBalance.excess.includes(key) ? ' (과다)' :
        result.elementBalance.deficiency.includes(key) ? ' (부족)' : ''
      }`)
      .join('\n');

    // 십성 구성 및 위치
    const getTenGodLocations = (godType: string) => {
      const locations = [];
      if (result.tenGods.year.includes(godType.slice(0, 2))) locations.push('년주');
      if (result.tenGods.month.includes(godType.slice(0, 2))) locations.push('월주');
      if (result.tenGods.day.includes(godType.slice(0, 2))) locations.push('일주');
      if (result.tenGods.hour.includes(godType.slice(0, 2))) locations.push('시주');
      return locations.length > 0 ? ` (${locations.join(', ')})` : '';
    };

    const tenGodsText = Object.entries(result.tenGodsCount)
      .map(([key, value]) => `- ${key}: ${value}개${getTenGodLocations(key)}`)
      .join('\n');

    // 합충 분석
    const hapchungText = result.hapchung.length > 0
      ? result.hapchung.map(h => `- ${h.type}: ${h.name} (${h.desc})`).join('\n')
      : '- 없음';

    // 신살 분석
    const goodShinsals = result.shinsals.filter(s => s.type === 'good');
    const badShinsals = result.shinsals.filter(s => s.type === 'bad');

    const shinsalText = `[길신]\n${goodShinsals.length > 0 ? goodShinsals.map(s => `- ${s.name}: ${s.desc}`).join('\n') : '- 없음'}\n\n[흉살]\n${badShinsals.length > 0 ? badShinsals.map(s => `- ${s.name}: ${s.desc}`).join('\n') : '- 없음'}`;

    // 현재 나이 계산
    const currentAge = new Date().getFullYear() - birthDate.year + 1;

    // 대운 분석
    const currentDaeun = result.daeun.find(d => currentAge >= d.age && currentAge < d.age + 10);
    const nextDaeun = result.daeun.find(d => d.age === (currentDaeun ? currentDaeun.age + 10 : 0));

    const topicQuestions = {
      종합: `**[종합운]**
1. 원국 사주 종합 평가 (격국, 용신 중심)
2. 인생 전반기(~40세) vs 후반기(40세~) 운세 흐름
3. 2025년 을사년 전체 운세를 **분기별**로 나눠서:
   - 1분기(1~3월): 무슨 일이 생기는지
   - 2분기(4~6월): 무슨 일이 생기는지
   - 3분기(7~9월): 무슨 일이 생기는지
   - 4분기(10~12월): 무슨 일이 생기는지
4. 특히 주의해야 할 달을 **월 단위로 찍어서** 알려줘 (예: "3월", "7월")
5. 대박 기회가 오는 달도 **월 단위로 찍어서** 알려줘
6. 일생 전체로 봤을 때 대운이 가장 좋은 시기 (○세~○세)
7. 대운이 힘든 시기와 대처법`,
      재물: `**[재물운]**
1. 원국에서 재성 배치 분석 (정재/편재, 강약)
2. 주 수입원 vs 부수입 가능성
3. 재물을 모으는 방법 (저축형/투자형/사업형)
4. 2025년 재물운 월별 타이밍:
   - 수입 증가 예상 월: ○월, ○월
   - 지출 주의 월: ○월, ○월
   - 투자 적기: ○월
5. 유리한 투자처 (부동산/주식/금/코인 등)
6. 절대 하면 안 되는 재테크
7. 돈이 새는 습관과 개선법
8. 평생 재물운 흐름 (언제 많고 언제 적은지)`,
      애정: `**[애정운]**
1. 일간과 관성/재성으로 본 이성관
2. 연애 스타일과 주의사항
3. [미혼] 배우자 만날 시기 (구체적 나이, 년도)
4. [미혼] 배우자 띠, 직업, 성향 추측
5. [기혼] 부부 궁합 분석, 갈등 원인과 해결법
6. 2025년 애정운 월별:
   - 인연수 강한 달: ○월
   - 고백/프러포즈 적기: ○월
   - 갈등 주의 월: ○월
7. 이상형 (외모, 성격)
8. 피해야 할 이성 유형`,
      직업: `**[직업운]**
1. 타고난 재능 (십성, 오행, 신살 분석)
2. 적합 직업 분야 TOP 5 (구체적 직무까지)
3. 피해야 할 직업
4. 직장 vs 사업 (프리랜서) 어느 쪽이 유리?
5. 이직 적기: 2025년 ○월
6. 승진운: ○세에 기회
7. 창업한다면 업종과 타이밍
8. 평생 커리어 로드맵 (○세~○세: ~~하라)`
    };

    return `# 너는 30년 경력의 정통 명리학자야.

## 당신의 전문성
- 자평명리학, 적천수, 삼명통회, 궁통보감 정통 이수
- 고전 원문 해석 가능
- 이론과 경험을 결합한 실전 풀이
- 점술이 아닌 논리적 명리 해석

---

## 내담자 사주 정보

### 기본 정보
- 성명: ${name} (${genderText})
- 생년월일: ${birthDate.year}년 ${birthDate.month}월 ${birthDate.day}일
- 현재 나이: ${currentAge}세

### 사주 팔자 (원국)
\`\`\`
   년주    월주    일주    시주
천간  ${result.year.stem.ko}${result.year.stem.cn}     ${result.month.stem.ko}${result.month.stem.cn}     ${result.day.stem.ko}${result.day.stem.cn}     ${result.hour.stem.ko}${result.hour.stem.cn}
지지  ${result.year.branch.ko}${result.year.branch.cn}     ${result.month.branch.ko}${result.month.branch.cn}     ${result.day.branch.ko}${result.day.branch.cn}     ${result.hour.branch.ko}${result.hour.branch.cn}
\`\`\`

### 일간 분석
- 일간: ${result.day.stem.ko}${result.day.stem.cn} (${result.day.stem.element} ${result.day.stem.yinyang === '+' ? '양' : '음'})
- 신강/신약: ${result.strength === 'strong' ? '신강' : result.strength === 'weak' ? '신약' : '중화'}
- 용신: ${result.yongsin}

### 오행 분포
${elementsText}

→ 과다: ${result.elementBalance.excess.length > 0 ? result.elementBalance.excess.join(', ') : '없음'} / 부족: ${result.elementBalance.deficiency.length > 0 ? result.elementBalance.deficiency.join(', ') : '없음'}

### 십성 구성
${tenGodsText}

### 합충형파해
${hapchungText}

### 신살
${shinsalText}

### 대운 (10년 단위 흐름)
${currentDaeun ? `- 현재 대운 (${currentDaeun.age}세~${currentDaeun.age + 9}세): ${currentDaeun.stem.ko}${currentDaeun.stem.cn}${currentDaeun.branch.ko}${currentDaeun.branch.cn}` : ''}
${nextDaeun ? `- 다음 대운 (${nextDaeun.age}세~${nextDaeun.age + 9}세): ${nextDaeun.stem.ko}${nextDaeun.stem.cn}${nextDaeun.branch.ko}${nextDaeun.branch.cn}` : ''}

### 세운 (올해)
- 2025년 을사년(乙巳)

---

## 상담 요청 주제: 【${selectedTopic}】

${topicQuestions[selectedTopic]}

---

## 답변 가이드라인

### 필수 준수 사항
1. **구체적으로**: "좋다/나쁘다" 말고 → "3월, 7월 주의 / 5월, 10월 기회"
2. **월 단위로**: "봄에~" (X) → "3월~4월" (O)
3. **나이 단위로**: "나중에~" (X) → "35세~37세에" (O)
4. **명리 이론 기반**: 왜 그런지 근거 설명 (예: "월지 ○가 일간을 극하므로")
5. **실용적 조언**: 막연한 말 말고 → "○○색 옷 입어라", "○쪽 향해 앉아라"
6. **금기 표현**: "노력하면 된다", "마음먹기 나름", "긍정적으로" 같은 자기계발서 말투 금지

### 답변 구조
1. 원국 해석 (이론 근거)
2. 구체적 시기/방법 제시
3. 주의사항과 대처법
4. 실천 가능한 조언 3가지

### 예시 (좋은 답변 vs 나쁜 답변)
❌ 나쁜 답변:
"재물운이 좋은 편입니다. 긍정적으로 생각하고 노력하면 부자 될 수 있습니다."

✅ 좋은 답변:
"원국에 정재 2개(월간, 시지 장간)가 있고 식신생재 구조입니다. 주 수입은 월급이지만, 시간외 수입(재능 판매, 투자)으로도 벌 수 있습니다. 2025년은 5월, 10월에 재물수가 강하니 이때 계약이나 투자 타이밍 잡으세요. 단, 7월은 비겁운으로 돈 나갈 일(경조사, 친구 빌려줌) 생기니 미리 예비비 챙기세요. 평생으로 보면 42~52세 대운이 재물 최고점입니다."

---

## 지금 바로 시작해줘!
위 사주를 보고 【${selectedTopic}】에 대해 상세하게 풀이해줘.`;
  };

  const handleCopy = async () => {
    const prompt = generatePrompt();
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      alert('복사에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-400/20 rounded-full blur-3xl -z-10" />

      {/* Icon */}
      <motion.div
        className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-amber-400 rounded-2xl mb-6 mx-auto"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="w-8 h-8 text-white" />
      </motion.div>

      <h3
        className="text-3xl font-bold text-center mb-3 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🔮 AI 도사에게 물어볼<br />비밀 주문서 받기
      </h3>

      <p className="text-center text-slate-300 mb-6 text-sm">
        ChatGPT에 붙여넣기만 하면 30년 경력 명리학자가 당신의 사주를 깊이 분석해드립니다
      </p>

      {/* Topic Selection */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {(['종합', '재물', '애정', '직업'] as const).map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
              selectedTopic === topic
                ? 'bg-gradient-to-r from-purple-500 to-amber-400 text-white scale-105'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Copy Button */}
      <motion.button
        onClick={handleCopy}
        className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 btn-glow glow-gold transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {copied ? (
          <>
            <Check className="w-5 h-5" />
            주문서가 복사되었습니다!
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            {selectedTopic} 주문서 복사하기
          </>
        )}
      </motion.button>

      {copied && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-amber-400 text-sm mt-4"
        >
          ✨ ChatGPT에 붙여넣기만 하세요!
        </motion.p>
      )}

      <p className="text-center text-slate-500 text-xs mt-4">
        💡 고급 AI 모델을 사용하면 더욱 정확한 풀이를 받을 수 있습니다
      </p>
    </motion.div>
  );
}
