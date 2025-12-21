'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Heart, Sparkles, Home, Palette } from 'lucide-react';

interface EmotionHealingProps {
  result: SajuResult;
  name: string;
  emotionType: string;
}

export default function EmotionHealing({
  result,
  name,
  emotionType,
}: EmotionHealingProps) {
  // 맞춤 명상법
  const getCustomMeditation = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const dayElement = result.day.stem.element;
    const { yang, yin } = result.yinYangBalance;

    const meditations = [];

    if (dayElement === '목' || 목 >= 2) {
      meditations.push({
        title: '성장 명상',
        description: '자신의 성장을 시각화하며 희망을 키웁니다',
        practice: [
          '편안히 앉아 눈을 감습니다',
          '작은 씨앗에서 큰 나무로 자라는 과정을 상상합니다',
          '당신도 씨앗처럼 무한한 가능성을 품고 있음을 느낍니다',
          '천천히 성장하는 자신의 모습을 긍정적으로 받아들입니다',
        ],
        duration: '10-15분',
        color: 'text-green-400',
      });
    }

    if (dayElement === '화' || 화 >= 2) {
      meditations.push({
        title: '촛불 명상',
        description: '촛불을 응시하며 내면의 열정을 정화합니다',
        practice: [
          '촛불을 켜고 편안히 앉습니다',
          '흔들리는 불꽃을 바라보며 호흡합니다',
          '불꽃처럼 밝게 타오르는 당신의 열정을 느낍니다',
          '부정적 에너지가 불꽃으로 정화되는 것을 상상합니다',
        ],
        duration: '5-10분',
        color: 'text-red-400',
      });
    }

    if (dayElement === '토' || 토 >= 2) {
      meditations.push({
        title: '대지 명상',
        description: '땅과 연결되어 안정감을 회복합니다',
        practice: [
          '맨발로 땅을 밟거나 앉은 자세에서 시작합니다',
          '뿌리가 땅속 깊이 내려가는 것을 상상합니다',
          '대지의 든든한 지지를 몸 전체로 느낍니다',
          '안정되고 중심잡힌 자신을 확인합니다',
        ],
        duration: '10-20분',
        color: 'text-yellow-400',
      });
    }

    if (dayElement === '금' || 금 >= 2) {
      meditations.push({
        title: '호흡 관찰 명상',
        description: '정밀하게 호흡을 관찰하며 마음을 가다듬습니다',
        practice: [
          '편안한 자세로 앉아 등을 곧게 펍니다',
          '코로 들어오고 나가는 숨을 정밀하게 관찰합니다',
          '호흡의 시작, 중간, 끝을 세밀하게 느낍니다',
          '잡념이 일어나면 판단없이 호흡으로 돌아옵니다',
        ],
        duration: '15-30분',
        color: 'text-slate-300',
      });
    }

    if (dayElement === '수' || 수 >= 2) {
      meditations.push({
        title: '물 흐름 명상',
        description: '물처럼 유연하게 흐르며 감정을 정화합니다',
        practice: [
          '물소리를 듣거나 상상합니다 (강, 바다, 빗소리)',
          '감정이 물처럼 자연스럽게 흐르도록 허용합니다',
          '막힌 감정이 흐르는 물에 씻겨 정화되는 것을 느낍니다',
          '모든 것이 흘러가고 변화함을 받아들입니다',
        ],
        duration: '10-20분',
        color: 'text-blue-400',
      });
    }

    // 음양 기반 명상
    if (yang > yin * 1.5) {
      meditations.push({
        title: '정적 명상 (음 보충)',
        description: '고요함 속에서 내면을 채웁니다',
        practice: [
          '조용한 공간에서 움직임을 멈춥니다',
          '외부 소음에서 점차 내면으로 의식을 이동합니다',
          '고요함 그 자체가 되어 봅니다',
          '내면의 고요한 중심을 발견합니다',
        ],
        duration: '15-25분',
        color: 'text-indigo-400',
      });
    } else if (yin > yang * 1.5) {
      meditations.push({
        title: '동적 명상 (양 활성화)',
        description: '움직임으로 에너지를 활성화합니다',
        practice: [
          '가벼운 스트레칭이나 요가로 시작합니다',
          '춤추듯 자유롭게 몸을 움직입니다',
          '움직임 속에서 현재 순간에 깨어있습니다',
          '활력이 온몸에 퍼지는 것을 느낍니다',
        ],
        duration: '20-30분',
        color: 'text-orange-400',
      });
    }

    return meditations.slice(0, 3);
  };

  // 맞춤 운동법
  const getCustomExercise = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { yang, yin } = result.yinYangBalance;

    const exercises = [];

    if (목 >= 2) {
      exercises.push({ name: '요가 (성장과 유연성)', benefit: '몸과 마음의 성장', icon: '🧘' });
      exercises.push({ name: '등산/트레킹 (자연 연결)', benefit: '자연 에너지 충전', icon: '⛰️' });
    }

    if (화 >= 2) {
      exercises.push({ name: '달리기/조깅', benefit: '과도한 에너지 발산', icon: '🏃' });
      exercises.push({ name: '에어로빅/댄스', benefit: '열정 표현', icon: '💃' });
    }

    if (토 >= 2) {
      exercises.push({ name: '걷기 (편안한 속도)', benefit: '안정감 유지', icon: '🚶' });
      exercises.push({ name: '가드닝 (정원 가꾸기)', benefit: '땅과 연결', icon: '🌿' });
    }

    if (금 >= 2) {
      exercises.push({ name: '필라테스 (정밀 운동)', benefit: '신체 조율', icon: '🤸' });
      exercises.push({ name: '무술 (태권도, 검도)', benefit: '절제된 힘', icon: '🥋' });
    }

    if (수 >= 2) {
      exercises.push({ name: '수영', benefit: '감정 정화', icon: '🏊' });
      exercises.push({ name: '태극권 (유연한 움직임)', benefit: '유연성 증진', icon: '🌊' });
    }

    if (yang > yin) {
      exercises.push({ name: '격렬한 운동 (복싱, 크로스핏)', benefit: '양 에너지 발산', icon: '🥊' });
    } else {
      exercises.push({ name: '스트레칭/명상 요가', benefit: '음 에너지 함양', icon: '🧘‍♀️' });
    }

    return exercises.slice(0, 6);
  };

  // 힐링 음식
  const getHealingFoods = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;

    const foods = {
      목: { items: ['녹색 채소', '새싹', '허브티', '신맛 과일'], color: 'text-green-400' },
      화: { items: ['붉은 과일', '쓴맛 채소', '따뜻한 차', '견과류'], color: 'text-red-400' },
      토: { items: ['곡물', '단맛 음식', '뿌리 채소', '호박'], color: 'text-yellow-400' },
      금: { items: ['백색 음식', '매운맛', '무', '배'], color: 'text-slate-300' },
      수: { items: ['해조류', '검은콩', '짠맛 음식', '물'], color: 'text-blue-400' },
    };

    const needed = [];
    if (목 <= 1) needed.push({ element: '목', ...foods.목 });
    if (화 <= 1) needed.push({ element: '화', ...foods.화 });
    if (토 <= 1) needed.push({ element: '토', ...foods.토 });
    if (금 <= 1) needed.push({ element: '금', ...foods.금 });
    if (수 <= 1) needed.push({ element: '수', ...foods.수 });

    return needed.slice(0, 3);
  };

  // 힐링 컬러
  const getHealingColors = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;

    const colors = [];

    if (목 <= 1) colors.push({ color: '초록색', use: '의류, 소품, 인테리어', effect: '성장과 희망 에너지', hex: '#10b981' });
    if (화 <= 1) colors.push({ color: '빨간색/주황색', use: '악센트 소품', effect: '활력과 열정', hex: '#ef4444' });
    if (토 <= 1) colors.push({ color: '노란색/베이지', use: '침실, 거실', effect: '안정과 편안함', hex: '#eab308' });
    if (금 <= 1) colors.push({ color: '흰색/회색', use: '작업 공간', effect: '정리와 집중', hex: '#94a3b8' });
    if (수 <= 1) colors.push({ color: '파란색/검은색', use: '명상 공간', effect: '지혜와 평온', hex: '#3b82f6' });

    return colors.slice(0, 4);
  };

  // 힐링 공간
  const getHealingSpaces = () => {
    const { 목, 화, 토, 금, 수 } = result.elements;
    const { yang, yin } = result.yinYangBalance;

    const spaces = [];

    if (목 >= 2 || 목 === 0) {
      spaces.push({
        space: '자연 공간',
        description: '공원, 숲, 정원',
        activity: '산책, 피크닉, 자연 관찰',
        icon: '🌳',
      });
    }

    if (화 >= 2 || 화 === 0) {
      spaces.push({
        space: '활기찬 공간',
        description: '카페, 갤러리, 공연장',
        activity: '문화 생활, 사람들과 교류',
        icon: '☕',
      });
    }

    if (토 >= 2 || 토 === 0) {
      spaces.push({
        space: '안정 공간',
        description: '집, 조용한 카페, 도서관',
        activity: '휴식, 독서, 명상',
        icon: '🏠',
      });
    }

    if (수 >= 2 || 수 === 0) {
      spaces.push({
        space: '물가',
        description: '바다, 강, 호수, 분수',
        activity: '물 보기, 물소리 듣기',
        icon: '🌊',
      });
    }

    if (yin > yang) {
      spaces.push({
        space: '조용한 개인 공간',
        description: '개인 방, 명상실, 조용한 장소',
        activity: '혼자만의 시간, 내면 성찰',
        icon: '🕯️',
      });
    } else {
      spaces.push({
        space: '사교 공간',
        description: '모임 장소, 커뮤니티 센터',
        activity: '친구 만남, 그룹 활동',
        icon: '👥',
      });
    }

    return spaces.slice(0, 5);
  };

  const meditations = getCustomMeditation();
  const exercises = getCustomExercise();
  const foods = getHealingFoods();
  const colors = getHealingColors();
  const spaces = getHealingSpaces();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <Heart className="w-8 h-8 text-pink-400" />
        맞춤 힐링 가이드
      </h2>

      {/* 맞춤 명상법 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-purple-400 mb-5 flex items-center gap-2">
          🧘 맞춤 명상법
        </h3>
        <div className="space-y-4">
          {meditations.map((meditation, index) => (
            <motion.div
              key={meditation.title}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className={`font-bold text-lg ${meditation.color}`}>{meditation.title}</h4>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                  {meditation.duration}
                </span>
              </div>
              <p className="text-sm text-slate-300 mb-4">{meditation.description}</p>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <div className="text-sm font-semibold text-cyan-400 mb-3">실천 방법:</div>
                <ol className="space-y-2">
                  {meditation.practice.map((step, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex gap-2">
                      <span className="text-purple-400 font-semibold">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 맞춤 운동법 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-cyan-400 mb-5 flex items-center gap-2">
          💪 추천 운동
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.name}
              className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{exercise.icon}</span>
                <h4 className="font-bold text-white">{exercise.name}</h4>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <span className="text-emerald-400 text-sm font-semibold">효과: </span>
                <span className="text-slate-300 text-sm">{exercise.benefit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 힐링 음식 */}
      {foods.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-bold text-amber-400 mb-5 flex items-center gap-2">
            🍎 에너지 보충 음식
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {foods.map((food, index) => (
              <motion.div
                key={food.element}
                className="glass rounded-2xl p-5"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className={`font-bold ${food.color} mb-3`}>{food.element}(元) 보충</h4>
                <div className="flex flex-wrap gap-2">
                  {food.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-800/50 rounded-full text-sm text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 힐링 컬러 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-pink-400 mb-5 flex items-center gap-2">
          <Palette className="w-6 h-6" />
          힐링 컬러 테라피
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {colors.map((item, index) => (
            <motion.div
              key={item.color}
              className="glass rounded-2xl p-5 hover:bg-slate-800/60 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full border-2 border-white/20"
                  style={{ backgroundColor: item.hex }}
                />
                <h4 className="font-bold text-white">{item.color}</h4>
              </div>
              <div className="text-sm text-slate-300 mb-2">
                <strong className="text-pink-400">활용:</strong> {item.use}
              </div>
              <div className="text-sm text-slate-300">
                <strong className="text-purple-400">효과:</strong> {item.effect}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 힐링 공간 */}
      <div>
        <h3 className="text-xl font-bold text-emerald-400 mb-5 flex items-center gap-2">
          <Home className="w-6 h-6" />
          힐링 공간 추천
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spaces.map((item, index) => (
            <motion.div
              key={item.space}
              className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl mb-3 text-center">{item.icon}</div>
              <h4 className="font-bold text-emerald-400 text-center mb-2">{item.space}</h4>
              <p className="text-sm text-slate-300 text-center mb-2">{item.description}</p>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-xs text-cyan-400 font-semibold text-center">{item.activity}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 종합 힐링 루틴 */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl p-6 border border-pink-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-pink-400 mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          일일 힐링 루틴 제안
        </h4>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex gap-3">
            <span className="font-bold text-orange-400 min-w-[60px]">아침</span>
            <span>명상 5분 + 가벼운 스트레칭 + 힐링 컬러 의류 선택</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-yellow-400 min-w-[60px]">오전</span>
            <span>햇빛 쬐기 + 에너지 보충 음식 섭취</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-green-400 min-w-[60px]">점심</span>
            <span>오행 균형 식사 + 짧은 산책</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-cyan-400 min-w-[60px]">오후</span>
            <span>추천 운동 30분 + 수분 보충</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-blue-400 min-w-[60px]">저녁</span>
            <span>힐링 공간에서 휴식 + 감정 일기</span>
          </div>
          <div className="flex gap-3">
            <span className="font-bold text-purple-400 min-w-[60px]">밤</span>
            <span>명상 10분 + 따뜻한 차 + 충분한 수면</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-pink-500/20 text-xs text-slate-400 text-center">
          💝 자신을 사랑하고 돌보는 시간을 매일 가지세요. {name}님의 마음 건강이 가장 중요합니다.
        </div>
      </motion.div>
    </motion.div>
  );
}
