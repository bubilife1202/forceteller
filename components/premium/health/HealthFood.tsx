'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Apple, UtensilsCrossed, Coffee, Salad, Fish, Beef } from 'lucide-react';

interface HealthFoodProps {
  result: SajuResult;
  name: string;
}

export default function HealthFood({ result, name }: HealthFoodProps) {
  const dayElement = result.day.stem.element;

  // 체질별 식이 가이드
  const getFoodGuide = () => {
    const guide: Record<
      string,
      {
        goodFoods: { category: string; items: string[]; reason: string }[];
        avoidFoods: { category: string; items: string[]; reason: string }[];
        cookingMethods: string[];
        eatingHabits: string[];
      }
    > = {
      목: {
        goodFoods: [
          {
            category: '신선한 채소',
            items: ['시금치', '케일', '브로콜리', '셀러리', '깻잎', '상추'],
            reason: '간 해독과 재생을 돕습니다',
          },
          {
            category: '신 맛 과일',
            items: ['레몬', '자몽', '매실', '오렌지', '키위', '포도'],
            reason: '간 기능을 활성화하고 소화를 돕습니다',
          },
          {
            category: '해조류',
            items: ['미역', '다시마', '김', '파래'],
            reason: '해독 작용과 영양 공급',
          },
          {
            category: '견과류',
            items: ['호두', '아몬드', '캐슈넛'],
            reason: '간 건강과 혈액 순환에 도움',
          },
        ],
        avoidFoods: [
          {
            category: '기름진 음식',
            items: ['튀김', '삼겹살', '치킨', '패스트푸드'],
            reason: '간에 부담을 주고 지방간 유발',
          },
          {
            category: '술과 자극적 음식',
            items: ['알코올', '매운 음식', '과도한 양념'],
            reason: '간 기능 저하와 염증 유발',
          },
        ],
        cookingMethods: ['찜', '볶음', '생식', '샐러드'],
        eatingHabits: [
          '규칙적인 식사 시간 (특히 아침 식사)',
          '천천히 씹어 먹기',
          '과식 피하기',
          '야식 자제',
        ],
      },
      화: {
        goodFoods: [
          {
            category: '쓴 맛 채소',
            items: ['쑥갓', '고들빼기', '치커리', '고추냉이'],
            reason: '심장 열을 내리고 혈액 순환 개선',
          },
          {
            category: '붉은 색 식품',
            items: ['토마토', '비트', '석류', '딸기', '대추'],
            reason: '혈액 생성과 순환 촉진',
          },
          {
            category: '맑은 수분',
            items: ['녹차', '보리차', '옥수수수염차', '코코넛 워터'],
            reason: '체내 열 조절과 수분 공급',
          },
          {
            category: '곡물',
            items: ['현미', '귀리', '보리', '수수'],
            reason: '심장 건강과 혈압 조절',
          },
        ],
        avoidFoods: [
          {
            category: '자극적/뜨거운 음식',
            items: ['고추', '생강', '마늘(과다)', '뜨거운 국물'],
            reason: '체내 열을 높여 심장에 부담',
          },
          {
            category: '카페인',
            items: ['커피', '에너지 음료', '초콜릿'],
            reason: '심계항진과 불면증 유발',
          },
        ],
        cookingMethods: ['냉채', '무침', '삶기', '데치기'],
        eatingHabits: [
          '충분한 수분 섭취 (하루 2L 이상)',
          '뜨거운 음식은 식혀서 먹기',
          '저녁 식사는 가볍게',
          '자극적인 맛 피하기',
        ],
      },
      토: {
        goodFoods: [
          {
            category: '달콤한 곡물',
            items: ['찹쌀', '감자', '고구마', '옥수수', '밤'],
            reason: '비위 기능 강화와 에너지 공급',
          },
          {
            category: '소화 잘 되는 채소',
            items: ['당근', '호박', '무', '배추', '양배추'],
            reason: '소화 촉진과 위 점막 보호',
          },
          {
            category: '발효 식품',
            items: ['된장', '청국장', '김치', '요구르트', '치즈'],
            reason: '장 건강과 소화 효소 공급',
          },
          {
            category: '따뜻한 차',
            items: ['생강차', '대추차', '계피차', '율무차'],
            reason: '소화 기능 활성화',
          },
        ],
        avoidFoods: [
          {
            category: '차가운 음식',
            items: ['아이스크림', '냉면', '찬 물', '생과일 과다'],
            reason: '소화 기능 저하',
          },
          {
            category: '단 음식',
            items: ['케이크', '사탕', '탄산음료', '과자'],
            reason: '혈당 불안정과 비장 약화',
          },
        ],
        cookingMethods: ['찜', '끓이기', '조림', '구이'],
        eatingHabits: [
          '규칙적인 식사 (하루 3끼)',
          '따뜻하게 데워 먹기',
          '천천히 꼭꼭 씹기',
          '과식 절대 금지',
        ],
      },
      금: {
        goodFoods: [
          {
            category: '매운 맛 채소',
            items: ['무', '양파', '마늘', '생강', '파', '고추냉이'],
            reason: '폐 기능 강화와 기운 순환',
          },
          {
            category: '흰색 식품',
            items: ['배', '연근', '도라지', '더덕', '무', '은행'],
            reason: '폐와 기관지 건강',
          },
          {
            category: '수분 많은 과일',
            items: ['배', '수박', '참외', '복숭아'],
            reason: '호흡기 보습과 가래 제거',
          },
          {
            category: '단백질',
            items: ['닭가슴살', '두부', '콩', '생선'],
            reason: '면역력 강화',
          },
        ],
        avoidFoods: [
          {
            category: '건조한 음식',
            items: ['구운 과자', '말린 안주', '과도한 짠 음식'],
            reason: '호흡기 건조 악화',
          },
          {
            category: '유제품 과다',
            items: ['우유', '치즈', '버터'],
            reason: '가래 생성 증가',
          },
        ],
        cookingMethods: ['찜', '수육', '백숙', '전골'],
        eatingHabits: [
          '충분한 수분과 함께 섭취',
          '건조한 음식은 국물과 함께',
          '천천히 먹으며 호흡',
          '자극적인 향신료 적당히',
        ],
      },
      수: {
        goodFoods: [
          {
            category: '짠 맛 식품',
            items: ['미역', '다시마', '김', '조개', '굴', '새우'],
            reason: '신장 기능 강화 (적당량)',
          },
          {
            category: '검은색 식품',
            items: ['흑미', '검은콩', '검은깨', '목이버섯', '가지'],
            reason: '신장과 뼈 건강',
          },
          {
            category: '견과류',
            items: ['호두', '잣', '땅콩', '해바라기씨'],
            reason: '뇌와 신장 기능 향상',
          },
          {
            category: '따뜻한 음식',
            items: ['삼계탕', '곰탕', '보양탕', '전복죽'],
            reason: '체온 유지와 원기 보충',
          },
        ],
        avoidFoods: [
          {
            category: '과도한 염분',
            items: ['짠 국', '젓갈', '라면', '가공식품'],
            reason: '신장 부담과 부종 유발',
          },
          {
            category: '차가운 음식',
            items: ['냉음료', '아이스크림', '회'],
            reason: '체온 저하와 신장 기능 약화',
          },
        ],
        cookingMethods: ['탕', '찜', '구이', '조림'],
        eatingHabits: [
          '따뜻한 물 자주 마시기',
          '차가운 음식 피하기',
          '적당한 염분 섭취',
          '규칙적인 식사',
        ],
      },
    };

    return guide[dayElement] || guide['목'];
  };

  const foodGuide = getFoodGuide();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2
        className="text-3xl font-bold text-center mb-8 gradient-text"
        style={{ fontFamily: "'Noto Serif KR', serif" }}
      >
        🍎 체질별 맞춤 식단
      </h2>

      {/* 좋은 음식 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Apple className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-green-400">먹으면 좋은 음식</h3>
            <p className="text-slate-400 text-sm">{name}님의 건강을 돕는 식품</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {foodGuide.goodFoods.map((food, index) => (
            <motion.div
              key={food.category}
              className="glass rounded-xl p-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Salad className="w-5 h-5 text-green-400" />
                <h4 className="font-bold text-green-400">{food.category}</h4>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {food.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-slate-300 text-sm">💡 {food.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 피해야 할 음식 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
            <Coffee className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-400">피해야 할 음식</h3>
            <p className="text-slate-400 text-sm">건강에 해로울 수 있는 식품</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {foodGuide.avoidFoods.map((food, index) => (
            <motion.div
              key={food.category}
              className="glass rounded-xl p-5 bg-red-500/10 border border-red-500/30"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-red-400 mb-3">{food.category}</h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {food.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-slate-300 text-sm">⚠️ {food.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 조리법 */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-purple-400">권장 조리법</h3>
          </div>
          <div className="space-y-2">
            {foodGuide.cookingMethods.map((method, index) => (
              <motion.div
                key={method}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-purple-400">✓</span>
                <span className="text-slate-300">{method}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Fish className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-cyan-400">식사 습관</h3>
          </div>
          <div className="space-y-2">
            {foodGuide.eatingHabits.map((habit, index) => (
              <motion.div
                key={habit}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="text-cyan-400">•</span>
                <span className="text-slate-300 text-sm">{habit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 일일 식단 예시 */}
      <div className="glass rounded-2xl p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30">
        <h3 className="text-xl font-bold text-amber-400 mb-6">📋 하루 식단 예시</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h4 className="font-bold text-white mb-3">🌅 아침</h4>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li>• {foodGuide.goodFoods[0].items[0]} 샐러드</li>
              <li>• {foodGuide.goodFoods[3]?.items[0] || '현미밥'}</li>
              <li>• 따뜻한 차</li>
            </ul>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h4 className="font-bold text-white mb-3">☀️ 점심</h4>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li>• {foodGuide.goodFoods[1].items[0]}</li>
              <li>• {foodGuide.goodFoods[2]?.items[0] || '채소 반찬'}</li>
              <li>• 된장국</li>
            </ul>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <h4 className="font-bold text-white mb-3">🌙 저녁</h4>
            <ul className="space-y-1 text-slate-300 text-sm">
              <li>• 가벼운 찜 요리</li>
              <li>• 나물 반찬</li>
              <li>• 적은 양의 밥</li>
            </ul>
          </div>
        </div>
        <p className="text-slate-300 text-sm mt-6">
          💡 개인의 건강 상태와 알레르기를 고려하여 조절하세요
        </p>
      </div>
    </motion.div>
  );
}
