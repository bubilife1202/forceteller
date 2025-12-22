'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Download, Share2, ArrowLeft, Mail } from 'lucide-react';
import { TaemongFormData } from './TaemongForm';
import { downloadElementAsHtml } from '@/lib/utils/export-utils';
import { shareToKakao } from '@/lib/utils/kakao-share';

// Premium sub-components
import TaemongHero from './premium/taemong/TaemongHero';
import TaemongSymbols from './premium/taemong/TaemongSymbols';
import TaemongGender from './premium/taemong/TaemongGender';
import TaemongPersonality from './premium/taemong/TaemongPersonality';
import TaemongCareer from './premium/taemong/TaemongCareer';
import TaemongWealth from './premium/taemong/TaemongWealth';
import TaemongRelation from './premium/taemong/TaemongRelation';
import TaemongBirthday from './premium/taemong/TaemongBirthday';
import TaemongGuide from './premium/taemong/TaemongGuide';
import TaemongEducation from './premium/taemong/TaemongEducation';
import TaemongFuture from './premium/taemong/TaemongFuture';
import TaemongHealth from './premium/taemong/TaemongHealth';
import TaemongSibling from './premium/taemong/TaemongSibling';
import TaemongTalent from './premium/taemong/TaemongTalent';

interface TaemongResultProps {
  formData: TaemongFormData;
  onReset: () => void;
  onBack: () => void;
}

export default function TaemongResult({
  formData,
  onReset,
  onBack,
}: TaemongResultProps) {
  // 태몽 등급 및 점수 계산
  const calculateGrade = () => {
    const content = formData.dreamContent.toLowerCase();
    let score = 50;

    // 대길몽 키워드
    const greatKeywords = ['용', '황제', '왕', '황금', '해', '태양'];
    const goodKeywords = [
      '호랑이',
      '뱀',
      '돼지',
      '잉어',
      '꽃',
      '보석',
      '달',
      '별',
    ];
    const normalKeywords = [
      '새',
      '나무',
      '과일',
      '물',
      '산',
      '구름',
    ];

    greatKeywords.forEach((keyword) => {
      if (content.includes(keyword)) score += 15;
    });
    goodKeywords.forEach((keyword) => {
      if (content.includes(keyword)) score += 10;
    });
    normalKeywords.forEach((keyword) => {
      if (content.includes(keyword)) score += 5;
    });

    // 긍정적 수식어
    if (content.includes('밝') || content.includes('빛')) score += 5;
    if (content.includes('크') || content.includes('많')) score += 5;
    if (content.includes('아름다') || content.includes('예쁜')) score += 5;

    // 꿈을 꾼 사람 가중치
    if (formData.dreamer === 'parent') score += 8;
    if (formData.dreamer === 'self' || formData.dreamer === 'spouse') score += 5;

    score = Math.min(Math.max(score, 40), 100);

    let grade = '';
    if (score >= 85) grade = '대길';
    else if (score >= 70) grade = '길';
    else grade = '보통';

    return { score, grade };
  };

  // 핵심 메시지 생성
  const getCoreMessage = () => {
    const content = formData.dreamContent.toLowerCase();

    if (content.includes('용')) {
      return `${formData.name}님은 용처럼 귀하고 뛰어난 인물로 태어날 운명입니다. 리더십과 통솔력이 뛰어나며, 많은 사람을 이끌고 큰 업적을 이룰 것입니다. 학문이나 사업에서 크게 성공하여 집안의 영광이 될 것입니다.`;
    }

    if (content.includes('호랑이') || content.includes('범')) {
      return `${formData.name}님은 호랑이처럼 용맹하고 당당한 기상을 가진 아이입니다. 정의감이 강하고 용기있는 성품으로 어려운 일도 두려워하지 않습니다. 사회에 정의를 실현하는 훌륭한 인물이 될 것입니다.`;
    }

    if (content.includes('뱀')) {
      return `${formData.name}님은 뱀의 지혜와 재물운을 타고났습니다. 총명하고 영리하여 학업에서 우수한 성과를 거두며, 재물을 모으는 감각도 뛰어납니다. 부귀영화를 누리며 평생 풍족하게 살 것입니다.`;
    }

    if (content.includes('돼지')) {
      return `${formData.name}님은 돼지가 상징하는 재물복과 풍요를 가지고 태어납니다. 평생 먹고사는 데 걱정이 없으며, 재물이 저절로 들어오는 복된 인생을 살 것입니다. 넉넉하고 후한 성품으로 많은 사람에게 베풀며 살아갈 것입니다.`;
    }

    if (content.includes('꽃')) {
      return `${formData.name}님은 꽃처럼 아름답고 향기로운 인생을 살 운명입니다. 외모가 뛰어나고 예술적 재능이 많아 많은 사람의 사랑을 받을 것입니다. 세상을 아름답게 만드는 특별한 존재가 될 것입니다.`;
    }

    if (content.includes('잉어') || content.includes('물고기')) {
      return `${formData.name}님은 등용문을 넘는 잉어처럼 출세하고 성공할 운명입니다. 학업에서 뛰어난 성과를 거두고, 높은 지위에 올라 많은 사람을 이끌 것입니다. 꾸준한 노력으로 꿈을 이루는 인물이 될 것입니다.`;
    }

    if (content.includes('해') || content.includes('태양')) {
      return `${formData.name}님은 태양처럼 밝고 당당한 기운을 가진 아이입니다. 리더십이 뛰어나고 정직한 성품으로 많은 사람의 존경을 받을 것입니다. 어둠을 밝히는 빛과 같은 존재로 세상에 긍정적인 영향을 줄 것입니다.`;
    }

    if (content.includes('달')) {
      return `${formData.name}님은 달처럼 부드럽고 지혜로운 기운을 가진 아이입니다. 직관력이 뛰어나고 신비로운 매력이 있어 예술이나 학문 분야에서 두각을 나타낼 것입니다. 조용히 빛나는 달처럼 깊이있는 인물이 될 것입니다.`;
    }

    return `${formData.name}님은 건강하고 행복한 아이로 태어날 운명입니다. 부모님의 사랑 속에서 건강하게 자라며, 착한 마음씨와 좋은 성품으로 많은 사람에게 사랑받을 것입니다. 평범하지만 행복한 인생을 살아갈 것입니다.`;
  };

  // 키워드 생성
  const getKeywords = () => {
    const content = formData.dreamContent.toLowerCase();
    const keywords: string[] = [];

    // 성격 키워드
    if (content.includes('용') || content.includes('호랑이')) keywords.push('리더십');
    if (content.includes('뱀') || content.includes('올빼미')) keywords.push('지혜');
    if (content.includes('꽃') || content.includes('아름다')) keywords.push('예술적 재능');
    if (content.includes('금') || content.includes('돼지')) keywords.push('재물복');
    if (content.includes('해') || content.includes('밝')) keywords.push('밝은 성격');
    if (content.includes('달') || content.includes('별')) keywords.push('직관력');

    // 일반 키워드
    if (keywords.length === 0) {
      keywords.push('건강', '행복', '사랑');
    }

    // 추가 키워드
    if (keywords.length < 4) {
      const additionalKeywords = ['총명함', '성실함', '친화력', '용기', '배려심'];
      additionalKeywords.forEach((kw) => {
        if (keywords.length < 4 && !keywords.includes(kw)) {
          keywords.push(kw);
        }
      });
    }

    return keywords.slice(0, 4);
  };

  const { score, grade } = calculateGrade();
  const coreMessage = getCoreMessage();
  const keywords = getKeywords();

  // HTML 다운로드 (화면 그대로 저장)
  const handleDownloadHtml = () => {
    downloadElementAsHtml('taemong-result', `태몽해설_${formData.name}`);
  };

  // 카카오 공유
  const handleKakaoShare = () => {
    shareToKakao({
      title: `🌟 ${formData.name}님의 태몽해설`,
      description: `${grade} | 점수 ${score}점 | ${keywords.slice(0, 2).join(', ')}`,
    });
  };

  return (
    <div id="taemong-result" className="w-full max-w-6xl mx-auto space-y-12 py-12 px-4">
      {/* 상단 네비게이션 */}
      <div className="flex justify-between items-center">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>돌아가기</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <TaemongHero
        formData={formData}
        grade={grade}
        gradeScore={score}
        coreMessage={coreMessage}
        keywords={keywords}
      />

      {/* 상징 분석 */}
      <TaemongSymbols formData={formData} />

      {/* 성별 예측 */}
      <TaemongGender formData={formData} />

      {/* 성격과 재능 */}
      <TaemongPersonality formData={formData} />

      {/* 진로와 직업운 */}
      <TaemongCareer formData={formData} />

      {/* 평생 재물운 */}
      <TaemongWealth formData={formData} />

      {/* 인연과 관계운 */}
      <TaemongRelation formData={formData} />

      {/* 출산 시기 안내 */}
      <TaemongBirthday formData={formData} />

      {/* 태교 가이드 */}
      <TaemongGuide formData={formData} />

      {/* 교육 가이드 */}
      <TaemongEducation formData={formData} />

      {/* 미래 운세 */}
      <TaemongFuture formData={formData} />

      {/* 건강 분석 */}
      <TaemongHealth formData={formData} />

      {/* 형제/자매 관계 */}
      <TaemongSibling formData={formData} />

      {/* 타고난 재능 */}
      <TaemongTalent formData={formData} />

      {/* 하단 액션 버튼 */}
      <div className="flex justify-center gap-3 flex-wrap pt-8">
        <motion.button
          onClick={handleDownloadHtml}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl font-semibold transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4" />
          저장
        </motion.button>
        <motion.button
          onClick={() => {}}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl font-semibold transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="w-4 h-4" />
          메일
        </motion.button>
        <motion.button
          onClick={handleKakaoShare}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 rounded-xl font-semibold transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="w-4 h-4" />
          카톡
        </motion.button>
        <motion.button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl font-semibold transition text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4" />
          다시하기
        </motion.button>
      </div>

      {/* 면책 조항 */}
      <div className="text-center text-slate-500 text-sm space-y-2 pt-8 border-t border-slate-800">
        <p>
          * 태몽 해설은 전통적인 해몽 방식을 바탕으로 한 참고 자료입니다.
        </p>
        <p>
          * 실제 아기의 성별, 성격, 미래는 다양한 요인에 의해 결정됩니다.
        </p>
        <p>
          * 가장 중요한 것은 부모님의 사랑과 건강한 양육 환경입니다.
        </p>
      </div>
    </div>
  );
}
