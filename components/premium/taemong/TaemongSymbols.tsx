'use client';

import { motion } from 'framer-motion';
import { Eye, Palette, Gem, Heart } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongSymbolsProps {
  formData: TaemongFormData;
}

export default function TaemongSymbols({ formData }: TaemongSymbolsProps) {
  // 태몽 내용에서 주요 상징 추출
  const extractSymbols = () => {
    const content = formData.dreamContent.toLowerCase();
    const symbols: Array<{
      icon: string;
      name: string;
      meaning: string;
      significance: string;
    }> = [];

    // 동물 상징
    if (content.includes('용') || content.includes('룡')) {
      symbols.push({
        icon: '🐉',
        name: '용',
        meaning: '귀하고 뛰어난 인물',
        significance:
          '용은 황제를 상징하는 최고의 길몽입니다. 리더십이 뛰어나고 큰 인물이 될 운명입니다. 학문이나 사업에서 크게 성공할 가능성이 높습니다.',
      });
    }
    if (content.includes('호랑이') || content.includes('범')) {
      symbols.push({
        icon: '🐯',
        name: '호랑이',
        meaning: '용맹하고 강한 기운',
        significance:
          '호랑이는 용기와 권력을 상징합니다. 담대하고 정의로운 성품을 지니며, 군인, 경찰, 법조인 등 정의를 수호하는 직업에 적합합니다.',
      });
    }
    if (content.includes('뱀') || content.includes('구렁이')) {
      symbols.push({
        icon: '🐍',
        name: '뱀',
        meaning: '지혜와 재물',
        significance:
          '뱀은 지혜와 재물을 상징하는 길몽입니다. 총명하고 영리하며 재테크 감각이 뛰어난 아이가 될 것입니다. 특히 구렁이는 큰 부자의 상징입니다.',
      });
    }
    if (content.includes('돼지')) {
      symbols.push({
        icon: '🐷',
        name: '돼지',
        meaning: '재복과 풍요',
        significance:
          '돼지는 재물운과 풍요를 상징합니다. 평생 먹고사는 데 걱정 없고, 재물복이 많은 아이가 될 것입니다.',
      });
    }
    if (content.includes('잉어') || content.includes('물고기')) {
      symbols.push({
        icon: '🐟',
        name: '잉어',
        meaning: '출세와 성공',
        significance:
          '잉어는 용문을 넘어 용이 되는 등용문의 상징입니다. 학업에 뛰어나고 고위직에 오를 가능성이 높습니다.',
      });
    }

    // 식물 상징
    if (content.includes('꽃') || content.includes('장미') || content.includes('모란')) {
      symbols.push({
        icon: '🌸',
        name: '꽃',
        meaning: '아름다움과 재능',
        significance:
          '꽃은 아름다움과 예술적 재능을 상징합니다. 특히 여아의 경우 외모가 아름답고, 예술 분야에서 두각을 나타낼 것입니다.',
      });
    }
    if (content.includes('과일') || content.includes('열매') || content.includes('복숭아')) {
      symbols.push({
        icon: '🍑',
        name: '과일/열매',
        meaning: '풍성한 결실',
        significance:
          '열매는 노력의 결실을 상징합니다. 열심히 노력한 만큼 좋은 결과를 얻는 성실한 아이가 될 것입니다.',
      });
    }

    // 자연 현상
    if (content.includes('해') || content.includes('태양')) {
      symbols.push({
        icon: '☀️',
        name: '해/태양',
        meaning: '밝고 당당한 기운',
        significance:
          '태양은 양(陽)의 기운으로 남아를 암시하며, 당당하고 정직한 성품을 가진 아이가 될 것입니다. 리더십이 뛰어나고 많은 사람의 존경을 받습니다.',
      });
    }
    if (content.includes('달')) {
      symbols.push({
        icon: '🌙',
        name: '달',
        meaning: '부드럽고 지혜로운 기운',
        significance:
          '달은 음(陰)의 기운으로 여아를 암시하며, 지혜롭고 신비로운 매력을 가진 아이가 될 것입니다. 직관력이 뛰어나고 예술적 감각이 탁월합니다.',
      });
    }
    if (content.includes('별')) {
      symbols.push({
        icon: '⭐',
        name: '별',
        meaning: '빛나는 재능',
        significance:
          '별은 특별한 재능을 상징합니다. 여러 분야에서 뛰어난 능력을 발휘하며, 많은 사람에게 희망과 영감을 주는 사람이 될 것입니다.',
      });
    }

    // 물건
    if (content.includes('금') || content.includes('황금')) {
      symbols.push({
        icon: '💰',
        name: '금/황금',
        meaning: '큰 재물복',
        significance:
          '금은 재물과 명예를 상징합니다. 평생 재물복이 많고 부귀영화를 누릴 운명입니다.',
      });
    }
    if (content.includes('보석') || content.includes('다이아') || content.includes('구슬')) {
      symbols.push({
        icon: '💎',
        name: '보석',
        meaning: '귀한 존재',
        significance:
          '보석은 귀하고 소중한 존재를 상징합니다. 집안의 보배가 되고 주변 사람들에게 사랑받는 아이가 될 것입니다.',
      });
    }

    // 기본 상징 (특정 키워드가 없을 때)
    if (symbols.length === 0) {
      symbols.push({
        icon: '✨',
        name: '신비로운 기운',
        meaning: '특별한 인연',
        significance:
          '태몽 자체가 신비로운 인연을 나타냅니다. 부모와 깊은 인연을 가지고 태어나며, 건강하고 행복한 삶을 살 것입니다.',
      });
    }

    return symbols;
  };

  // 색상 분석
  const analyzeColors = () => {
    const content = formData.dreamContent.toLowerCase();
    const colors: Array<{ name: string; meaning: string }> = [];

    if (content.includes('황금') || content.includes('금색') || content.includes('노란')) {
      colors.push({
        name: '황금색',
        meaning: '재물운과 명예. 큰 부자가 되거나 높은 지위에 오를 것입니다.',
      });
    }
    if (content.includes('빨간') || content.includes('붉은') || content.includes('red')) {
      colors.push({
        name: '빨간색',
        meaning: '열정과 활력. 에너지 넘치고 적극적인 성격의 아이가 될 것입니다.',
      });
    }
    if (content.includes('파란') || content.includes('푸른') || content.includes('blue')) {
      colors.push({
        name: '파란색',
        meaning: '지혜와 평온. 차분하고 지혜로운 성품을 지닐 것입니다.',
      });
    }
    if (content.includes('하얀') || content.includes('흰') || content.includes('white')) {
      colors.push({
        name: '흰색',
        meaning: '순수와 청렴. 정직하고 깨끗한 마음을 가진 아이가 될 것입니다.',
      });
    }
    if (content.includes('검은') || content.includes('흑')) {
      colors.push({
        name: '검은색',
        meaning: '신비와 권위. 카리스마 있고 영향력 있는 인물이 될 것입니다.',
      });
    }

    return colors;
  };

  const symbols = extractSymbols();
  const colors = analyzeColors();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
          <Eye className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            상징 분석
          </h2>
          <p className="text-slate-400 text-sm">태몽 속 주요 상징의 의미</p>
        </div>
      </div>

      {/* 주요 상징들 */}
      <div className="space-y-6 mb-8">
        {symbols.map((symbol, index) => (
          <motion.div
            key={symbol.name}
            className="glass rounded-2xl p-6"
            variants={itemVariants}
          >
            <div className="flex items-start gap-4">
              <div className="text-5xl">{symbol.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white">{symbol.name}</h3>
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                    {symbol.meaning}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">{symbol.significance}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 색상 분석 */}
      {colors.length > 0 && (
        <>
          <motion.div
            className="flex items-center gap-2 mb-4"
            variants={itemVariants}
          >
            <Palette className="w-6 h-6 text-pink-400" />
            <h3 className="text-xl font-bold text-white">색상 의미</h3>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-4">
            {colors.map((color, index) => (
              <motion.div
                key={color.name}
                className="glass rounded-xl p-5"
                variants={itemVariants}
              >
                <h4 className="font-bold text-pink-400 mb-2 flex items-center gap-2">
                  <Gem className="w-5 h-5" />
                  {color.name}
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">{color.meaning}</p>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* 종합 의미 */}
      <motion.div
        className="mt-8 p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl border border-pink-500/20"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-6 h-6 text-pink-400" />
          <h3 className="text-lg font-bold text-white">종합 의미</h3>
        </div>
        <p className="text-slate-200 leading-relaxed">
          태몽 속 상징들이 모두 모여 {formData.name}님이 특별하고 귀한 아이로 태어날 것임을
          예고하고 있습니다. 각 상징이 가진 긍정적인 의미들이 조화를 이루어, 재능과 복을
          모두 갖춘 축복받은 아이가 될 것입니다.
        </p>
      </motion.div>
    </motion.div>
  );
}
