'use client';

import { SajuResult } from '@/lib/saju-calculator';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

interface CareerTimingProps {
  result: SajuResult;
  name: string;
  birthDate: Date;
}

const STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
const TEN_GODS = ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'];

const TEN_GOD_JOB_CHANGE: Record<string, {
  timing: string;
  advice: string;
  risk: string;
  opportunity: string;
  month: string[];
}> = {
  '비견': {
    timing: '경쟁이 심한 시기로, 이직보다는 현 직장에서 실력을 키우는 것이 유리합니다.',
    advice: '동료와의 경쟁에서 우위를 점하는 것이 중요합니다.',
    risk: '이직 시 경쟁자가 많아 기회를 놓칠 수 있습니다.',
    opportunity: '팀 프로젝트나 협업을 통한 성과가 기회입니다.',
    month: ['3월', '6월', '9월']
  },
  '겁재': {
    timing: '변동성이 큰 시기로, 신중한 판단이 필요합니다.',
    advice: '충동적인 결정은 피하고, 충분히 준비 후 움직이세요.',
    risk: '급한 이직은 더 불리한 조건으로 이어질 수 있습니다.',
    opportunity: '기존 인맥을 통한 이직 기회를 노리세요.',
    month: ['4월', '7월', '10월']
  },
  '식신': {
    timing: '창의적 능력이 인정받는 시기로, 새로운 기회가 열립니다.',
    advice: '자신의 아이디어와 기획력을 어필하세요.',
    risk: '안정적인 직장보다 창업에 눈이 갈 수 있습니다.',
    opportunity: '포트폴리오를 정리하고 자신을 어필할 때입니다.',
    month: ['2월', '5월', '8월', '11월']
  },
  '상관': {
    timing: '표현력이 극대화되는 시기로, 면접에서 좋은 인상을 줍니다.',
    advice: '자신감 있게 의견을 표현하되, 과도한 주장은 조심하세요.',
    risk: '상사와의 마찰로 인한 돌발 퇴사 가능성이 있습니다.',
    opportunity: '프리랜서나 개인 사업으로의 전환을 고려해볼 때입니다.',
    month: ['1월', '4월', '7월', '10월']
  },
  '편재': {
    timing: '재물운과 함께 새로운 기회가 오는 시기입니다.',
    advice: '연봉 협상에서 유리한 위치를 점할 수 있습니다.',
    risk: '돈에만 집중하면 장기적 커리어를 놓칠 수 있습니다.',
    opportunity: '영업, 사업개발 분야로의 이직이 유리합니다.',
    month: ['3월', '6월', '9월', '12월']
  },
  '정재': {
    timing: '안정적인 직장 이동에 좋은 시기입니다.',
    advice: '급여와 복지 조건을 꼼꼼히 비교하세요.',
    risk: '지나친 안정 추구로 성장 기회를 놓칠 수 있습니다.',
    opportunity: '대기업이나 공기업 이직에 유리한 시기입니다.',
    month: ['2월', '5월', '8월', '11월']
  },
  '편관': {
    timing: '도전과 경쟁의 시기로, 승부를 걸어볼 만합니다.',
    advice: '실력으로 승부하고, 정치적 감각도 발휘하세요.',
    risk: '무리한 도전은 좌절로 이어질 수 있습니다.',
    opportunity: '관리직이나 리더십 포지션 기회가 열립니다.',
    month: ['1월', '4월', '7월', '10월']
  },
  '정관': {
    timing: '승진과 이직에 모두 유리한 최적의 시기입니다.',
    advice: '현 직장 승진과 외부 이직 기회를 함께 고려하세요.',
    risk: '너무 많은 기회에 분산될 수 있습니다.',
    opportunity: '경력에 도움이 되는 최적의 선택을 할 수 있는 시기입니다.',
    month: ['3월', '6월', '9월', '12월']
  },
  '편인': {
    timing: '학습과 자격 취득에 좋은 시기로, 실력을 쌓을 때입니다.',
    advice: '이직보다는 역량 개발에 집중하세요.',
    risk: '준비 없는 이직은 어려움을 겪을 수 있습니다.',
    opportunity: '자격증이나 학위 취득 후 이직하면 좋습니다.',
    month: ['2월', '5월', '8월', '11월']
  },
  '정인': {
    timing: '멘토나 후원자를 통한 기회가 열리는 시기입니다.',
    advice: '좋은 조언자의 도움을 받아 신중히 결정하세요.',
    risk: '남의 말에 너무 의존하면 자신의 길을 잃을 수 있습니다.',
    opportunity: '추천이나 헤드헌팅을 통한 이직이 유리합니다.',
    month: ['1월', '4월', '7월', '10월']
  }
};

export default function CareerTiming({ result, name, birthDate }: CareerTimingProps) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthDate.getFullYear() + 1;
  const dayStem = result.day.stem.ko;

  // 현재 대운 찾기
  const currentDaeun = result.daeun.find(d => d.age <= age && age < d.age + 10);

  // 십성 계산
  const calculateTenGod = (targetStem: string): string => {
    const dayIndex = STEMS.indexOf(dayStem);
    const targetIndex = STEMS.indexOf(targetStem);
    if (dayIndex === -1 || targetIndex === -1) return '비견';
    const diff = (targetIndex - dayIndex + 10) % 10;
    return TEN_GODS[diff];
  };

  const yearTenGod = result.tenGods.year;
  const daeunTenGod = currentDaeun ? calculateTenGod(currentDaeun.stem.ko) : '비견';

  const yearJobChange = TEN_GOD_JOB_CHANGE[yearTenGod] || TEN_GOD_JOB_CHANGE['비견'];
  const daeunJobChange = TEN_GOD_JOB_CHANGE[daeunTenGod] || TEN_GOD_JOB_CHANGE['비견'];

  // 이직 적합도 점수
  const calculateJobChangeScore = () => {
    let score = 50;
    if (['정관', '편재', '정재', '식신'].includes(yearTenGod)) score += 20;
    if (['정관', '편재', '정재'].includes(daeunTenGod)) score += 15;
    if (['겁재', '상관', '편인'].includes(yearTenGod)) score -= 10;
    if (['겁재', '상관'].includes(daeunTenGod)) score -= 8;
    return Math.min(Math.max(score, 20), 95);
  };

  const jobChangeScore = calculateJobChangeScore();

  const getScoreColor = () => {
    if (jobChangeScore >= 75) return { text: 'text-emerald-400', bg: 'bg-emerald-500/20' };
    if (jobChangeScore >= 55) return { text: 'text-blue-400', bg: 'bg-blue-500/20' };
    if (jobChangeScore >= 40) return { text: 'text-amber-400', bg: 'bg-amber-500/20' };
    return { text: 'text-rose-400', bg: 'bg-rose-500/20' };
  };

  const scoreColor = getScoreColor();

  // 향후 5년 이직 운세
  const futureYears = [];
  for (let i = 0; i < 5; i++) {
    const yearStem = STEMS[(currentYear + i + 6) % 10];
    const tenGod = calculateTenGod(yearStem);
    const score = ['정관', '편재', '정재', '식신'].includes(tenGod) ? 'good' :
                  ['겁재', '상관', '편인'].includes(tenGod) ? 'caution' : 'neutral';
    futureYears.push({
      year: currentYear + i,
      stem: yearStem,
      tenGod,
      score
    });
  }

  return (
    <motion.section
      className="glass-strong rounded-3xl p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
          <Clock className="w-7 h-7 text-amber-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            전직/이직 최적 시기
          </h2>
          <p className="text-slate-400 text-sm">{name}님의 {currentYear}년 이직 타이밍</p>
        </div>
      </div>

      {/* 이직 적합도 점수 */}
      <div className={`glass rounded-2xl p-6 mb-6 ${scoreColor.bg}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-slate-400 mb-1">현재 이직 적합도</p>
            <div className="flex items-end gap-2">
              <span className={`text-4xl font-bold ${scoreColor.text}`}>{jobChangeScore}</span>
              <span className="text-lg text-slate-400 mb-1">점</span>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-400 text-sm">올해 운: {yearTenGod}</p>
            <p className="text-slate-400 text-sm">대운: {daeunTenGod}</p>
          </div>
        </div>
      </div>

      {/* 올해 이직운 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          {currentYear}년 이직 타이밍 분석
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/30">
            <p className="text-cyan-300 font-medium mb-2">📅 시기 판단</p>
            <p className="text-slate-300 text-sm leading-relaxed">{yearJobChange.timing}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-500/10 rounded-xl">
              <p className="text-emerald-400 font-medium mb-2 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> 기회
              </p>
              <p className="text-slate-300 text-sm">{yearJobChange.opportunity}</p>
            </div>
            <div className="p-4 bg-rose-500/10 rounded-xl">
              <p className="text-rose-400 font-medium mb-2 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> 주의
              </p>
              <p className="text-slate-300 text-sm">{yearJobChange.risk}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 대운으로 본 이직운 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-white mb-4">🌊 대운으로 본 장기 이직운</h3>
        <p className="text-slate-300 leading-relaxed mb-4">{daeunJobChange.timing}</p>
        <p className="text-amber-300 text-sm">💡 조언: {daeunJobChange.advice}</p>
      </div>

      {/* 향후 5년 이직 타이밍 */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h3 className="font-bold text-white mb-4">📊 향후 5년 이직 타이밍</h3>
        <div className="flex flex-wrap gap-3">
          {futureYears.map((year, idx) => (
            <motion.div
              key={idx}
              className={`px-4 py-3 rounded-xl border ${
                year.score === 'good' ? 'border-emerald-500/50 bg-emerald-500/10' :
                year.score === 'caution' ? 'border-rose-500/50 bg-rose-500/10' :
                'border-slate-500/50 bg-slate-500/10'
              }`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <p className="font-bold text-white">{year.year}년</p>
              <p className={`text-sm ${
                year.score === 'good' ? 'text-emerald-400' :
                year.score === 'caution' ? 'text-rose-400' :
                'text-slate-400'
              }`}>
                {year.tenGod}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 추천 이직 월 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-purple-400" />
          올해 추천 이직/전직 월
        </h3>
        <div className="flex flex-wrap gap-2">
          {yearJobChange.month.map((month, idx) => (
            <span key={idx} className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-500/30">
              {month}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
