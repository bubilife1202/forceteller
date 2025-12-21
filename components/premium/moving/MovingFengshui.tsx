'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Home, Sparkles, Shield, Zap } from 'lucide-react';

interface MovingFengshuiProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

interface FengshuiAdvice {
  element: string;
  emoji: string;
  color: string;
  mainAdvice: string;
  materials: string[];
  plants: string[];
  layout: string[];
  avoid: string[];
}

export default function MovingFengshui({ result, name }: MovingFengshuiProps) {
  const dayElement = result.day.stem.element;

  // 오행별 풍수 인테리어 조언
  const getFengshuiAdvice = () => {
    const advice: Record<string, FengshuiAdvice> = {
      '목': {
        element: '목 (木)',
        emoji: '🌳',
        color: 'from-green-500 to-emerald-600',
        mainAdvice: '자연 소재와 식물을 활용하여 생명력 넘치는 공간을 만드세요',
        materials: ['원목 가구', '대나무 소품', '라탄 제품', '천연 섬유 (린넨, 면)'],
        plants: ['공기정화 식물 (산세베리아, 스킨답서스)', '행운목', '금전수', '몬스테라'],
        layout: [
          '동쪽에 큰 창문 배치 (아침 햇살)',
          '거실에 큰 식물 배치',
          '원목 테이블을 중심으로 가구 배치',
          '세로형 장식과 가구 선호',
        ],
        avoid: ['금속 재질 과다', '날카로운 모서리', '지나친 화이트톤'],
      },
      '화': {
        element: '화 (火)',
        emoji: '🔥',
        color: 'from-red-500 to-orange-600',
        mainAdvice: '밝고 따뜻한 분위기로 활기찬 에너지를 높이세요',
        materials: ['가죽 소파', '따뜻한 목재', '벽난로 (장식용)', '천연 돌 액센트'],
        plants: ['선인장류', '다육 식물', '붉은 꽃 (장미, 동백)', '화려한 관엽'],
        layout: [
          '남쪽에 포인트 조명 설치',
          '거실 중앙에 모임 공간',
          '따뜻한 간접조명 활용',
          '삼각형, 뾰족한 장식 포인트',
        ],
        avoid: ['어둡고 차가운 색상', '과도한 수족관', '지나치게 블루/블랙 톤'],
      },
      '토': {
        element: '토 (土)',
        emoji: '🏔️',
        color: 'from-yellow-500 to-amber-600',
        mainAdvice: '안정감과 편안함을 주는 든든한 공간을 조성하세요',
        materials: ['타일 (자연석)', '대리석', '도자기 장식', '흙 벽돌'],
        plants: ['다육 식물', '선인장', '넓은 잎 식물', '분재'],
        layout: [
          '중앙에 넓은 공간 확보',
          '낮고 안정적인 가구 배치',
          '사각형 테이블과 소품',
          '모서리 공간 활용 (수납)',
        ],
        avoid: ['과도한 목재', '지나친 식물', '불안정한 높은 가구'],
      },
      '금': {
        element: '금 (金)',
        emoji: '⚪',
        color: 'from-slate-400 to-gray-500',
        mainAdvice: '깔끔하고 세련된 모던 스타일로 정돈된 공간을 만드세요',
        materials: ['금속 프레임', '유리 테이블', '대리석', '스틸 조명'],
        plants: ['화이트 계열 꽃', '은행나무 분재', '서양란', '백합'],
        layout: [
          '서쪽에 금속 장식 배치',
          '미니멀한 가구 배치',
          '원형, 둥근 형태 선호',
          '화이트/실버/골드 포인트',
        ],
        avoid: ['과도한 붉은색', '복잡한 패턴', '지나친 장식'],
      },
      '수': {
        element: '수 (水)',
        emoji: '💧',
        color: 'from-blue-500 to-cyan-600',
        mainAdvice: '유동적이고 편안한 흐름이 있는 공간을 디자인하세요',
        materials: ['유리 소재', '거울', '금속 (크롬, 실버)', '부드러운 패브릭'],
        plants: ['수경 재배 식물', '행운목 (물꽂이)', '스킨답서스', '개운죽'],
        layout: [
          '북쪽에 수족관이나 분수',
          '거울을 활용한 공간 확장',
          '물결 무늬, 유선형 디자인',
          '블루/블랙 포인트 컬러',
        ],
        avoid: ['과도한 토(흙) 요소', '답답한 배치', '막힌 공간'],
      },
    };

    return advice[dayElement];
  };

  const fengshuiAdvice = getFengshuiAdvice();

  // 공간별 풍수 포인트
  const getRoomFengshui = () => {
    return [
      {
        room: '현관',
        icon: '🚪',
        color: 'from-purple-500 to-pink-600',
        tips: [
          '밝은 조명으로 기 유입',
          '거울은 문 정면 피하기',
          '신발장 깔끔히 정리',
          '생화나 그림으로 환영',
        ],
      },
      {
        room: '거실',
        icon: '🛋️',
        color: 'from-blue-500 to-cyan-600',
        tips: [
          '소파는 벽을 등지고 배치',
          '중앙 공간 확보',
          '가족 사진 남동쪽',
          '시계는 현관 반대편',
        ],
      },
      {
        room: '침실',
        icon: '🛏️',
        color: 'from-emerald-500 to-green-600',
        tips: [
          '침대 머리는 벽에 붙임',
          '침대 정면에 거울 금지',
          '어두운 커튼으로 안정',
          '전자기기 최소화',
        ],
      },
      {
        room: '주방',
        icon: '🍳',
        color: 'from-orange-500 to-red-600',
        tips: [
          '가스레인지-싱크대 분리',
          '깨끗하게 청결 유지',
          '칼은 보이지 않게 수납',
          '환기 철저히',
        ],
      },
      {
        room: '화장실',
        icon: '🚽',
        color: 'from-slate-500 to-gray-600',
        tips: [
          '문 항상 닫아두기',
          '변기 뚜껑 닫기',
          '환기와 제습 철저',
          '밝은 조명 설치',
        ],
      },
      {
        room: '서재/공부방',
        icon: '📚',
        color: 'from-indigo-500 to-purple-600',
        tips: [
          '책상은 문 보는 방향',
          '뒤에 벽이나 책장',
          '조용한 공간 선정',
          '푸른 계열 소품',
        ],
      },
    ];
  };

  const roomFengshui = getRoomFengshui();

  // 풍수 금기 사항
  const getFengshuiTaboos = () => {
    return [
      {
        taboo: '현관-화장실 일직선',
        problem: '재물이 바로 빠져나감',
        solution: '커튼이나 파티션으로 시선 차단',
      },
      {
        taboo: '침대-거울 마주봄',
        problem: '불면증과 악몽',
        solution: '거울 위치 변경 또는 커버',
      },
      {
        taboo: '현관 정면 창문',
        problem: '재물과 기운이 바로 빠져나감',
        solution: '커튼 설치, 화분 배치',
      },
      {
        taboo: '천장 보 아래 침대',
        problem: '압박감과 건강 악영향',
        solution: '침대 위치 이동',
      },
      {
        taboo: '칼 노출 보관',
        problem: '살기, 다툼 유발',
        solution: '서랍에 보관',
      },
      {
        taboo: '시계 현관 정면',
        problem: '시간이 밖으로 나감',
        solution: '측면이나 다른 벽에 배치',
      },
    ];
  };

  const fengshuiTaboos = getFengshuiTaboos();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-4 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        ✨ 풍수 인테리어 조언
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님의 오행에 맞는 인테리어 가이드
      </p>

      {/* 오행별 인테리어 조언 */}
      <div className="glass rounded-2xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30">
        <div className="text-center mb-6">
          <span className="text-6xl mb-3 block">{fengshuiAdvice.emoji}</span>
          <h3 className="text-2xl font-bold text-purple-400 mb-2">{fengshuiAdvice.element} 인테리어</h3>
          <p className="text-slate-300">{fengshuiAdvice.mainAdvice}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-cyan-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              추천 소재
            </h4>
            <ul className="space-y-2">
              {fengshuiAdvice.materials.map((material: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-emerald-400">•</span>
                  <span>{material}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
              <Home className="w-5 h-5" />
              추천 식물
            </h4>
            <ul className="space-y-2">
              {fengshuiAdvice.plants.map((plant: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400">•</span>
                  <span>{plant}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-800/50 rounded-xl">
          <h4 className="font-bold text-amber-400 mb-3">배치 가이드</h4>
          <ul className="grid md:grid-cols-2 gap-2">
            {fengshuiAdvice.layout.map((tip: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-amber-400">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <h4 className="font-bold text-red-400 mb-2">피해야 할 요소</h4>
          <ul className="space-y-1">
            {fengshuiAdvice.avoid.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-red-400">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 공간별 풍수 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6" />
          공간별 풍수 포인트
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomFengshui.map((room, index) => (
            <motion.div
              key={room.room}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${room.color} flex items-center justify-center text-2xl`}>
                  {room.icon}
                </div>
                <h4 className="font-bold text-white">{room.room}</h4>
              </div>
              <ul className="space-y-2">
                {room.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 text-xs mt-0.5">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 풍수 금기 사항 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6" />
          반드시 피해야 할 풍수 금기
        </h3>
        <div className="space-y-3">
          {fengshuiTaboos.map((item, index) => (
            <motion.div
              key={item.taboo}
              className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-400 font-bold">✗</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">{item.taboo}</h4>
                  <p className="text-sm text-red-400 mb-2">문제: {item.problem}</p>
                  <p className="text-sm text-emerald-400">해결: {item.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">풍수 활용 팁:</span> 풍수는 절대적 규칙이 아닌 가이드입니다.
            본인이 편안하고 행복한 공간이 가장 좋은 풍수입니다. 금기 사항은 피하되, 지나치게 집착하지 마세요.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
