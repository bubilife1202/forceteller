'use client';

import { motion } from 'framer-motion';
import { SajuResult } from '@/lib/saju-calculator';
import { AlertTriangle, XCircle, Ban, ShieldAlert } from 'lucide-react';

interface MovingAvoidProps {
  result: SajuResult;
  name: string;
  birthDate?: Date;
}

export default function MovingAvoid({ result, name }: MovingAvoidProps) {
  const dayElement = result.day.stem.element;

  // 피해야 할 방위
  const getAvoidDirections = () => {
    const badDirections = [];

    // 오행 상극 방위
    if (dayElement === '목') {
      badDirections.push({ name: '서쪽', reason: '금극목 - 목을 극하는 금 방위', severity: 'high' });
    } else if (dayElement === '화') {
      badDirections.push({ name: '북쪽', reason: '수극화 - 화를 극하는 수 방위', severity: 'high' });
    } else if (dayElement === '토') {
      badDirections.push({ name: '동쪽', reason: '목극토 - 토를 극하는 목 방위', severity: 'medium' });
    } else if (dayElement === '금') {
      badDirections.push({ name: '남쪽', reason: '화극금 - 금을 극하는 화 방위', severity: 'high' });
    } else if (dayElement === '수') {
      badDirections.push({ name: '중앙', reason: '토극수 - 수를 극하는 토 방위', severity: 'medium' });
    }

    return badDirections;
  };

  const avoidDirections = getAvoidDirections();

  // 피해야 할 시기
  const getAvoidMonths = () => {
    const badMonths = [];

    if (dayElement === '목') {
      badMonths.push({ month: '8-9월', reason: '가을 금 기운 왕성', element: '금' });
    } else if (dayElement === '화') {
      badMonths.push({ month: '11-12월', reason: '겨울 수 기운 왕성', element: '수' });
    } else if (dayElement === '토') {
      badMonths.push({ month: '2-4월', reason: '봄 목 기운 왕성', element: '목' });
    } else if (dayElement === '금') {
      badMonths.push({ month: '5-6월', reason: '여름 화 기운 왕성', element: '화' });
    } else if (dayElement === '수') {
      badMonths.push({ month: '7월, 10월', reason: '환절기 토 기운 왕성', element: '토' });
    }

    return badMonths;
  };

  const avoidMonths = getAvoidMonths();

  // 풍수 금기 사항
  const getFengshuiTaboos = () => {
    return [
      {
        title: '흉한 도로 형태',
        items: [
          'Y자형 도로 끝 집 - 기가 분산됨',
          'T자형 도로 정면 집 - 살기가 직접 침입',
          '막다른 골목 끝 - 기 순환 불량',
          '고가도로 바로 앞 - 소음과 흉살',
        ],
        icon: '🚫',
        color: 'from-red-500 to-rose-600',
      },
      {
        title: '주변 흉한 건물',
        items: [
          '병원, 장례식장 인근 - 음기가 강함',
          '교도소, 경찰서 정면 - 관재수',
          '고압 송전탑 근처 - 전자파와 흉살',
          '쓰레기 처리장 근처 - 불결한 기운',
        ],
        icon: '🏢',
        color: 'from-orange-500 to-amber-600',
      },
      {
        title: '지형 금기',
        items: [
          '산이 뒤에서 압박하는 형태 - 압살',
          '물이 정면에서 직선으로 흐름 - 재물 유출',
          '높은 빌딩 사이 협소한 곳 - 천참살',
          '묘지나 화장터 근처 - 극음지',
        ],
        icon: '⛰️',
        color: 'from-purple-500 to-violet-600',
      },
      {
        title: '집 구조 금기',
        items: [
          '현관이 화장실과 마주봄 - 재물 유실',
          '침실 문이 침대와 일직선 - 건강 해침',
          '거울이 침대를 비춤 - 불면과 불안',
          '주방이 현관 바로 보임 - 재물 외부 유출',
        ],
        icon: '🏠',
        color: 'from-blue-500 to-cyan-600',
      },
    ];
  };

  const fengshuiTaboos = getFengshuiTaboos();

  // 이사 시 주의사항
  const getMovingWarnings = () => {
    return [
      {
        title: '계약 전 필수 확인',
        warnings: [
          '등기부등본 깼끔히 확인 (근저당, 가압류 등)',
          '전입세대 열람으로 이전 세대 확인',
          '관리비 연체 여부 확인',
          '재개발/재건축 지역 여부',
        ],
      },
      {
        title: '이사 당일 주의',
        warnings: [
          '아침 일찍 시작 (양기가 왕성할 때)',
          '손 없는 날, 대길일 선택',
          '집주인과 다툼 피하기',
          '이사 첫날 쌀, 소금 먼저 들이기',
        ],
      },
      {
        title: '입주 후 주의',
        warnings: [
          '3일 이내 인사 돌기 (이웃 관계)',
          '첫 주는 청소와 정화 집중',
          '과한 소음 자제 (아래층 배려)',
          '불필요한 공사는 1개월 후',
        ],
      },
    ];
  };

  const movingWarnings = getMovingWarnings();

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
        ⚠️ 피해야 할 방위/시기
      </h2>
      <p className="text-center text-slate-400 mb-8">
        {name}님이 주의해야 할 이사 금기 사항
      </p>

      {/* 피해야 할 방위 */}
      {avoidDirections.length > 0 && (
        <div className="glass rounded-2xl p-6 mb-8 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <Ban className="w-6 h-6" />
            피해야 할 방위
          </h3>
          <div className="space-y-3">
            {avoidDirections.map((dir, index) => (
              <motion.div
                key={dir.name}
                className={`p-4 rounded-xl ${
                  dir.severity === 'high' ? 'bg-red-500/20 border border-red-500/40' : 'bg-orange-500/20 border border-orange-500/40'
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <XCircle className={`w-6 h-6 ${dir.severity === 'high' ? 'text-red-400' : 'text-orange-400'}`} />
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">{dir.name}</h4>
                    <p className="text-sm text-slate-300">{dir.reason}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    dir.severity === 'high' ? 'bg-red-500/30 text-red-300' : 'bg-orange-500/30 text-orange-300'
                  }`}>
                    {dir.severity === 'high' ? '강력 주의' : '주의'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 피해야 할 시기 */}
      {avoidMonths.length > 0 && (
        <div className="glass rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            피해야 할 시기
          </h3>
          <div className="space-y-3">
            {avoidMonths.map((m, index) => (
              <motion.div
                key={m.month}
                className="p-4 rounded-xl bg-orange-500/20 border border-orange-500/40"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-500/30 flex items-center justify-center">
                    <ShieldAlert className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">{m.month}</h4>
                    <p className="text-sm text-slate-300">{m.reason}</p>
                    <p className="text-xs text-slate-500 mt-1">상극 오행: {m.element}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 풍수 금기 사항 */}
      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
          <Ban className="w-6 h-6" />
          풍수 금기 사항
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {fengshuiTaboos.map((category, index) => (
            <motion.div
              key={category.title}
              className="glass-strong rounded-xl p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl`}>
                  {category.icon}
                </div>
                <h4 className="font-bold text-white">{category.title}</h4>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 이사 시 주의사항 */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
          <ShieldAlert className="w-6 h-6" />
          이사 단계별 주의사항
        </h3>
        <div className="space-y-4">
          {movingWarnings.map((section, index) => (
            <motion.div
              key={section.title}
              className="p-5 bg-slate-800/50 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                  {index + 1}
                </div>
                {section.title}
              </h4>
              <ul className="space-y-2 ml-10">
                {section.warnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 rounded-xl">
          <p className="text-slate-300 text-sm leading-relaxed">
            💡 <span className="font-bold">중요:</span> 금기 사항을 지나치게 두려워할 필요는 없습니다.
            다만 선택권이 있다면 피하는 것이 좋고, 불가피한 경우 다른 긍정적 요소로 보완할 수 있습니다.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
