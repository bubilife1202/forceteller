'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Brain, Wind, Heart, Sparkles, Moon, Sun } from 'lucide-react';

interface EmotionMeditationProps {
  result: SajuResult;
  name: string;
}

export default function EmotionMeditation({ result, name }: EmotionMeditationProps) {
  // 체질별 명상법 추천
  const getMeditationByElement = () => {
    const dayElement = result.day.stem.element;
    const { 목, 화, 토, 금, 수 } = result.elements;

    const meditations = [];

    // 일간별 맞춤 명상
    if (dayElement === '목') {
      meditations.push({
        title: '목(木) 체질 명상법',
        description: '성장과 확장의 에너지를 조화롭게',
        mainPractice: {
          name: '성장 명상 (Growth Meditation)',
          duration: '10-20분',
          steps: [
            '편안한 자세로 앉아 눈을 감습니다',
            '자신을 하나의 나무로 상상합니다',
            '뿌리가 땅 깊이 내려가는 것을 느낍니다',
            '줄기가 하늘을 향해 자라나는 것을 상상합니다',
            '가지가 사방으로 뻗어나가는 것을 느낍니다',
            '잎이 바람에 흔들리며 호흡하는 것을 관찰합니다',
            '성장하는 나무처럼 유연하고 강인함을 느낍니다'
          ],
          benefits: '유연성 증가, 성장 마인드, 스트레스 해소'
        },
        breathWork: {
          name: '확장 호흡법',
          technique: '4초 들이쉬고 - 4초 멈춤 - 6초 내쉬기',
          visualization: '들숨에 생명력이 온몸으로 퍼지는 것을 느끼기'
        },
        color: 'text-green-400',
        icon: '🌳'
      });
    } else if (dayElement === '화') {
      meditations.push({
        title: '화(火) 체질 명상법',
        description: '열정의 불을 지혜롭게 다루기',
        mainPractice: {
          name: '불꽃 명상 (Fire Meditation)',
          duration: '10-15분',
          steps: [
            '편안하게 앉아 척추를 곧게 펴줍니다',
            '심장 부위에 따뜻한 불꽃을 상상합니다',
            '불꽃이 타오르고 꺼지는 것을 관찰합니다',
            '강렬한 감정을 불꽃에 태워 정화합니다',
            '불꽃이 안정되고 고요해지는 것을 느낍니다',
            '따뜻하지만 격렬하지 않은 평온함을 경험합니다',
            '온몸에 따뜻한 에너지가 고루 퍼지는 것을 느낍니다'
          ],
          benefits: '감정 조절, 과도한 에너지 안정화, 내면 평화'
        },
        breathWork: {
          name: '식히는 호흡법',
          technique: '천천히 들이쉬고 - 길게 내쉬기 (1:2 비율)',
          visualization: '내쉴 때 과도한 열기가 빠져나가는 것을 상상'
        },
        color: 'text-red-400',
        icon: '🔥'
      });
    } else if (dayElement === '토') {
      meditations.push({
        title: '토(土) 체질 명상법',
        description: '대지의 안정과 포용',
        mainPractice: {
          name: '대지 명상 (Earth Meditation)',
          duration: '15-30분',
          steps: [
            '편안하게 앉거나 누워 몸의 무게를 느낍니다',
            '몸이 대지에 뿌리내리는 것을 상상합니다',
            '중력에 온전히 몸을 맡깁니다',
            '몸의 각 부분이 땅과 연결되는 것을 느낍니다',
            '대지의 안정되고 변함없는 에너지를 받아들입니다',
            '모든 것을 포용하는 대지처럼 자신을 받아들입니다',
            '안정감과 평온함 속에서 쉽니다'
          ],
          benefits: '정서적 안정, 불안 감소, 깊은 이완'
        },
        breathWork: {
          name: '안정 호흡법',
          technique: '균일하게 들이쉬고 내쉬기 (1:1 비율, 각 4-6초)',
          visualization: '호흡이 대지와 하나되는 느낌'
        },
        color: 'text-yellow-400',
        icon: '⛰️'
      });
    } else if (dayElement === '금') {
      meditations.push({
        title: '금(金) 체질 명상법',
        description: '정제와 순수함의 명상',
        mainPractice: {
          name: '정화 명상 (Purification Meditation)',
          duration: '10-20분',
          steps: [
            '바른 자세로 앉아 척추를 곧게 펴줍니다',
            '온몸을 스캔하며 긴장을 찾아냅니다',
            '들숨에 맑고 깨끗한 공기를 들이마십니다',
            '날숨에 불순물과 긴장을 내보냅니다',
            '점점 더 맑고 순수해지는 것을 느낍니다',
            '완벽을 추구하지 않고 있는 그대로를 받아들입니다',
            '본질만 남은 고요함 속에서 쉽니다'
          ],
          benefits: '마음의 정돈, 완벽주의 내려놓기, 명료함'
        },
        breathWork: {
          name: '정제 호흡법',
          technique: '4초 들이쉬고 - 7초 멈춤 - 8초 내쉬기',
          visualization: '숨을 멈출 때 정화되는 느낌'
        },
        color: 'text-slate-300',
        icon: '⚙️'
      });
    } else if (dayElement === '수') {
      meditations.push({
        title: '수(水) 체질 명상법',
        description: '흐르는 물처럼 유연하게',
        mainPractice: {
          name: '흐름 명상 (Flow Meditation)',
          duration: '15-25분',
          steps: [
            '편안한 자세로 호흡에 주의를 기울입니다',
            '호흡이 파도처럼 밀려왔다 나가는 것을 관찰합니다',
            '생각을 물에 띄운 배로 상상합니다',
            '생각이 흘러가는 것을 판단 없이 지켜봅니다',
            '저항하지 않고 모든 것이 흘러가게 둡니다',
            '물처럼 유연하고 적응하는 자신을 느낍니다',
            '고요한 물 밑의 깊은 평온함을 경험합니다'
          ],
          benefits: '유연성, 집착 내려놓기, 깊은 평온'
        },
        breathWork: {
          name: '파도 호흡법',
          technique: '자연스럽게 들숨과 날숨이 이어지게 (파도처럼)',
          visualization: '호흡이 몸 안을 흐르는 물결'
        },
        color: 'text-blue-400',
        icon: '💧'
      });
    }

    return meditations;
  };

  // 상황별 명상법
  const getSituationalMeditation = () => {
    return [
      {
        situation: '불안하고 초조할 때',
        technique: '5-4-3-2-1 그라운딩',
        steps: [
          '눈으로 볼 수 있는 것 5가지 찾기',
          '몸으로 느낄 수 있는 것 4가지 찾기',
          '귀로 들을 수 있는 것 3가지 찾기',
          '코로 맡을 수 있는 것 2가지 찾기',
          '입으로 맛볼 수 있는 것 1가지 찾기'
        ],
        duration: '5분',
        color: 'text-orange-400'
      },
      {
        situation: '분노가 치밀 때',
        technique: '감정 관찰 명상',
        steps: [
          '안전한 곳에서 멈추고 눈을 감습니다',
          '몸 어디에서 분노를 느끼는지 찾습니다',
          '그 감각을 판단 없이 관찰합니다',
          '분노에 색깔이나 모양을 부여합니다',
          '깊은 호흡과 함께 그것이 작아지는 것을 상상합니다',
          '분노 뒤에 숨은 진짜 욕구를 찾아봅니다'
        ],
        duration: '10분',
        color: 'text-red-400'
      },
      {
        situation: '슬프고 우울할 때',
        technique: '자기 자비 명상',
        steps: [
          '양손을 가슴에 올리고 따뜻함을 느낍니다',
          '"지금 이 순간 힘들구나" 인정합니다',
          '"나만 힘든 게 아니야" 공통된 인간성을 떠올립니다',
          '"나 스스로에게 친절하고 싶어" 다짐합니다',
          '친한 친구에게 하듯 자신을 위로합니다',
          '따뜻한 빛이 몸을 감싸는 것을 상상합니다'
        ],
        duration: '10-15분',
        color: 'text-blue-400'
      },
      {
        situation: '잠이 안 올 때',
        technique: '바디 스캔 명상',
        steps: [
          '편안하게 누워 눈을 감습니다',
          '발끝부터 천천히 주의를 옮겨갑니다',
          '각 부위의 긴장을 알아차립니다',
          '날숨에 긴장을 내보냅니다',
          '머리끝까지 스캔이 끝나면 다시 반복합니다',
          '중간에 잠들어도 괜찮습니다'
        ],
        duration: '20-30분',
        color: 'text-purple-400'
      },
      {
        situation: '집중이 안 될 때',
        technique: '호흡 집중 명상',
        steps: [
          '편안하게 앉아 눈을 감습니다',
          '코끝이나 배에서 호흡을 느낍니다',
          '들숨과 날숨을 하나씩 세어갑니다',
          '10까지 세면 다시 1부터 시작합니다',
          '주의가 흩어지면 판단 없이 다시 호흡으로',
          '5-10분 연습합니다'
        ],
        duration: '5-10분',
        color: 'text-green-400'
      },
      {
        situation: '스트레스가 심할 때',
        technique: '긴장 이완 명상',
        steps: [
          '편안하게 앉거나 눕습니다',
          '발부터 시작해 온 힘을 주어 긴장시킵니다 (5초)',
          '한 번에 모든 긴장을 풀어줍니다',
          '이완된 느낌을 충분히 느낍니다 (10초)',
          '다리, 배, 가슴, 팔, 얼굴 순서로 반복합니다',
          '온몸이 이완되는 것을 느낍니다'
        ],
        duration: '10-15분',
        color: 'text-cyan-400'
      }
    ];
  };

  // 호흡법 가이드
  const getBreathingTechniques = () => {
    return [
      {
        name: '4-7-8 호흡법',
        purpose: '불안 감소, 수면 유도',
        method: '4초 들이쉬고, 7초 멈추고, 8초 내쉬기',
        when: '잠들기 전, 불안할 때',
        repetitions: '4회 반복',
        tips: '혀 끝을 윗니 뒤에 대고 연습하면 효과적',
        color: 'text-purple-400'
      },
      {
        name: '박스 호흡법 (Box Breathing)',
        purpose: '스트레스 관리, 집중력 향상',
        method: '4초 들이쉬고, 4초 멈추고, 4초 내쉬고, 4초 멈추기',
        when: '업무 중, 긴장된 상황',
        repetitions: '5-10회 반복',
        tips: '정사각형을 그리며 각 변에서 각 단계 수행',
        color: 'text-blue-400'
      },
      {
        name: '복식 호흡',
        purpose: '이완, 부교감 신경 활성화',
        method: '배를 부풀리며 천천히 깊게 들이쉬고, 배를 집어넣으며 천천히 내쉬기',
        when: '아침 기상 후, 휴식 시간',
        repetitions: '10회 이상',
        tips: '손을 배에 올려 배의 움직임을 느끼기',
        color: 'text-green-400'
      },
      {
        name: '교호 호흡법 (Alternate Nostril)',
        purpose: '좌우뇌 균형, 마음 안정',
        method: '오른쪽 콧구멍으로 들이쉬고, 왼쪽으로 내쉬기. 반대로도 반복',
        when: '명상 전, 정서적 균형 필요시',
        repetitions: '5-10회 왕복',
        tips: '엄지와 약지로 콧구멍을 번갈아 막기',
        color: 'text-cyan-400'
      },
      {
        name: '비율 호흡법 (2:1)',
        purpose: '진정, 긴장 완화',
        method: '들숨보다 날숨을 2배 길게 (예: 4초 들이쉬고 8초 내쉬기)',
        when: '긴장 해소, 이완 필요시',
        repetitions: '10회 이상',
        tips: '날숨을 최대한 천천히, 부드럽게',
        color: 'text-yellow-400'
      },
      {
        name: '활력 호흡법 (Kapalabhati)',
        purpose: '에너지 충전, 정신 각성',
        method: '빠르고 강하게 날숨, 자연스럽게 들숨 (1초당 2-3회)',
        when: '아침, 에너지 필요시',
        repetitions: '30-60회',
        tips: '배를 강하게 집어넣으며 날숨. 주의: 고혈압 시 피할 것',
        color: 'text-orange-400'
      }
    ];
  };

  // 마음챙김 일상 실천
  const getMindfulnessPractices = () => {
    return {
      daily: [
        {
          activity: '마음챙김 식사',
          description: '식사할 때 음식의 색, 향, 맛, 질감에 온전히 집중하기',
          time: '매 식사마다',
          benefits: '소화 개선, 과식 방지, 감사 증가'
        },
        {
          activity: '마음챙김 걷기',
          description: '걸을 때 발바닥의 감각, 다리의 움직임, 주변 소리에 주의 기울이기',
          time: '하루 10분',
          benefits: '스트레스 감소, 현존 능력 향상'
        },
        {
          activity: '마음챙김 듣기',
          description: '대화 시 상대방 말에 온전히 집중, 판단이나 반응 준비 없이 듣기',
          time: '대화할 때마다',
          benefits: '관계 개선, 공감 능력 향상'
        },
        {
          activity: '마음챙김 휴식',
          description: '휴식 시간에 핸드폰 내려놓고 온전히 쉬기, 주변 감각 느끼기',
          time: '휴식 시간',
          benefits: '진정한 휴식, 에너지 회복'
        }
      ],
      micro: [
        '하루 3번, 1분씩 멈추고 호흡 관찰하기',
        '신호 대기 시간에 깊은 호흡 3회',
        '엘리베이터에서 발의 감각 느끼기',
        '손 씻을 때 물의 온도와 촉감에 집중',
        '문 열 때마다 현재 순간으로 돌아오기',
        '컴퓨터 켤 때 의도 설정하기'
      ]
    };
  };

  // 명상 루틴 만들기
  const getMeditationRoutine = () => {
    return {
      beginner: {
        level: '입문 (1-2주차)',
        morning: '5분 호흡 관찰',
        evening: '5분 감사 명상',
        tips: [
          '같은 시간, 같은 장소에서',
          '완벽을 기대하지 말기',
          '하루 건너뛰어도 괜찮음',
          '짧아도 꾸준히가 중요'
        ]
      },
      intermediate: {
        level: '중급 (3-8주차)',
        morning: '10-15분 체질별 명상',
        lunch: '5분 마음챙김 휴식',
        evening: '10분 바디 스캔',
        tips: [
          '명상 일기 쓰기',
          '다양한 기법 시도',
          '일상에서 마음챙김 실천',
          '온라인 가이드 명상 활용'
        ]
      },
      advanced: {
        level: '고급 (2개월 이상)',
        morning: '20-30분 깊은 명상',
        during: '수시로 마음챙김',
        evening: '15-20분 명상',
        retreat: '월 1회 긴 명상 (1-2시간)',
        tips: [
          '명상 공동체 참여',
          '리트릿이나 워크샵',
          '다른 사람 가르쳐보기',
          '삶 전체가 명상이 되도록'
        ]
      }
    };
  };

  // 명상 환경 만들기
  const getMeditationEnvironment = () => {
    return {
      space: [
        '조용하고 방해받지 않을 장소',
        '편안한 온도 (20-24도)',
        '부드러운 조명 (자연광이나 은은한 빛)',
        '정돈되고 깨끗한 공간',
        '편안한 쿠션이나 의자'
      ],
      atmosphere: [
        '향초나 인센스 (선택사항)',
        '부드러운 배경음악 (선택사항)',
        '식물이나 자연 요소',
        '명상 타이머나 앱',
        '담요 (추울 경우)'
      ],
      preparation: [
        '핸드폰은 무음이나 비행기 모드',
        '화장실 미리 다녀오기',
        '편안한 옷 입기',
        '배가 너무 차거나 고프지 않게',
        '가벼운 스트레칭으로 몸 풀기'
      ]
    };
  };

  // 명상 시 주의사항
  const getMeditationCautions = () => {
    return {
      common: [
        {
          issue: '졸음이 쏟아질 때',
          solution: '눈을 살짝 뜨거나, 자세를 바르게 하거나, 서서 명상하기'
        },
        {
          issue: '잡념이 계속될 때',
          solution: '잡념을 판단하지 말고 인정하고 다시 호흡으로 돌아오기'
        },
        {
          issue: '불편한 감정이 올라올 때',
          solution: '감정을 느끼되 휩쓸리지 않기. 너무 힘들면 눈 뜨고 그라운딩'
        },
        {
          issue: '몸이 아프거나 불편할 때',
          solution: '자세를 조정하거나, 누워서 하거나, 의자에 앉기'
        },
        {
          issue: '진전이 없는 것 같을 때',
          solution: '기대를 내려놓기. 명상 자체가 목적이고 과정'
        }
      ],
      warnings: [
        '심한 정신질환이 있다면 전문가와 상담 후 시작',
        '트라우마가 있다면 전문가 지도하에 진행',
        '어지러움이나 과호흡 증상 시 즉시 중단',
        '명상이 치료를 대체할 수 없음 (보완적 도구)',
        '강제로 하지 말 것. 준비되었을 때 시작'
      ]
    };
  };

  const elementMeditations = getMeditationByElement();
  const situationalMeditations = getSituationalMeditation();
  const breathingTechniques = getBreathingTechniques();
  const mindfulnessPractices = getMindfulnessPractices();
  const meditationRoutine = getMeditationRoutine();
  const meditationEnvironment = getMeditationEnvironment();
  const meditationCautions = getMeditationCautions();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold mb-8 gradient-text flex items-center gap-3">
        <Brain className="w-8 h-8 text-purple-400" />
        명상 & 마음챙김 가이드
      </h2>

      {/* 체질별 맞춤 명상 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-cyan-400 mb-5 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          {name}님을 위한 맞춤 명상법
        </h3>
        {elementMeditations.map((meditation, index) => (
          <motion.div
            key={meditation.title}
            className="glass rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{meditation.icon}</span>
              <div>
                <h4 className={`font-bold text-xl ${meditation.color}`}>{meditation.title}</h4>
                <p className="text-sm text-slate-400">{meditation.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-bold text-emerald-400">{meditation.mainPractice.name}</h5>
                  <span className="text-xs text-slate-400">{meditation.mainPractice.duration}</span>
                </div>
                <div className="space-y-3 mb-4">
                  {meditation.mainPractice.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-cyan-400 font-bold mt-0.5">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <span className="text-purple-400 font-semibold text-xs">효과:</span>
                  <p className="text-slate-300 text-xs mt-1">{meditation.mainPractice.benefits}</p>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-5">
                <h5 className="font-bold text-blue-400 mb-3">{meditation.breathWork.name}</h5>
                <div className="mb-4">
                  <div className="text-sm font-semibold text-cyan-400 mb-2">호흡 방법:</div>
                  <p className="text-sm text-slate-300">{meditation.breathWork.technique}</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <div className="text-xs font-semibold text-purple-400 mb-1">시각화:</div>
                  <p className="text-slate-300 text-xs">{meditation.breathWork.visualization}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="text-xs text-slate-400">
                    💡 매일 아침 또는 저녁 같은 시간에 연습하면 효과적입니다
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 상황별 명상법 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-purple-400 mb-5 flex items-center gap-2">
          <Heart className="w-6 h-6" />
          상황별 즉시 명상법
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {situationalMeditations.map((meditation, index) => (
            <motion.div
              key={meditation.situation}
              className="glass rounded-2xl p-5 hover:scale-[1.02] transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-3">
                <h4 className={`font-bold ${meditation.color}`}>{meditation.situation}</h4>
                <div className="text-xs text-slate-400 mt-1">
                  {meditation.technique} · {meditation.duration}
                </div>
              </div>
              <div className="space-y-2">
                {meditation.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 font-bold mt-0.5 flex-shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 호흡법 가이드 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-blue-400 mb-5 flex items-center gap-2">
          <Wind className="w-6 h-6" />
          호흡법 마스터하기
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {breathingTechniques.map((technique, index) => (
            <motion.div
              key={technique.name}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className={`font-bold mb-2 ${technique.color}`}>{technique.name}</h4>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-slate-400">목적</div>
                  <div className="text-sm text-slate-300">{technique.purpose}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">방법</div>
                  <div className="text-sm font-semibold text-cyan-400">{technique.method}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">언제</div>
                  <div className="text-sm text-slate-300">{technique.when}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">반복</div>
                  <div className="text-sm text-emerald-400">{technique.repetitions}</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs font-semibold text-purple-400 mb-1">💡 팁:</div>
                  <div className="text-xs text-slate-300">{technique.tips}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 마음챙김 일상 실천 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-5">🌱 마음챙김 일상 실천</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {mindfulnessPractices.daily.map((practice, index) => (
            <motion.div
              key={practice.activity}
              className="glass rounded-2xl p-5"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-cyan-400 mb-2">{practice.activity}</h4>
              <p className="text-sm text-slate-300 mb-3">{practice.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400">시간:</span>
                  <span className="text-emerald-400 ml-1">{practice.time}</span>
                </div>
                <div>
                  <span className="text-slate-400">효과:</span>
                  <span className="text-purple-400 ml-1">{practice.benefits}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="glass rounded-2xl p-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h4 className="font-bold text-yellow-400 mb-3">⚡ 마이크로 명상 (1분 이하)</h4>
          <div className="grid md:grid-cols-2 gap-3">
            {mindfulnessPractices.micro.map((practice, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="text-green-400 mt-0.5">→</span>
                <span>{practice}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 명상 루틴 만들기 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-orange-400 mb-5 flex items-center gap-2">
          <Sun className="w-6 h-6" />
          단계별 명상 루틴
        </h3>
        <div className="space-y-4">
          {Object.entries(meditationRoutine).map(([key, routine], index) => {
            const colors = {
              beginner: 'text-green-400',
              intermediate: 'text-blue-400',
              advanced: 'text-purple-400'
            };
            return (
              <motion.div
                key={key}
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className={`font-bold text-lg mb-4 ${colors[key as keyof typeof colors]}`}>
                  {routine.level}
                </h4>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    {Object.entries(routine).filter(([k]) => !['level', 'tips'].includes(k)).map(([time, practice]) => (
                      <div key={time} className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-xs text-slate-400 capitalize">{time === 'during' ? 'During Day' : time === 'retreat' ? 'Retreat' : time}</div>
                        <div className="text-sm font-semibold text-cyan-400">{practice as string}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4">
                    <div className="text-sm font-semibold text-emerald-400 mb-2">실천 팁:</div>
                    <div className="space-y-1">
                      {routine.tips.map((tip: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                          <span className="text-yellow-400 mt-0.5">•</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 명상 환경 만들기 */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-pink-400 mb-5 flex items-center gap-2">
          <Moon className="w-6 h-6" />
          최적의 명상 환경
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(meditationEnvironment).map(([category, items], index) => {
            const titles = {
              space: '🏠 공간',
              atmosphere: '🕯️ 분위기',
              preparation: '✅ 준비사항'
            };
            return (
              <motion.div
                key={category}
                className="glass rounded-2xl p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h4 className="font-bold text-cyan-400 mb-3">
                  {titles[category as keyof typeof titles]}
                </h4>
                <div className="space-y-2">
                  {(items as string[]).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 주의사항 */}
      <div>
        <h3 className="text-xl font-bold text-red-400 mb-5">⚠️ 명상 시 주의사항</h3>
        <div className="glass rounded-2xl p-6">
          <div className="mb-6">
            <h4 className="font-bold text-yellow-400 mb-3">흔한 어려움과 해결법</h4>
            <div className="space-y-3">
              {meditationCautions.common.map((item, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm font-semibold text-orange-400 mb-1">{item.issue}</div>
                  <div className="text-sm text-slate-300">→ {item.solution}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl p-5 border border-red-500/20">
            <h4 className="font-bold text-red-400 mb-3">⚠️ 중요한 주의사항</h4>
            <div className="space-y-2">
              {meditationCautions.warnings.map((warning, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 시작하기 격려 */}
      <motion.div
        className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <h4 className="font-bold text-purple-400 mb-4">🌟 명상을 시작하는 당신에게</h4>
        <div className="space-y-3 text-sm text-slate-300">
          <p>명상은 특별한 재능이나 능력이 필요하지 않습니다. 숨을 쉴 수 있다면 명상할 수 있습니다.</p>
          <p>완벽한 명상 같은 건 없습니다. 매번 다르고, 그것이 정상입니다.</p>
          <p>5분이라도 괜찮습니다. 짧아도 매일 하는 것이 가끔 오래 하는 것보다 효과적입니다.</p>
          <p>명상은 마음을 비우는 것이 아니라, 마음을 알아차리는 것입니다.</p>
          <p className="text-emerald-400 font-semibold pt-2 border-t border-purple-500/20">
            오늘부터 시작해보세요. 당신의 마음이 당신을 기다리고 있습니다. 🙏
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
