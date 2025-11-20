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
    const ilju = `${result.day.stem.ko}${result.day.stem.cn}${result.day.branch.ko}${result.day.branch.cn}`;

    // 오행 분포
    const elementsText = Object.entries(result.elements)
      .map(([key, value]) => `${key}: ${value.toFixed(1)}%`)
      .join(', ');

    // 과부족 오행
    const excessText = result.elementBalance.excess.length > 0
      ? `과다: ${result.elementBalance.excess.join(', ')}`
      : '';
    const deficiencyText = result.elementBalance.deficiency.length > 0
      ? `부족: ${result.elementBalance.deficiency.join(', ')}`
      : '';

    // 십성 구성
    const tenGodsText = Object.entries(result.tenGodsCount)
      .map(([key, value]) => `${key}: ${value}개`)
      .join(', ');

    const topicGuide = {
      종합: '2025년 전체 운세를 분기별로 나눠서 설명해주고, 특히 주의해야 할 달과 기회가 오는 달을 명확히 짚어줘.',
      재물: '재물운을 중심으로 수입, 투자, 지출 패턴을 분석하고, 재테크 타이밍과 주의사항을 알려줘.',
      애정: '연애운 또는 부부운을 구체적으로 풀이하고, 인연을 만날 시기나 관계 개선 방법을 조언해줘.',
      직업: '커리어와 직업운을 분석하고, 이직·승진·사업 타이밍, 적합한 직무나 산업을 추천해줘.'
    };

    return `너는 30년 경력의 프로 명리학자야. 아래 정보를 바탕으로 질문에 답변해줘.

**기본 정보**
- 이름: ${name} (${genderText})
- 생년월일: ${birthDate.year}년 ${birthDate.month}월 ${birthDate.day}일
- 일주(日柱): ${ilju}
- 신강/신약: ${result.strength === 'strong' ? '신강' : result.strength === 'weak' ? '신약' : '중화'}

**사주 팔자**
- 년주: ${result.year.stem.ko}${result.year.stem.cn} ${result.year.branch.ko}${result.year.branch.cn}
- 월주: ${result.month.stem.ko}${result.month.stem.cn} ${result.month.branch.ko}${result.month.branch.cn}
- 일주: ${result.day.stem.ko}${result.day.stem.cn} ${result.day.branch.ko}${result.day.branch.cn}
- 시주: ${result.hour.stem.ko}${result.hour.stem.cn} ${result.hour.branch.ko}${result.hour.branch.cn}

**오행 분포**
${elementsText}
${excessText}
${deficiencyText}

**십성 구성**
${tenGodsText}

**질문**
${topicGuide[selectedTopic]}

답변은 점쟁이처럼 추상적으로 하지 말고, 명리학 이론에 근거하여 구체적이고 직설적으로 해줘. 월별로 나눌 때는 "3월", "7월" 이런 식으로 명확히 찍어줘.`;
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
        💡 ChatGPT-4를 사용하면 더욱 정확한 풀이를 받을 수 있습니다
      </p>
    </motion.div>
  );
}
