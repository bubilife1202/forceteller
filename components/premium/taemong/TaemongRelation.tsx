'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Home, Star } from 'lucide-react';
import { TaemongFormData } from '@/components/TaemongForm';

interface TaemongRelationProps {
  formData: TaemongFormData;
}

export default function TaemongRelation({ formData }: TaemongRelationProps) {
  // 부모 자식 인연
  const analyzeParentChildBond = () => {
    const content = formData.dreamContent.toLowerCase();
    let score = 50;

    // 긍정적 키워드
    if (content.includes('품') || content.includes('안') || content.includes('안기')) score += 15;
    if (content.includes('따뜻') || content.includes('편안')) score += 12;
    if (content.includes('미소') || content.includes('웃')) score += 10;
    if (content.includes('사랑') || content.includes('좋')) score += 10;
    if (content.includes('받') || content.includes('주')) score += 8;

    // 꿈 꾼 사람에 따른 가중치
    if (formData.dreamer === 'self' || formData.dreamer === 'spouse') score += 10;
    if (formData.dreamer === 'parent') score += 8;

    score = Math.min(score, 100);

    let grade = '';
    if (score >= 85) grade = '매우 깊은 인연';
    else if (score >= 70) grade = '깊은 인연';
    else if (score >= 55) grade = '좋은 인연';
    else grade = '보통 인연';

    return { score, grade };
  };

  // 사회성 및 인간관계
  const analyzeSocialSkills = () => {
    const content = formData.dreamContent.toLowerCase();
    const skills: Array<{ icon: string; name: string; description: string; score: number }> = [];

    // 리더십
    if (content.includes('용') || content.includes('호랑이') || content.includes('왕')) {
      skills.push({
        icon: '👑',
        name: '리더십',
        description:
          '사람들을 이끄는 능력이 뛰어납니다. 친구들의 중심이 되고 존경받을 것입니다.',
        score: 95,
      });
    }

    // 친화력
    if (
      content.includes('많은 사람') ||
      content.includes('군중') ||
      content.includes('모두')
    ) {
      skills.push({
        icon: '🤗',
        name: '친화력',
        description:
          '누구와도 쉽게 친해지는 사교적인 성격입니다. 인맥이 넓고 친구가 많을 것입니다.',
        score: 90,
      });
    }

    // 배려심
    if (
      content.includes('돌보') ||
      content.includes('보살') ||
      content.includes('도와')
    ) {
      skills.push({
        icon: '💖',
        name: '배려심',
        description:
          '타인을 배려하고 도울 줄 아는 따뜻한 마음씨를 가졌습니다. 주변 사람들에게 사랑받습니다.',
        score: 88,
      });
    }

    // 소통 능력
    if (content.includes('말') || content.includes('소리') || content.includes('노래')) {
      skills.push({
        icon: '💬',
        name: '소통 능력',
        description:
          '자신의 생각을 잘 표현하고 남의 말을 경청합니다. 대화를 통해 문제를 해결하는 능력이 있습니다.',
        score: 85,
      });
    }

    if (skills.length === 0) {
      skills.push({
        icon: '😊',
        name: '긍정적 성격',
        description:
          '밝고 긍정적인 성격으로 주변 사람들에게 좋은 영향을 줍니다. 원만한 대인관계를 유지할 것입니다.',
        score: 80,
      });
    }

    return skills.slice(0, 3);
  };

  // 가족운
  const analyzeFamilyFortune = () => {
    const content = formData.dreamContent.toLowerCase();
    const aspects: Array<{ title: string; description: string }> = [];

    aspects.push({
      title: '효심',
      description:
        formData.dreamer === 'parent'
          ? '조부모와 특별한 인연이 있으며, 어른을 공경하는 마음이 깊습니다.'
          : '부모님께 효도하는 마음이 깊어 가족에게 큰 기쁨이 될 것입니다.',
    });

    if (content.includes('형제') || content.includes('자매') || content.includes('둘')) {
      aspects.push({
        title: '형제자매 관계',
        description: '형제자매와 우애가 좋고 평생 서로 돕고 의지하며 살 것입니다.',
      });
    } else {
      aspects.push({
        title: '가족 화목',
        description: '가족 간의 사랑과 이해가 깊어 화목한 가정을 이룰 것입니다.',
      });
    }

    if (content.includes('집') || content.includes('가족') || content.includes('모두')) {
      aspects.push({
        title: '가문의 영광',
        description: '집안의 자랑이 되고 가문을 빛낼 훌륭한 인물이 될 것입니다.',
      });
    }

    return aspects;
  };

  const bond = analyzeParentChildBond();
  const socialSkills = analyzeSocialSkills();
  const familyFortune = analyzeFamilyFortune();

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
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold text-white"
            style={{ fontFamily: "'Noto Serif KR', serif" }}
          >
            인연과 관계운
          </h2>
          <p className="text-slate-400 text-sm">부모 자식 인연 및 사회 관계</p>
        </div>
      </div>

      {/* 부모-자식 인연 점수 */}
      <motion.div className="mb-10" variants={itemVariants}>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-400" />
              부모-자식 인연
            </h3>
            <span className="text-rose-400 font-bold text-2xl">{bond.score}점</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-rose-500 to-pink-400"
              initial={{ width: 0 }}
              whileInView={{ width: `${bond.score}%` }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="px-4 py-2 bg-rose-500/20 text-rose-400 rounded-lg font-semibold">
              {bond.grade}
            </span>
            <p className="text-slate-300 text-sm">
              {formData.dreamer === 'parent' && '조부모님이 꾸신 태몽으로 더욱 특별한 인연입니다'}
              {formData.dreamer === 'self' && '엄마가 직접 꾸신 태몽으로 깊은 인연을 나타냅니다'}
              {formData.dreamer === 'spouse' && '아빠가 꾸신 태몽으로 부자간 인연이 깊습니다'}
              {formData.dreamer === 'relative' && '친척이 꾸신 태몽으로 가족애가 깊습니다'}
              {formData.dreamer === 'other' && '지인이 꾸신 태몽으로 귀한 인연입니다'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 인연의 의미 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">💫 인연의 의미</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            {bond.score >= 85 &&
              `${formData.name}님과 부모님은 전생부터 이어진 깊은 인연입니다. 서로에게 큰 의미가 있는 존재이며, 평생 깊은 사랑으로 연결될 것입니다. 부모님께 큰 효도를 하고 집안의 자랑이 될 것입니다.`}
            {bond.score >= 70 &&
              bond.score < 85 &&
              `${formData.name}님은 부모님과 좋은 인연으로 만났습니다. 서로를 이해하고 존중하며 화목한 관계를 유지할 것입니다. 가족의 사랑 속에서 건강하게 성장할 것입니다.`}
            {bond.score < 70 &&
              `${formData.name}님과 부모님은 서로 배우고 성장하는 인연입니다. 때로는 의견 차이가 있을 수 있지만, 시간이 지나며 더욱 돈독한 관계가 될 것입니다.`}
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 bg-pink-500/20 text-pink-300 rounded-lg text-sm">
              무조건적 사랑
            </span>
            <span className="px-3 py-1.5 bg-rose-500/20 text-rose-300 rounded-lg text-sm">
              평생의 인연
            </span>
            <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-lg text-sm">
              서로의 성장
            </span>
          </div>
        </div>
      </motion.div>

      {/* 사회성 및 대인관계 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">사회성 및 대인관계</h3>
        </div>
        <div className="space-y-4">
          {socialSkills.map((skill, index) => (
            <div key={skill.name} className="glass rounded-xl p-5">
              <div className="flex items-start gap-4">
                <span className="text-4xl">{skill.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white">{skill.name}</h4>
                    <span className="text-blue-400 font-semibold">{skill.score}%</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">{skill.description}</p>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.score}%` }}
                      transition={{ duration: 1, delay: 0.2 + index * 0.15 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 가족운 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Home className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">가족운</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {familyFortune.map((aspect) => (
            <div key={aspect.title} className="glass rounded-xl p-5">
              <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                <Star className="w-5 h-5" />
                {aspect.title}
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">{aspect.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 우정과 사랑 */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">💕</span>
            우정과 사랑
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-pink-400 font-semibold mb-2">친구 관계</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                진심으로 사귀는 친구가 많고, 평생 함께할 소중한 친구들을 만날 것입니다. 친구들에게
                신뢰받고 의지가 되는 존재가 될 것입니다.
              </p>
            </div>
            <div>
              <h4 className="text-rose-400 font-semibold mb-2">연애운</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                진실한 사랑을 만날 운명입니다. 서로를 존중하고 아끼는 아름다운 인연을 맺어 행복한
                가정을 꾸릴 것입니다.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 관계 개선 조언 */}
      <motion.div
        className="p-6 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl border border-rose-500/20"
        variants={itemVariants}
      >
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          좋은 관계를 위한 조언
        </h3>
        <ul className="space-y-2 text-slate-200 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-pink-400">•</span>
            <span>부모님께 감사하는 마음을 자주 표현하세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-400">•</span>
            <span>친구들과의 약속을 소중히 여기세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-400">•</span>
            <span>다른 사람의 이야기에 귀 기울이는 습관을 들이세요</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-400">•</span>
            <span>작은 배려가 큰 인연을 만듭니다</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
