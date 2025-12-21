'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { Eye, Palette, Sparkles, TrendingUp } from 'lucide-react';

interface CharmExternalProps {
  result: SajuResult;
  name: string;
  gender: 'male' | 'female';
}

export default function CharmExternal({ result, name, gender }: CharmExternalProps) {
  const dayElement = result.day.stem.element;
  const dayBranch = result.day.branch.ko;

  // 첫인상 분석
  const getFirstImpression = () => {
    const impressions: { [key: string]: { title: string; description: string; keywords: string[] } } = {
      목: {
        title: '생기발랄한 봄날의 인상',
        description: '처음 만났을 때 밝고 활기찬 에너지가 느껴집니다. 마치 봄날의 새싹처럼 신선하고 긍정적인 이미지를 주며, 사람들에게 희망적이고 친근한 느낌을 전달합니다.',
        keywords: ['밝음', '활기참', '친근함', '성장 가능성'],
      },
      화: {
        title: '열정적이고 화려한 인상',
        description: '첫 만남에서부터 강렬한 존재감을 드러냅니다. 표정과 제스처가 풍부하고 감정 표현이 솔직해서, 사람들이 당신의 진정성을 바로 느낄 수 있습니다.',
        keywords: ['열정적', '화려함', '당당함', '존재감'],
      },
      토: {
        title: '안정적이고 믿음직한 인상',
        description: '처음 만나는 순간부터 신뢰감을 줍니다. 차분하고 성숙한 분위기가 있어서, 사람들이 편안하게 다가올 수 있는 분위기를 만듭니다.',
        keywords: ['신뢰감', '안정적', '성숙함', '포근함'],
      },
      금: {
        title: '세련되고 우아한 인상',
        description: '첫인상부터 품격이 느껴집니다. 정돈된 외모와 절제된 매너가 돋보이며, 전문적이고 능력 있어 보이는 이미지를 줍니다.',
        keywords: ['세련됨', '품격', '전문성', '우아함'],
      },
      수: {
        title: '신비롭고 지적인 인상',
        description: '처음에는 조용하고 신중해 보이지만, 깊이 있는 눈빛과 사려 깊은 표정이 인상적입니다. 알수록 더 끌리는 신비로운 매력이 있습니다.',
        keywords: ['신비로움', '지적임', '차분함', '깊이'],
      },
    };
    return impressions[dayElement] || impressions.목;
  };

  // 오라 분석
  const getAura = () => {
    const auras: { [key: string]: { color: string; energy: string; effect: string } } = {
      목: {
        color: '초록빛 생명의 오라',
        energy: '성장하고 확장하는 에너지가 주변으로 퍼져나갑니다',
        effect: '사람들이 당신 곁에서 활력을 얻고 새로운 시작을 다짐하게 됩니다',
      },
      화: {
        color: '붉은빛 열정의 오라',
        energy: '뜨겁고 강렬한 에너지가 공간을 가득 채웁니다',
        effect: '주변 사람들의 감정을 고조시키고 분위기를 뜨겁게 만듭니다',
      },
      토: {
        color: '황금빛 안정의 오라',
        energy: '포근하고 따뜻한 에너지가 사람들을 감싸 안습니다',
        effect: '불안한 사람들에게 안정감을 주고 긴장을 풀어줍니다',
      },
      금: {
        color: '백금빛 고귀한 오라',
        energy: '맑고 정제된 에너지가 공간에 품격을 더합니다',
        effect: '사람들이 당신 앞에서 자신을 정돈하고 격식을 갖추게 됩니다',
      },
      수: {
        color: '청옥빛 지혜의 오라',
        energy: '잔잔하고 깊은 에너지가 은은하게 퍼집니다',
        effect: '사람들이 당신과의 대화에서 통찰을 얻고 생각이 깊어집니다',
      },
    };
    return auras[dayElement] || auras.목;
  };

  // 패션 & 스타일 추천
  const getStyleRecommendation = () => {
    const styles: { [key: string]: {
      concept: string;
      colors: string[];
      items: string[];
      accessories: string[];
      tips: string[];
    } } = {
      목: {
        concept: '내추럴 & 캐주얼',
        colors: ['그린', '베이지', '아이보리', '연한 블루'],
        items: ['린넨 소재 의류', '편안한 니트', '자연스러운 원피스', '깔끔한 데님'],
        accessories: ['우드 소재 액세서리', '가죽 시계', '에코백', '천연석 반지'],
        tips: [
          '자연스러운 소재와 편안한 핏이 당신의 친근한 이미지와 잘 어울립니다',
          '너무 화려하지 않은 심플한 스타일이 매력을 배가시킵니다',
          '레이어드 스타일로 활동적인 이미지를 강조하세요',
        ],
      },
      화: {
        concept: '대담하고 화려한',
        colors: ['레드', '오렌지', '핑크', '골드'],
        items: ['비비드한 컬러 의류', '파티 드레스', '시크한 재킷', '독특한 디자인'],
        accessories: ['화려한 주얼리', '포인트 가방', '하이힐', '스카프'],
        tips: [
          '당신의 열정을 표현하는 화려한 색상과 디자인을 두려워하지 마세요',
          '액세서리로 포인트를 주면 더욱 눈에 띕니다',
          '트렌디한 아이템으로 패션 리더가 되어보세요',
        ],
      },
      토: {
        concept: '클래식 & 편안',
        colors: ['베이지', '브라운', '카키', '따뜻한 뉴트럴'],
        items: ['트렌치 코트', '캐시미어 니트', '편안한 슬랙스', '로퍼'],
        accessories: ['가죽 벨트', '시계', '심플한 목걸이', '토트백'],
        tips: [
          '시간이 지나도 변하지 않는 클래식한 아이템에 투자하세요',
          '고급스러운 소재가 당신의 품격을 더해줍니다',
          '편안함과 우아함의 균형이 중요합니다',
        ],
      },
      금: {
        concept: '미니멀 & 세련',
        colors: ['화이트', '블랙', '그레이', '실버'],
        items: ['테일러드 재킷', '깔끔한 셔츠', '슬림 팬츠', '모던한 원피스'],
        accessories: ['실버 주얼리', '가죽 제품', '명품 시계', '구조적인 백'],
        tips: [
          '절제된 디자인과 깔끔한 실루엣이 당신의 세련미를 강조합니다',
          '디테일에 신경 쓴 고품질 아이템을 선택하세요',
          '미니멀한 액세서리 하나로 완성도를 높이세요',
        ],
      },
      수: {
        concept: '모던 & 독창적',
        colors: ['네이비', '블랙', '차콜', '다크 블루'],
        items: ['독특한 디자인', '실루엣이 예쁜 의류', '아트적 감각', '레이어링'],
        accessories: ['유니크한 주얼리', '아티스틱한 백', '특이한 안경', '빈티지 소품'],
        tips: [
          '남들과 다른 독창적인 스타일로 개성을 표현하세요',
          '지적이고 세련된 이미지를 유지하되, 재미있는 요소를 더하세요',
          '당신만의 시그니처 아이템을 만들어보세요',
        ],
      },
    };
    return styles[dayElement] || styles.목;
  };

  const impression = getFirstImpression();
  const aura = getAura();
  const style = getStyleRecommendation();

  return (
    <motion.div
      className="glass-strong rounded-3xl p-8 md:p-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-8">
        <h2
          className="text-3xl md:text-4xl font-bold gradient-text mb-3"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          외적 매력
        </h2>
        <p className="text-slate-300">
          사람들이 처음 만났을 때 느끼는 {name}님의 매력
        </p>
      </div>

      {/* First Impression */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Eye className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-purple-400 mb-2">첫인상</h3>
            <h4 className="text-lg font-semibold text-white mb-3">{impression.title}</h4>
            <p className="text-slate-300 leading-relaxed mb-4">
              {impression.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {impression.keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm border border-purple-500/30"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Aura */}
      <motion.div
        className="glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20">
            <Sparkles className="w-6 h-6 text-pink-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-pink-400 mb-2">오라</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20">
                <p className="text-white font-semibold mb-1">✨ {aura.color}</p>
                <p className="text-slate-300 text-sm">{aura.energy}</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50">
                <p className="text-slate-300 text-sm leading-relaxed">
                  <span className="font-semibold text-pink-400">효과:</span> {aura.effect}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fashion & Style */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
            <Palette className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-400 mb-2">패션 & 스타일 추천</h3>
            <p className="text-lg font-semibold text-white mb-4">{style.concept}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Colors */}
          <div className="p-4 rounded-lg bg-slate-800/50">
            <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              추천 컬러
            </h4>
            <div className="flex flex-wrap gap-2">
              {style.colors.map((color, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-amber-500/20 rounded-full text-amber-300 text-sm"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="p-4 rounded-lg bg-slate-800/50">
            <h4 className="font-semibold text-amber-400 mb-3">추천 아이템</h4>
            <div className="grid grid-cols-2 gap-2">
              {style.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-amber-400">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div className="p-4 rounded-lg bg-slate-800/50">
            <h4 className="font-semibold text-amber-400 mb-3">액세서리</h4>
            <div className="grid grid-cols-2 gap-2">
              {style.accessories.map((accessory, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="text-amber-400">•</span>
                  <span>{accessory}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <h4 className="font-semibold text-amber-400 mb-3">💡 스타일링 팁</h4>
            <div className="space-y-2">
              {style.tips.map((tip, idx) => (
                <p key={idx} className="text-slate-200 text-sm leading-relaxed flex gap-2">
                  <span className="text-amber-400 flex-shrink-0">{idx + 1}.</span>
                  <span>{tip}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
