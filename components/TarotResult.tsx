'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Share2, RotateCcw, Heart, Briefcase, Wallet, Activity, Star, Download, Mail, Home } from 'lucide-react';
import { TarotFormData } from './TarotForm';
import { downloadAsHtml, sendByEmail } from '@/lib/utils/export-utils';

interface TarotResultProps {
  formData: TarotFormData;
  onReset: () => void;
  onBack: () => void;
  onHome?: () => void;
}

// 22장 메이저 아르카나 카드 데이터
const majorArcana = [
  {
    id: 0,
    name: '바보 (The Fool)',
    emoji: '🃏',
    keywords: ['새로운 시작', '순수함', '모험', '자유'],
    meaning: {
      general: '새로운 여정의 시작을 의미합니다. 두려움 없이 미지의 세계로 한 발짝 내딛을 때입니다. 순수한 마음으로 새로운 경험을 받아들이세요.',
      love: '새로운 만남이나 관계의 시작을 암시합니다. 과거의 상처를 내려놓고 순수한 마음으로 사랑을 시작할 때입니다. 기존 관계라면 새로운 단계로 나아갈 수 있습니다.',
      money: '새로운 재정적 기회가 찾아올 수 있습니다. 하지만 무모한 투자나 지출은 피하세요. 모험심은 좋지만 기본적인 안전장치는 필요합니다.',
      work: '새로운 프로젝트나 직장을 시작하기 좋은 시기입니다. 창의적인 아이디어가 빛을 발할 수 있습니다. 기존의 틀에서 벗어나 자유롭게 생각하세요.',
      health: '새로운 건강 관리 방법을 시도해보세요. 운동을 시작하거나 식단을 바꾸기 좋은 시기입니다. 가벼운 마음으로 건강에 접근하세요.'
    },
    advice: '두려움을 내려놓고 새로운 시작을 환영하세요. 실패를 두려워하지 말고 가벼운 마음으로 첫 발을 내딛으세요. 우주가 당신을 지지하고 있습니다.',
    reversed: '무모함이나 경솔한 결정을 경계하세요. 지금은 한 발 물러서서 상황을 파악할 때입니다.'
  },
  {
    id: 1,
    name: '마법사 (The Magician)',
    emoji: '🧙',
    keywords: ['창조력', '의지력', '기술', '자원'],
    meaning: {
      general: '당신은 원하는 것을 이룰 수 있는 모든 도구를 이미 가지고 있습니다. 자신의 능력을 믿고 적극적으로 행동하세요. 창조의 힘이 당신과 함께합니다.',
      love: '적극적으로 사랑을 표현할 때입니다. 당신의 매력을 발산하면 좋은 결과를 얻을 수 있습니다. 의사소통 능력이 관계를 발전시키는 열쇠가 됩니다.',
      money: '재능을 발휘하여 수입을 올릴 수 있는 시기입니다. 새로운 기술을 배우거나 부업을 시작하기 좋습니다. 당신의 능력이 돈이 될 수 있습니다.',
      work: '업무 능력이 인정받는 시기입니다. 새로운 프로젝트를 주도하거나 리더십을 발휘해보세요. 당신의 아이디어가 성공을 이끌 것입니다.',
      health: '의지력으로 건강 목표를 달성할 수 있습니다. 마음먹은 대로 몸이 따라올 것입니다. 명상이나 시각화가 도움이 됩니다.'
    },
    advice: '당신은 이미 필요한 모든 것을 갖추고 있습니다. 자신감을 가지고 행동으로 옮기세요. 집중력과 의지력이 현실을 창조합니다.',
    reversed: '능력을 제대로 발휘하지 못하고 있습니다. 집중력 부족이나 자기 의심이 발목을 잡고 있을 수 있습니다.'
  },
  {
    id: 2,
    name: '여사제 (The High Priestess)',
    emoji: '🌙',
    keywords: ['직관', '신비', '내면의 지혜', '잠재의식'],
    meaning: {
      general: '직관을 믿으세요. 논리보다 내면의 목소리에 귀 기울일 때입니다. 표면 아래 숨겨진 진실이 있습니다. 서두르지 말고 기다리는 지혜가 필요합니다.',
      love: '상대방의 마음을 직관으로 읽을 수 있는 시기입니다. 말보다 행동과 분위기를 살피세요. 비밀스러운 감정이나 숨겨진 마음이 있을 수 있습니다.',
      money: '지금은 큰 결정을 미루고 정보를 더 수집하세요. 보이지 않는 기회가 다가오고 있습니다. 직감적으로 느끼는 투자처가 있다면 주시하세요.',
      work: '동료나 상사의 의중을 파악하는 것이 중요합니다. 겉으로 드러나지 않는 사내 정치에 주의하세요. 직관력이 올바른 판단을 도울 것입니다.',
      health: '몸이 보내는 신호에 귀 기울이세요. 스트레스나 피로의 징후를 무시하지 마세요. 명상이나 요가가 도움이 됩니다.'
    },
    advice: '조용히 내면을 들여다보는 시간이 필요합니다. 모든 답은 당신 안에 있습니다. 서두르지 말고 직관이 이끄는 대로 따르세요.',
    reversed: '직관을 무시하고 있거나 내면의 목소리를 듣지 못하고 있습니다. 외부의 소음에서 벗어나 고요함 속에서 답을 찾으세요.'
  },
  {
    id: 3,
    name: '여황제 (The Empress)',
    emoji: '👑',
    keywords: ['풍요', '모성', '창조', '자연'],
    meaning: {
      general: '풍요와 번영의 시기가 다가오고 있습니다. 창조적 에너지가 넘치며, 시작한 일들이 결실을 맺을 것입니다. 자연과 교감하고 감사하는 마음을 가지세요.',
      love: '사랑이 풍성해지는 시기입니다. 관계에서 따뜻함과 보살핌을 주고받게 됩니다. 임신이나 출산과 관련된 기쁜 소식이 있을 수 있습니다.',
      money: '물질적 풍요가 찾아옵니다. 투자한 것들이 수확의 시기를 맞습니다. 미적 감각을 살린 사업이나 부업이 성공할 수 있습니다.',
      work: '창의적인 업무에서 두각을 나타냅니다. 팀을 이끌거나 후배를 양성하는 역할이 어울립니다. 협력과 조화가 성공의 열쇠입니다.',
      health: '전반적인 건강 상태가 좋아집니다. 특히 여성 건강과 관련된 좋은 징조입니다. 자연 치유력이 활성화됩니다.'
    },
    advice: '삶의 풍요로움을 누리세요. 베풀면 더 많이 돌아옵니다. 창조적 에너지를 표현하고, 주변을 아름답게 가꾸세요.',
    reversed: '창조적 에너지가 막혀 있습니다. 과잉 보호나 집착이 문제가 될 수 있습니다. 균형을 찾으세요.'
  },
  {
    id: 4,
    name: '황제 (The Emperor)',
    emoji: '🏰',
    keywords: ['권위', '구조', '리더십', '안정'],
    meaning: {
      general: '질서와 구조가 필요한 시기입니다. 강한 리더십과 결단력으로 상황을 통제하세요. 규칙과 원칙을 세우고 그에 따라 행동하면 성공합니다.',
      love: '관계에서 안정과 책임감이 중요해집니다. 장기적인 약속이나 결혼을 생각하기 좋은 시기입니다. 믿음직한 파트너가 나타날 수 있습니다.',
      money: '체계적인 재정 관리가 필요합니다. 예산을 세우고 계획대로 실행하세요. 안정적인 투자가 무모한 투기보다 낫습니다.',
      work: '리더십을 발휘할 기회입니다. 조직을 이끌거나 프로젝트를 관리하는 역할이 주어질 수 있습니다. 권위 있는 인물의 도움을 받을 수 있습니다.',
      health: '규칙적인 생활 습관이 건강의 열쇠입니다. 운동 루틴을 정하고 꾸준히 실천하세요. 지나친 스트레스는 피하세요.'
    },
    advice: '당신의 삶에 질서를 부여하세요. 명확한 목표를 세우고 체계적으로 실행하면 원하는 것을 얻을 수 있습니다. 책임감 있게 행동하세요.',
    reversed: '지나친 통제욕이나 유연성 부족이 문제입니다. 완고함을 버리고 다른 사람의 의견도 들어보세요.'
  },
  {
    id: 5,
    name: '교황 (The Hierophant)',
    emoji: '⛪',
    keywords: ['전통', '교육', '신념', '조언'],
    meaning: {
      general: '전통과 관습을 따르는 것이 현명한 시기입니다. 스승이나 멘토의 조언을 구하세요. 배움의 자세로 지혜를 쌓을 때입니다.',
      love: '전통적인 방식의 연애나 결혼이 길합니다. 가족의 축복이 중요해질 수 있습니다. 공식적인 약속이나 의식이 관계를 강화합니다.',
      money: '검증된 방법으로 재정을 관리하세요. 전문가의 조언을 구하는 것이 좋습니다. 안전하고 보수적인 투자가 현명합니다.',
      work: '회사의 규칙과 문화를 따르세요. 선배나 상사에게 배울 점이 많습니다. 자격증 취득이나 교육 참여가 도움됩니다.',
      health: '검증된 의료 전문가의 조언을 따르세요. 민간요법보다 정통 의학이 현명합니다. 정기 검진을 받아보세요.'
    },
    advice: '혼자 해결하려 하지 말고 경험 많은 사람의 조언을 구하세요. 전통의 지혜 속에 답이 있습니다. 겸손하게 배우는 자세가 필요합니다.',
    reversed: '맹목적으로 규칙을 따르지 말고 자신만의 길을 찾을 때입니다. 기존 체계에 의문을 가져도 좋습니다.'
  },
  {
    id: 6,
    name: '연인 (The Lovers)',
    emoji: '💑',
    keywords: ['사랑', '선택', '조화', '가치관'],
    meaning: {
      general: '중요한 선택의 기로에 서 있습니다. 마음과 가치관에 따른 결정이 필요합니다. 사랑과 관계가 중요한 역할을 합니다.',
      love: '깊은 사랑과 영혼의 연결을 경험할 수 있습니다. 운명적인 만남이나 관계의 발전이 있습니다. 진정한 파트너십의 시작입니다.',
      money: '가치관과 일치하는 곳에 투자하세요. 파트너십을 통한 재정적 기회가 있습니다. 돈보다 의미 있는 선택이 결국 번영을 가져옵니다.',
      work: '협력이 핵심입니다. 좋은 파트너나 동료와 함께하면 시너지가 납니다. 자신의 가치관과 맞는 일을 선택하세요.',
      health: '정신과 육체의 조화가 필요합니다. 사랑하는 사람과의 관계가 건강에 긍정적 영향을 줍니다. 스트레스 관리가 중요합니다.'
    },
    advice: '마음이 원하는 것을 두려워하지 마세요. 진정한 사랑과 조화를 추구하세요. 선택의 순간, 진심을 따르면 후회 없습니다.',
    reversed: '관계의 불화나 잘못된 선택을 암시합니다. 가치관의 충돌이 있을 수 있습니다. 신중하게 결정하세요.'
  },
  {
    id: 7,
    name: '전차 (The Chariot)',
    emoji: '⚔️',
    keywords: ['승리', '의지력', '결단', '전진'],
    meaning: {
      general: '강한 의지와 결단력으로 목표를 향해 전진할 때입니다. 장애물을 극복하고 승리를 쟁취할 수 있습니다. 포기하지 마세요.',
      love: '적극적으로 사랑을 쟁취하세요. 수동적인 태도보다 주도적인 행동이 필요합니다. 장거리 연애나 여행 중 로맨스가 있을 수 있습니다.',
      money: '공격적인 재테크가 성공합니다. 새로운 수입원을 개척하거나 사업을 확장하기 좋은 시기입니다. 경쟁에서 이길 수 있습니다.',
      work: '도전적인 목표를 세우고 달성하세요. 경쟁자를 이기고 승진이나 성과를 이룰 수 있습니다. 출장이나 이동이 있을 수 있습니다.',
      health: '적극적인 운동이나 다이어트가 효과를 봅니다. 강한 의지로 나쁜 습관을 끊을 수 있습니다. 체력이 좋아집니다.'
    },
    advice: '망설이지 말고 전진하세요. 당신의 의지가 현실을 움직입니다. 방향을 정했다면 흔들리지 말고 끝까지 가세요.',
    reversed: '방향을 잃었거나 통제력을 상실했습니다. 공격성이 과해지지 않도록 조절하세요. 잠시 멈추고 방향을 재설정하세요.'
  },
  {
    id: 8,
    name: '힘 (Strength)',
    emoji: '🦁',
    keywords: ['내면의 힘', '용기', '인내', '자제력'],
    meaning: {
      general: '부드러움 속에 강함이 있습니다. 폭력적인 힘이 아닌 내면의 힘으로 상황을 다루세요. 인내와 자제력이 승리를 가져옵니다.',
      love: '인내심으로 관계를 발전시키세요. 상대방을 부드럽게 대하되 자신의 중심을 잃지 마세요. 진정한 사랑은 강요가 아닌 이해에서 옵니다.',
      money: '단기적 유혹을 참고 장기적 이익을 추구하세요. 감정적 소비를 자제하면 재정이 안정됩니다. 인내가 부를 쌓습니다.',
      work: '어려운 사람이나 상황을 지혜롭게 다루세요. 감정 조절이 성공의 열쇠입니다. 인내심으로 힘든 시기를 넘기면 인정받습니다.',
      health: '정신적 강인함이 신체 건강을 지탱합니다. 나쁜 습관을 절제하세요. 스트레스 관리가 중요합니다.'
    },
    advice: '진정한 힘은 자신을 다스리는 데서 나옵니다. 두려움에 용기로 맞서고, 분노에는 인내로 대응하세요. 당신은 생각보다 강합니다.',
    reversed: '자기 의심이나 내면의 약함에 빠져 있습니다. 자신감을 회복하세요. 두려움을 직면하면 힘을 얻습니다.'
  },
  {
    id: 9,
    name: '은둔자 (The Hermit)',
    emoji: '🏔️',
    keywords: ['성찰', '고독', '지혜', '탐구'],
    meaning: {
      general: '홀로 있는 시간이 필요합니다. 내면을 들여다보고 진정한 자신을 찾으세요. 외부의 소음에서 벗어나 지혜를 구하는 시간입니다.',
      love: '혼자만의 시간이 관계를 더 건강하게 만듭니다. 독신이라면 자기 자신과의 관계를 돌아볼 때입니다. 서두르지 마세요.',
      money: '신중하고 보수적인 재정 관리가 필요합니다. 충동구매를 피하고 정말 필요한 것인지 생각하세요. 조용히 재정을 정리할 때입니다.',
      work: '혼자 집중해서 일하는 것이 효율적입니다. 전문성을 깊이 쌓을 수 있는 시기입니다. 멘토 역할을 하게 될 수도 있습니다.',
      health: '휴식과 회복의 시간이 필요합니다. 명상이나 혼자 하는 운동이 좋습니다. 정신 건강을 돌보세요.'
    },
    advice: '고독을 두려워하지 마세요. 혼자 있는 시간이 가장 깊은 지혜를 가져다줍니다. 내면의 빛을 따라가세요.',
    reversed: '지나친 고립은 해롭습니다. 필요할 때는 도움을 요청하세요. 세상과의 연결을 완전히 끊지 마세요.'
  },
  {
    id: 10,
    name: '운명의 수레바퀴 (Wheel of Fortune)',
    emoji: '🎡',
    keywords: ['변화', '운명', '순환', '전환점'],
    meaning: {
      general: '인생의 전환점에 서 있습니다. 운명의 바퀴가 돌아가며 상황이 바뀝니다. 변화를 받아들이고 흐름에 맡기세요.',
      love: '관계에 중요한 변화가 옵니다. 새로운 인연이 갑자기 찾아오거나, 기존 관계가 새로운 국면을 맞을 수 있습니다. 운명적 만남의 가능성.',
      money: '재정 상황에 변동이 있습니다. 뜻밖의 행운이 찾아올 수 있지만, 변화에 대비하세요. 복권이나 투자에 행운이 있을 수 있습니다.',
      work: '승진, 전직, 새로운 기회 등 변화의 시기입니다. 우연한 기회를 잡으세요. 업계 동향에 민감하게 반응하세요.',
      health: '몸 상태가 바뀔 수 있습니다. 건강이 좋아지거나 새로운 문제가 발견될 수 있으니 주의하세요. 정기 검진을 권장합니다.'
    },
    advice: '삶의 순환을 믿으세요. 좋은 시기도 나쁜 시기도 영원하지 않습니다. 변화를 두려워하지 말고 기회로 삼으세요.',
    reversed: '변화에 저항하고 있습니다. 통제할 수 없는 것은 받아들이세요. 불운한 시기라도 곧 지나갑니다.'
  },
  {
    id: 11,
    name: '정의 (Justice)',
    emoji: '⚖️',
    keywords: ['공정', '균형', '진실', '결과'],
    meaning: {
      general: '인과응보의 시기입니다. 과거의 행동에 대한 결과가 찾아옵니다. 공정하게 판단하고 결정해야 합니다. 진실이 밝혀집니다.',
      love: '관계에서 공정함과 균형이 중요합니다. 일방적인 관계는 조정이 필요합니다. 진실한 소통이 필요한 시기입니다.',
      money: '재정적으로 공정한 대우를 받습니다. 법적 분쟁이 있다면 유리하게 해결됩니다. 정당한 몫을 받을 수 있습니다.',
      work: '업무 평가에서 공정한 결과를 얻습니다. 노력한 만큼 인정받습니다. 계약이나 협상에서 균형 잡힌 결과를 기대하세요.',
      health: '생활의 균형을 찾으세요. 한쪽으로 치우친 습관을 교정할 때입니다. 원인과 결과를 분석하여 건강을 관리하세요.'
    },
    advice: '정직하고 공정하게 행동하세요. 뿌린 대로 거두게 됩니다. 결정을 내릴 때 감정보다 이성에 따르세요.',
    reversed: '불공정한 상황이나 부정직함이 있습니다. 책임을 회피하지 마세요. 균형을 잃었다면 바로잡아야 합니다.'
  },
  {
    id: 12,
    name: '매달린 사람 (The Hanged Man)',
    emoji: '🙃',
    keywords: ['희생', '새로운 관점', '정지', '깨달음'],
    meaning: {
      general: '잠시 멈추고 다른 관점에서 상황을 보세요. 포기가 아닌 전략적 기다림이 필요합니다. 희생이 더 큰 것을 가져다줍니다.',
      love: '관계에서 한 발 물러나 상황을 봐야 합니다. 기존의 방식을 바꿔보세요. 희생과 양보가 관계를 살릴 수 있습니다.',
      money: '지금은 투자나 큰 지출을 미루세요. 기다리는 것이 현명합니다. 다른 방식으로 수입을 생각해보세요.',
      work: '진행이 막힌 느낌이라면 다른 접근법을 시도하세요. 잠시 쉬어가는 것이 나을 수 있습니다. 자발적 휴직도 고려해보세요.',
      health: '무리하지 말고 쉬세요. 치료를 위해 일상을 멈춰야 할 수도 있습니다. 휴식이 최고의 치료입니다.'
    },
    advice: '때로는 멈추는 것이 전진입니다. 상황을 뒤집어 보면 새로운 답이 보입니다. 인내하며 때를 기다리세요.',
    reversed: '쓸데없는 희생을 하고 있습니다. 매달려 있지 말고 움직여야 할 때입니다. 정체된 상황에서 벗어나세요.'
  },
  {
    id: 13,
    name: '죽음 (Death)',
    emoji: '💀',
    keywords: ['끝', '변환', '재탄생', '해방'],
    meaning: {
      general: '무언가의 끝이 다가옵니다. 하지만 이것은 새로운 시작을 위한 것입니다. 과거를 내려놓고 변화를 받아들이세요. 변환의 시기입니다.',
      love: '관계의 형태가 바뀝니다. 이별이 있을 수 있지만, 더 나은 관계를 위한 것일 수 있습니다. 오래된 패턴을 끊어야 합니다.',
      money: '재정 구조가 바뀝니다. 기존 수입원이 사라지고 새로운 것이 생길 수 있습니다. 낡은 재정 습관을 버리세요.',
      work: '직장이나 직업의 변화가 있습니다. 퇴사, 이직, 부서 이동 등이 있을 수 있습니다. 새로운 시작을 위한 끝입니다.',
      health: '나쁜 습관을 완전히 끊어야 합니다. 생활 방식의 근본적인 변화가 필요합니다. 재활이나 회복의 의미도 있습니다.'
    },
    advice: '끝을 두려워하지 마세요. 모든 끝은 새로운 시작입니다. 과거에 집착하지 말고 변화를 환영하세요.',
    reversed: '변화에 저항하고 있습니다. 끝나야 할 것을 끝내지 못하고 있습니다. 과거를 놓아주세요.'
  },
  {
    id: 14,
    name: '절제 (Temperance)',
    emoji: '🏺',
    keywords: ['균형', '조화', '인내', '통합'],
    meaning: {
      general: '균형과 조화가 필요한 시기입니다. 극단을 피하고 중용을 지키세요. 인내심을 가지고 천천히 나아가면 좋은 결과를 얻습니다.',
      love: '관계에서 주고받는 것의 균형을 맞추세요. 차분하고 조화로운 관계가 됩니다. 서로의 차이를 조율하며 성장합니다.',
      money: '수입과 지출의 균형을 맞추세요. 절약과 투자를 적절히 섞으세요. 급하게 벌려하지 말고 꾸준히 모으세요.',
      work: '업무와 개인 생활의 균형이 필요합니다. 협력과 타협으로 좋은 결과를 얻습니다. 장기 프로젝트에 인내심을 가지세요.',
      health: '식이요법과 운동의 균형을 찾으세요. 과하지도 부족하지도 않은 생활이 건강의 비결입니다. 절제된 생활이 필요합니다.'
    },
    advice: '급하게 가려 하지 마세요. 균형 잡힌 접근이 장기적으로 좋은 결과를 가져옵니다. 조화를 추구하세요.',
    reversed: '균형이 깨져 있습니다. 한쪽으로 너무 치우쳐 있습니다. 극단적인 행동을 피하고 중심을 찾으세요.'
  },
  {
    id: 15,
    name: '악마 (The Devil)',
    emoji: '😈',
    keywords: ['유혹', '속박', '집착', '그림자'],
    meaning: {
      general: '무언가에 속박되어 있지 않은지 돌아보세요. 중독, 집착, 부정적 패턴이 당신을 옭아매고 있을 수 있습니다. 그림자를 직면하세요.',
      love: '건강하지 못한 관계 패턴을 점검하세요. 집착이나 의존은 사랑이 아닙니다. 유해한 관계에서 벗어날 용기가 필요합니다.',
      money: '물질적 욕망에 사로잡혀 있지 않나요? 탐욕이나 과소비를 경계하세요. 돈에 지배당하지 마세요.',
      work: '일 중독이나 부정적인 직장 환경에 주의하세요. 성공에 대한 집착이 삶을 갉아먹고 있을 수 있습니다. 자유롭게 선택하세요.',
      health: '중독성 물질이나 행동에 주의하세요. 나쁜 습관이 건강을 해치고 있습니다. 도움을 구하는 것도 용기입니다.'
    },
    advice: '사슬은 생각보다 느슨합니다. 당신을 속박하는 것이 무엇인지 인식하면 자유로워질 수 있습니다. 그림자를 직면하세요.',
    reversed: '속박에서 벗어나고 있습니다. 부정적 패턴을 끊고 자유를 되찾고 있습니다. 해방의 시기입니다.'
  },
  {
    id: 16,
    name: '탑 (The Tower)',
    emoji: '🗼',
    keywords: ['격변', '붕괴', '해방', '계시'],
    meaning: {
      general: '급격한 변화나 충격적인 사건이 일어날 수 있습니다. 기존의 것이 무너지지만, 이는 새로운 것을 위한 정화입니다. 진실이 드러납니다.',
      love: '관계에 큰 위기나 변화가 찾아옵니다. 숨겨진 진실이 드러날 수 있습니다. 아픈 과정이지만 결국 해방으로 이어집니다.',
      money: '재정적 손실이나 예상치 못한 지출에 대비하세요. 투자가 급격히 변동할 수 있습니다. 위기가 새로운 기회가 될 수 있습니다.',
      work: '회사 구조조정, 해고, 프로젝트 실패 등 격변이 있을 수 있습니다. 충격적이지만 더 나은 길로 이어질 수 있습니다.',
      health: '갑작스러운 건강 문제에 주의하세요. 스트레스로 인한 급성 질환 가능성이 있습니다. 예방 조치를 취하세요.'
    },
    advice: '무너지는 것을 막으려 하지 마세요. 변화는 필요한 것입니다. 잿더미 위에서 더 강하게 다시 시작할 수 있습니다.',
    reversed: '변화를 피하거나 늦추고 있습니다. 하지만 붕괴는 불가피합니다. 미리 대비하세요.'
  },
  {
    id: 17,
    name: '별 (The Star)',
    emoji: '⭐',
    keywords: ['희망', '영감', '평화', '치유'],
    meaning: {
      general: '폭풍이 지나고 희망의 빛이 비춥니다. 미래에 대한 긍정적인 전망을 가지세요. 영감과 치유의 시간입니다. 소원이 이루어집니다.',
      love: '희망적인 관계의 발전이 있습니다. 상처가 치유되고 새로운 사랑이 찾아옵니다. 이상적인 파트너를 만날 수 있습니다.',
      money: '재정 상황이 개선됩니다. 희망을 품고 장기적인 목표를 향해 나아가세요. 우주가 풍요를 지원합니다.',
      work: '영감이 넘치는 시기입니다. 꿈꾸던 일을 추구하세요. 창의적인 분야에서 특히 좋은 성과를 얻습니다.',
      health: '회복과 치유의 시기입니다. 건강이 좋아지고 활력이 돌아옵니다. 자연 치유력이 강해집니다.'
    },
    advice: '희망을 잃지 마세요. 어두운 밤이 지나면 별이 빛납니다. 우주를 신뢰하고 자신의 빛을 따르세요.',
    reversed: '희망을 잃었거나 자기 의심에 빠져 있습니다. 작은 것에서부터 희망을 찾으세요. 포기하지 마세요.'
  },
  {
    id: 18,
    name: '달 (The Moon)',
    emoji: '🌙',
    keywords: ['환상', '무의식', '두려움', '미지'],
    meaning: {
      general: '모든 것이 명확하지 않은 시기입니다. 환상과 현실을 구분하기 어렵습니다. 직관을 따르되 속지 않도록 주의하세요. 숨겨진 것이 있습니다.',
      love: '관계에서 불확실함이나 오해가 있습니다. 상대방의 진심을 파악하기 어렵습니다. 감정의 변덕에 주의하세요.',
      money: '재정적 상황이 불투명합니다. 투자나 큰 결정을 미루세요. 사기나 기만에 주의하세요.',
      work: '직장에서 정치적 상황이나 숨겨진 의도에 주의하세요. 불확실한 상황에서 섣불리 행동하지 마세요.',
      health: '원인 모를 증상이나 심리적 불안에 주의하세요. 수면 문제가 있을 수 있습니다. 전문가 상담을 고려하세요.'
    },
    advice: '두려움에 사로잡히지 마세요. 어둠 속에서도 길을 찾을 수 있습니다. 직관을 신뢰하되 현실 검증을 게을리하지 마세요.',
    reversed: '혼란에서 벗어나고 진실이 드러납니다. 두려움을 극복하고 있습니다. 환상에서 깨어나는 시기입니다.'
  },
  {
    id: 19,
    name: '태양 (The Sun)',
    emoji: '☀️',
    keywords: ['성공', '행복', '활력', '긍정'],
    meaning: {
      general: '밝은 미래가 기다립니다. 성공과 행복이 찾아오는 시기입니다. 긍정적인 에너지가 넘치고 모든 것이 잘 풀립니다. 축하할 일이 생깁니다.',
      love: '행복한 연애, 결혼, 임신 등 기쁜 소식이 있습니다. 사랑이 빛나는 시기입니다. 밝고 건강한 관계를 경험합니다.',
      money: '재정적 성공과 풍요가 찾아옵니다. 투자가 좋은 결과를 냅니다. 보너스나 뜻밖의 수입이 있을 수 있습니다.',
      work: '성공과 인정을 받는 시기입니다. 프로젝트가 성공적으로 마무리됩니다. 승진이나 좋은 평가를 기대하세요.',
      health: '활력이 넘치고 건강합니다. 야외 활동이 도움이 됩니다. 밝은 에너지로 면역력이 강해집니다.'
    },
    advice: '자신감을 가지세요. 지금은 당신이 빛날 차례입니다. 긍정적인 마음으로 하루하루를 즐기세요.',
    reversed: '일시적인 지연이나 약간의 그림자가 있지만 걱정하지 마세요. 태양은 곧 다시 빛날 것입니다.'
  },
  {
    id: 20,
    name: '심판 (Judgement)',
    emoji: '📯',
    keywords: ['부활', '소명', '각성', '평가'],
    meaning: {
      general: '내면의 부름에 응답할 때입니다. 과거를 돌아보고 새롭게 태어나세요. 중요한 결정이나 평가의 시기입니다. 진정한 소명을 찾으세요.',
      love: '관계를 재평가하는 시기입니다. 과거의 관계에서 교훈을 얻으세요. 진정한 사랑에 대한 깨달음이 있습니다.',
      money: '재정적 결정을 재평가하세요. 과거의 실수에서 배우고 새로운 시작을 하세요. 재기의 기회가 옵니다.',
      work: '진정으로 하고 싶은 일이 무엇인지 스스로에게 물으세요. 커리어의 전환점에 서 있습니다. 소명에 따르세요.',
      health: '생활 방식 전체를 재점검하세요. 새로운 건강 습관을 시작하기 좋습니다. 재활이나 회복에 좋은 시기입니다.'
    },
    advice: '과거를 용서하고 앞으로 나아가세요. 내면의 소리에 귀 기울이고 진정한 자신이 되세요. 새로운 장이 시작됩니다.',
    reversed: '자기 비판이 지나치거나 과거에 묶여 있습니다. 스스로를 용서하세요. 변화를 거부하지 마세요.'
  },
  {
    id: 21,
    name: '세계 (The World)',
    emoji: '🌍',
    keywords: ['완성', '성취', '통합', '여행'],
    meaning: {
      general: '하나의 여정이 완성됩니다. 목표를 달성하고 성취감을 느끼는 시기입니다. 모든 것이 하나로 통합됩니다. 새로운 시작을 준비하세요.',
      love: '관계가 완성되는 시기입니다. 결혼이나 동거 등 다음 단계로 나아갑니다. 만족스러운 파트너십을 경험합니다.',
      money: '재정적 목표를 달성합니다. 프로젝트가 성공적으로 완료됩니다. 풍요와 성취를 누리세요.',
      work: '프로젝트 완료, 승진, 목표 달성 등 성공의 시기입니다. 업적을 인정받습니다. 새로운 도전을 준비하세요.',
      health: '전반적인 웰빙을 느낍니다. 몸과 마음이 조화를 이룹니다. 건강 목표를 달성합니다.'
    },
    advice: '당신은 큰 여정을 마쳤습니다. 성취를 축하하고 잠시 쉬어가세요. 그리고 새로운 모험을 시작할 준비를 하세요.',
    reversed: '마무리가 지연되거나 완결감이 부족합니다. 끝맺음을 제대로 하세요. 성취를 인정하고 다음으로 나아가세요.'
  }
];

export default function TarotResult({ formData, onReset, onBack, onHome }: TarotResultProps) {
  const [stage, setStage] = useState<'shuffling' | 'picking' | 'revealing' | 'result'>('shuffling');
  const [selectedCard, setSelectedCard] = useState<typeof majorArcana[0] | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [displayedCards, setDisplayedCards] = useState<number[]>([]);

  // 홈으로 이동
  const handleGoHome = () => {
    if (onHome) {
      onHome();
    } else {
      onBack();
    }
  };

  // HTML 다운로드 함수
  const handleDownloadHtml = () => {
    if (!selectedCard) return;
    const htmlContent = `
      <div class="header">
        <h1>🃏 오늘의 타로</h1>
        <p>${selectedCard.name}${isReversed ? ' (역방향)' : ''}</p>
      </div>
      <div class="section">
        <h2 class="section-title">${selectedCard.emoji} ${selectedCard.name}</h2>
        <p style="text-align: center; color: #a78bfa; margin-bottom: 16px;">
          키워드: ${selectedCard.keywords.join(', ')}
        </p>
      </div>
      <div class="section">
        <h2 class="section-title">🔮 메시지</h2>
        <p>${selectedCard.meaning.general}</p>
      </div>
      <div class="section">
        <h2 class="section-title">💡 조언</h2>
        <p style="font-weight: bold; color: #fbbf24;">${selectedCard.advice}</p>
      </div>
      ${isReversed ? `
      <div class="section">
        <h2 class="section-title">🔄 역방향 메시지</h2>
        <p>${selectedCard.reversed}</p>
      </div>
      ` : ''}
    `;
    downloadAsHtml(htmlContent, `타로_${selectedCard.name.replace(/[()]/g, '')}`);
  };

  // 이메일 전송 함수
  const handleSendEmail = () => {
    if (!selectedCard) return;
    const subject = `[ForceTeller] 오늘의 타로 - ${selectedCard.name}`;
    const body = `
━━━━━━━━━━━━━━━━━━━━
🃏 오늘의 타로
${selectedCard.name}${isReversed ? ' (역방향)' : ''}
━━━━━━━━━━━━━━━━━━━━

${selectedCard.emoji} 키워드: ${selectedCard.keywords.join(', ')}

🔮 메시지:
${selectedCard.meaning.general}

💡 조언:
${selectedCard.advice}

${isReversed ? `🔄 역방향 메시지:
${selectedCard.reversed}` : ''}

━━━━━━━━━━━━━━━━━━━━
ForceTeller - AI 운세 서비스
    `.trim();
    sendByEmail(subject, body);
  };

  // 카드 섞기 애니메이션
  useEffect(() => {
    // 3개의 랜덤 카드 선택 (사용자에게 선택권 제공)
    const shuffled = [...Array(22).keys()].sort(() => Math.random() - 0.5).slice(0, 3);

    const timer = setTimeout(() => {
      setDisplayedCards(shuffled);
      setStage('picking');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 카드 선택 핸들러
  const handleCardPick = (cardIndex: number) => {
    const card = majorArcana[cardIndex];
    const reversed = Math.random() < 0.3; // 30% 확률로 역방향

    setSelectedCard(card);
    setIsReversed(reversed);
    setStage('revealing');

    setTimeout(() => {
      setStage('result');
    }, 1500);
  };

  // 카테고리에 따른 메시지 가져오기
  const getCategoryMessage = () => {
    if (!selectedCard) return '';
    switch (formData.category) {
      case 'love': return selectedCard.meaning.love;
      case 'money': return selectedCard.meaning.money;
      case 'work': return selectedCard.meaning.work;
      case 'health': return selectedCard.meaning.health;
      default: return selectedCard.meaning.general;
    }
  };

  const getCategoryIcon = () => {
    switch (formData.category) {
      case 'love': return <Heart className="w-5 h-5" />;
      case 'money': return <Wallet className="w-5 h-5" />;
      case 'work': return <Briefcase className="w-5 h-5" />;
      case 'health': return <Activity className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getCategoryName = () => {
    switch (formData.category) {
      case 'love': return '연애/애정운';
      case 'money': return '재물/금전운';
      case 'work': return '직장/사업운';
      case 'health': return '건강/컨디션';
      default: return '오늘의 운세';
    }
  };

  // 카카오톡 공유 함수
  const handleKakaoShare = () => {
    if (!selectedCard) return;

    const shareUrl = window.location.href;
    const shareText = `🃏 오늘의 타로: ${selectedCard.name}\n\n"${selectedCard.advice}"\n\n나도 타로 보러가기 👉`;

    // 카카오톡 공유 링크 생성
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kakao = (window as any).Kakao;
    if (typeof window !== 'undefined' && kakao) {
      kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: `🃏 오늘의 타로: ${selectedCard.name}`,
          description: selectedCard.advice,
          imageUrl: 'https://forceteller.vercel.app/og-image.png',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '나도 타로 보기',
            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } else {
      // 카카오톡 SDK가 없으면 일반 공유
      if (navigator.share) {
        navigator.share({
          title: `🃏 오늘의 타로: ${selectedCard.name}`,
          text: shareText,
          url: shareUrl,
        });
      } else {
        alert('카카오톡 공유 기능을 사용하려면 모바일 앱에서 접속해주세요.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <AnimatePresence mode="wait">
        {/* 카드 섞는 중 */}
        {stage === 'shuffling' && (
          <motion.div
            key="shuffling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              className="text-8xl mb-8"
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🃏
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              카드를 섞고 있습니다...
            </h2>
            <p className="text-slate-400">
              마음을 집중하고 잠시 기다려주세요
            </p>
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-purple-500"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.2,
                    repeat: Infinity
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* 카드 선택 */}
        {stage === 'picking' && (
          <motion.div
            key="picking"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
              카드를 선택하세요
            </h2>
            <p className="text-slate-400 mb-8">
              끌리는 카드 한 장을 터치하세요
            </p>

            <div className="flex justify-center gap-4">
              {displayedCards.map((cardIndex, i) => (
                <motion.button
                  key={cardIndex}
                  onClick={() => handleCardPick(cardIndex)}
                  className="w-24 h-36 md:w-32 md:h-48 rounded-xl bg-gradient-to-br from-indigo-900 to-purple-900 border-2 border-purple-500/50 shadow-xl flex items-center justify-center cursor-pointer"
                  initial={{ opacity: 0, y: 50, rotateY: 180 }}
                  animate={{ opacity: 1, y: 0, rotateY: 180 }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.5)',
                    y: -10
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="text-4xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.div>
                </motion.button>
              ))}
            </div>

            <p className="text-slate-500 text-sm mt-6">
              직감을 믿으세요. 첫 번째로 끌리는 카드가 당신의 카드입니다.
            </p>
          </motion.div>
        )}

        {/* 카드 공개 중 */}
        {stage === 'revealing' && selectedCard && (
          <motion.div
            key="revealing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              className="w-40 h-56 md:w-48 md:h-72 mx-auto rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl flex items-center justify-center"
              initial={{ rotateY: 180, scale: 0.8 }}
              animate={{ rotateY: 0, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ transform: isReversed ? 'rotate(180deg)' : 'none' }}
            >
              <span className="text-6xl">{selectedCard.emoji}</span>
            </motion.div>
            <motion.p
              className="text-slate-400 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              카드가 공개됩니다...
            </motion.p>
          </motion.div>
        )}

        {/* 결과 화면 */}
        {stage === 'result' && selectedCard && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl"
          >
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-6">
              <motion.button
                onClick={onBack}
                className="p-2 rounded-full bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>

              <div className="flex gap-2">
                <motion.button
                  onClick={handleKakaoShare}
                  className="p-2 rounded-full bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={onReset}
                  className="p-2 rounded-full bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <RotateCcw className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* 오늘의 타로 헤더 */}
            <motion.div
              className="text-center mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1
                className="text-3xl md:text-4xl font-bold gradient-text mb-2"
                style={{ fontFamily: "'Noto Serif KR', serif" }}
              >
                🃏 오늘의 타로
              </h1>
              <p className="text-slate-400">
                22장의 메이저 아르카나가 전하는 오늘의 메시지
              </p>
            </motion.div>

            {/* 카드 정보 */}
            <motion.div
              className="glass-strong rounded-3xl p-6 md:p-8 text-center mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <motion.div
                  className={`w-32 h-44 md:w-40 md:h-56 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl flex items-center justify-center ${isReversed ? 'rotate-180' : ''}`}
                  animate={{ boxShadow: ['0 0 30px rgba(251, 191, 36, 0.3)', '0 0 50px rgba(251, 191, 36, 0.5)', '0 0 30px rgba(251, 191, 36, 0.3)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className={`text-5xl ${isReversed ? 'rotate-180' : ''}`}>{selectedCard.emoji}</span>
                </motion.div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                {selectedCard.name}
              </h2>
              {isReversed && (
                <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-sm rounded-full mb-3">
                  역방향
                </span>
              )}

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {selectedCard.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* 선택한 카테고리 결과 - 강조 */}
            <motion.div
              className="glass-strong rounded-3xl p-6 md:p-8 mb-6 border-2 border-purple-500/50 relative overflow-hidden"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* 배경 글로우 효과 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                  {getCategoryIcon()}
                </div>
                <div>
                  <span className="text-purple-400 text-xs font-medium">선택한 분야</span>
                  <h2 className="text-xl font-bold text-white">{getCategoryName()}</h2>
                </div>
              </div>
              <p className="text-slate-200 leading-relaxed text-lg">
                {isReversed ? selectedCard.reversed : getCategoryMessage()}
              </p>
            </motion.div>

            {/* 조언 */}
            <motion.div
              className="glass-strong rounded-3xl p-6 md:p-8 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">타로가 전하는 메시지</h2>
              </div>
              <p className="text-slate-300 leading-relaxed italic">
                &ldquo;{selectedCard.advice}&rdquo;
              </p>
            </motion.div>

            {/* 전체 해석 섹션 */}
            <motion.div
              className="glass-strong rounded-3xl p-6 md:p-8 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-bold text-white mb-6 text-center" style={{ fontFamily: "'Noto Serif KR', serif" }}>
                📖 분야별 상세 해석
              </h2>

              <div className="space-y-6">
                {/* 종합 운세 */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-bold text-purple-400 mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4" /> 종합 운세
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedCard.meaning.general}
                  </p>
                </div>

                {/* 연애운 */}
                <div className="border-l-4 border-pink-500 pl-4">
                  <h3 className="text-lg font-bold text-pink-400 mb-2 flex items-center gap-2">
                    <Heart className="w-4 h-4" /> 연애/애정운
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedCard.meaning.love}
                  </p>
                </div>

                {/* 재물운 */}
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> 재물/금전운
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedCard.meaning.money}
                  </p>
                </div>

                {/* 직장운 */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> 직장/사업운
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedCard.meaning.work}
                  </p>
                </div>

                {/* 건강운 */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-bold text-green-400 mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> 건강/컨디션
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedCard.meaning.health}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 역방향 해석 (해당 시) */}
            {isReversed && (
              <motion.div
                className="glass-strong rounded-3xl p-6 md:p-8 mb-6 border-2 border-red-500/30"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                  🔄 역방향 특별 메시지
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {selectedCard.reversed}
                </p>
                <p className="text-slate-400 text-sm mt-4">
                  역방향 카드는 해당 에너지가 막혀있거나 과잉되어 있음을 의미합니다.
                  위의 메시지를 참고하여 균형을 찾아보세요.
                </p>
              </motion.div>
            )}

            {/* 내보내기 버튼 */}
            <motion.div
              className="space-y-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadHtml}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-medium hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  <span>저장하기</span>
                </button>
                <button
                  onClick={handleSendEmail}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  <span>메일 보내기</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleKakaoShare}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-yellow-500 rounded-xl text-black font-medium hover:bg-yellow-400 transition-colors shadow-lg"
                >
                  <Share2 className="w-5 h-5" />
                  <span>카톡 공유</span>
                </button>
                <button
                  onClick={onReset}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>다시 뽑기</span>
                </button>
              </div>

              <button
                onClick={handleGoHome}
                className="w-full py-3 bg-slate-700/50 rounded-2xl text-slate-300 font-medium hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                홈으로
              </button>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
