'use client';

import { motion } from 'framer-motion';
import { BookOpen, Music, Flower2, MessageCircle } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongGuideProps {
  formData: TaemongFormData;
}

export default function TaemongGuide({ formData }: TaemongGuideProps) {
  // 태교 방법 추천
  const getTaegyoRecommendations = () => {
    const content = formData.dreamContent.toLowerCase();
    const recommendations: Array<{
      icon: string;
      title: string;
      activities: string[];
      reason: string;
    }> = [];

    // 음악 태교
    if (
      content.includes('새') ||
      content.includes('노래') ||
      content.includes('소리') ||
      content.includes('음악')
    ) {
      recommendations.push({
        icon: '🎵',
        title: '음악 태교',
        activities: [
          '클래식 음악 듣기 (모차르트, 비발디)',
          '자연의 소리 (새소리, 물소리) 듣기',
          '태아에게 자장가 불러주기',
          '엄마가 좋아하는 편안한 음악 감상',
        ],
        reason: '태몽에 소리와 관련된 상징이 나타나 청각 태교가 특히 중요합니다.',
      });
    }

    // 독서 태교
    if (content.includes('책') || content.includes('글') || content.includes('뱀')) {
      recommendations.push({
        icon: '📚',
        title: '독서 태교',
        activities: [
          '좋은 책을 소리내어 읽어주기',
          '시와 동화책 읽기',
          '태교 일기 쓰기',
          '아름다운 그림책 감상',
        ],
        reason: '지혜와 학문의 기운이 담긴 태몽으로, 독서 태교가 효과적입니다.',
      });
    }

    // 미술 태교
    if (
      content.includes('꽃') ||
      content.includes('아름다운') ||
      content.includes('예쁜') ||
      content.includes('색')
    ) {
      recommendations.push({
        icon: '🎨',
        title: '미술 태교',
        activities: [
          '아름다운 그림과 미술 작품 감상',
          '예쁜 색칠하기나 그림 그리기',
          '꽃꽂이나 원예 활동',
          '박물관, 미술관 방문',
        ],
        reason: '아름다움과 예술성이 담긴 태몽으로, 시각적 태교가 좋습니다.',
      });
    }

    // 자연 태교
    if (
      content.includes('산') ||
      content.includes('물') ||
      content.includes('나무') ||
      content.includes('자연')
    ) {
      recommendations.push({
        icon: '🌳',
        title: '자연 태교',
        activities: [
          '공원이나 숲길 산책',
          '맑은 공기 마시며 명상',
          '화분 가꾸기',
          '자연 다큐멘터리 시청',
        ],
        reason: '자연의 기운이 담긴 태몽으로, 자연과 함께하는 태교가 이상적입니다.',
      });
    }

    // 운동 태교
    if (
      content.includes('호랑이') ||
      content.includes('달리') ||
      content.includes('힘') ||
      content.includes('강한')
    ) {
      recommendations.push({
        icon: '🤸',
        title: '운동 태교',
        activities: [
          '임산부 요가',
          '가벼운 산책 (하루 30분)',
          '임산부 수영',
          '스트레칭',
        ],
        reason: '활동적이고 강한 기운의 태몽으로, 적절한 운동 태교가 좋습니다.',
      });
    }

    // 기본 태교
    if (recommendations.length === 0) {
      recommendations.push({
        icon: '💕',
        title: '종합 태교',
        activities: [
          '편안한 음악 감상',
          '긍정적인 생각과 대화',
          '규칙적인 생활',
          '영양가 있는 식사',
        ],
        reason: '균형잡힌 태교로 건강한 아이를 준비하세요.',
      });
    }

    return recommendations.slice(0, 3);
  };

  // 태담 가이드
  const getTaedamGuide = () => {
    const content = formData.dreamContent.toLowerCase();

    if (content.includes('용') || content.includes('호랑이')) {
      return {
        theme: '리더의 자질',
        examples: [
          '"우리 아기는 훌륭한 리더가 될 거야"',
          '"많은 사람들에게 사랑받고 존경받을 거야"',
          '"용기있고 당당한 사람이 되렴"',
        ],
      };
    }

    if (content.includes('뱀') || content.includes('올빼미') || content.includes('책')) {
      return {
        theme: '지혜로운 인재',
        examples: [
          '"똑똑하고 현명한 아이가 될 거야"',
          '"공부를 좋아하는 아이로 자랄 거야"',
          '"세상의 진리를 깨우치는 사람이 되렴"',
        ],
      };
    }

    if (content.includes('꽃') || content.includes('아름다운')) {
      return {
        theme: '예술적 감성',
        examples: [
          '"아름다운 마음을 가진 아이야"',
          '"예술적 재능이 뛰어날 거야"',
          '"세상을 아름답게 만드는 사람이 되렴"',
        ],
      };
    }

    return {
      theme: '사랑과 축복',
      examples: [
        '"엄마 아빠가 너를 얼마나 사랑하는지 아니?"',
        '"건강하고 행복하게 자라렴"',
        '"네가 우리에게 온 것은 큰 축복이야"',
      ],
    };
  };

  // 기도문
  const getPrayerGuide = () => {
    const content = formData.dreamContent.toLowerCase();
    let prayer = '';

    if (content.includes('용') || content.includes('황제')) {
      prayer = `하늘이시여, ${formData.name}이가 용처럼 귀하고 뛰어난 인물로 자라나게 하소서. 많은 사람을 이끌고 세상에 큰 기여를 하는 리더가 되게 하소서.`;
    } else if (content.includes('꽃') || content.includes('아름다운')) {
      prayer = `하늘이시여, ${formData.name}이가 꽃처럼 아름답고 향기로운 삶을 살게 하소서. 예술적 재능으로 세상을 아름답게 만드는 사람이 되게 하소서.`;
    } else if (content.includes('금') || content.includes('보석')) {
      prayer = `하늘이시여, ${formData.name}이가 평생 재물복이 풍성하고 부귀영화를 누리게 하소서. 많은 이에게 나눔을 실천하는 복덕을 갖추게 하소서.`;
    } else {
      prayer = `하늘이시여, ${formData.name}이가 건강하게 태어나 행복한 삶을 살게 하소서. 착한 마음씨와 좋은 성품으로 많은 사람에게 사랑받게 하소서.`;
    }

    return prayer;
  };

  const taegyoRecommendations = getTaegyoRecommendations();
  const taedamGuide = getTaedamGuide();
  const prayerGuide = getPrayerGuide();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            태교 가이드
          </h2>
          <p className="text-slate-400 text-sm">태몽 기반 맞춤 태교법</p>
        </div>
      </div>

      {/* 태교 방법 추천 */}
      <motion.div className="mb-10" variants={itemVariants}>
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Flower2 className="w-6 h-6 text-purple-400" />
          추천 태교 방법
        </h3>
        <div className="space-y-6">
          {taegyoRecommendations.map((rec, index) => (
            <div key={rec.title} className="glass rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-5xl">{rec.icon}</span>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2">{rec.title}</h4>
                  <p className="text-purple-400 text-sm mb-4">{rec.reason}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {rec.activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-slate-800/50 rounded-lg p-3"
                  >
                    <span className="text-purple-400 mt-1">✓</span>
                    <span className="text-slate-300 text-sm">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 태담 가이드 */}
      <motion.div className="mb-10" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-6 h-6 text-pink-400" />
          <h3 className="text-xl font-bold text-white">태담 가이드</h3>
        </div>
        <div className="glass rounded-2xl p-6">
          <p className="text-slate-300 mb-4">
            태담은 태아와의 소통입니다. 매일 아기에게 사랑을 담아 이야기해주세요.
          </p>
          <div className="mb-4">
            <h4 className="text-pink-400 font-semibold mb-3">
              주제: {taedamGuide.theme}
            </h4>
            <div className="space-y-3">
              {taedamGuide.examples.map((example, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-4 border-l-4 border-pink-500"
                >
                  <p className="text-slate-200 italic">&ldquo;{example}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">💡 태담 팁</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• 아침에 일어나서 &ldquo;좋은 아침&rdquo; 인사하기</li>
              <li>• 식사할 때 &ldquo;맛있게 먹자&rdquo; 이야기하기</li>
              <li>• 잠들기 전 &ldquo;사랑해&rdquo; 말해주기</li>
              <li>• 태동을 느낄 때마다 대화하기</li>
              <li>• 아빠도 함께 태담에 참여하기</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* 음악 태교 곡 추천 */}
      <motion.div className="mb-10" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Music className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">추천 태교 음악</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-5">
            <h4 className="text-blue-400 font-semibold mb-3">클래식</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• 모차르트 - 아이네 클라이네 나흐트무지크</li>
              <li>• 비발디 - 사계 중 봄</li>
              <li>• 바흐 - G선상의 아리아</li>
              <li>• 드뷔시 - 달빛</li>
            </ul>
          </div>
          <div className="glass rounded-xl p-5">
            <h4 className="text-blue-400 font-semibold mb-3">자연의 소리</h4>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li>• 새소리와 물소리</li>
              <li>• 파도 소리</li>
              <li>• 빗소리</li>
              <li>• 바람 소리</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* 태교 기도문 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">🙏</span>
            태교 기도문
          </h3>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <p className="text-slate-200 leading-relaxed text-center italic">
              {prayerGuide}
            </p>
          </div>
          <p className="text-slate-400 text-sm text-center mt-4">
            * 매일 아침저녁으로 조용히 기도하며 아기의 평안을 빌어주세요
          </p>
        </div>
      </motion.div>

      {/* 태교 시 주의사항 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            태교 시 주의사항
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                <span>✅</span> 해야 할 것
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• 긍정적인 생각과 말</li>
                <li>• 규칙적인 생활 습관</li>
                <li>• 충분한 휴식과 수면</li>
                <li>• 영양가 있는 식사</li>
                <li>• 아빠와 함께하는 태교</li>
              </ul>
            </div>
            <div>
              <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <span>❌</span> 피해야 할 것
              </h4>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• 스트레스와 부정적 감정</li>
                <li>• 과도한 운동이나 활동</li>
                <li>• 시끄럽고 자극적인 환경</li>
                <li>• 불규칙한 생활 패턴</li>
                <li>• 유해한 음식과 물질</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 월별 태교 가이드 */}
      <motion.div variants={itemVariants}>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">📅</span>
            임신 시기별 태교
          </h3>
          <div className="space-y-3">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-1">초기 (1-3개월)</h4>
              <p className="text-slate-300 text-sm">
                엄마의 안정이 최우선. 편안한 음악을 듣고 긍정적인 생각을 하세요.
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-1">중기 (4-7개월)</h4>
              <p className="text-slate-300 text-sm">
                태동을 느끼며 본격적인 태담 시작. 책을 읽어주고 음악을 들려주세요.
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-1">후기 (8-10개월)</h4>
              <p className="text-slate-300 text-sm">
                출산 준비와 함께 아기에게 만날 날을 기대한다고 이야기해주세요.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 마무리 메시지 */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">💝</span>
          가장 중요한 태교
        </h3>
        <p className="text-slate-200 leading-relaxed">
          모든 태교법보다 중요한 것은 <strong className="text-purple-400">부모의 사랑</strong>
          입니다. {formData.name}이를 사랑하는 마음으로 매일 대화하고, 건강한 생활을 하며, 행복한
          생각을 하세요. 엄마 아빠의 사랑이 가장 좋은 태교입니다. 태몽이 예고하는 대로 {formData.name}
          이는 건강하고 행복한 아이로 자랄 것입니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
