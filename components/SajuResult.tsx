'use client';

import { SajuResult as SajuResultType } from '@/lib/saju-calculator';
import { ELEMENTS } from '@/lib/saju-constants';
import ElementsChart from './ElementsChart';
import { useState } from 'react';

interface SajuResultProps {
  result: SajuResultType;
  name: string;
  gender: 'male' | 'female';
  onReset: () => void;
}

export default function SajuResult({ result, name, gender, onReset }: SajuResultProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // 툴팁 정보
  const tooltips: Record<string, string> = {
    '종합평가': '사주의 전체적인 특징을 한눈에 볼 수 있는 요약입니다.',
    '일간성격': '일간(태어난 날의 천간)은 나 자신을 나타내며, 기본 성격과 적성을 보여줍니다.',
    '사주팔자': '년·월·일·시 네 기둥으로 태어난 시간의 우주 에너지를 나타냅니다.',
    '십성분석': '십성은 나와 다른 간지의 관계를 나타내며, 인생의 여러 측면을 보여줍니다.',
    '오행분석': '목·화·토·금·수 다섯 기운의 균형을 분석합니다.',
    '신강신약': '일간의 세력이 강한지 약한지 판단합니다.',
    '12운성': '일간이 각 기둥에서 어떤 생명 주기 단계에 있는지 나타냅니다.',
    '대운': '10년마다 바뀌는 큰 운의 흐름입니다.',
    '신살': '특별한 길흉의 별입니다.',
    '합충': '천간이나 지지 간의 조화와 충돌을 분석합니다.',
  };

  const Tooltip = ({ title }: { title: string }) => (
    <div className="relative inline-block">
      <button
        className="ml-2 w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs flex items-center justify-center hover:bg-gray-400 dark:hover:bg-gray-500 transition"
        onMouseEnter={() => setShowTooltip(title)}
        onMouseLeave={() => setShowTooltip(null)}
        onClick={(e) => {
          e.preventDefault();
          setShowTooltip(showTooltip === title ? null : title);
        }}
      >
        ?
      </button>
      {showTooltip === title && (
        <div className="absolute left-0 top-8 z-50 w-72 p-4 bg-gray-900 text-white text-sm rounded-xl shadow-2xl">
          <div className="absolute -top-2 left-4 w-4 h-4 bg-gray-900 transform rotate-45"></div>
          {tooltips[title]}
        </div>
      )}
    </div>
  );

  // 저장하기
  const handleSave = () => {
    const data = {
      name,
      gender,
      result,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(`saju_${Date.now()}`, JSON.stringify(data));
    alert('결과가 저장되었습니다!');
  };

  // SNS 공유
  const handleShare = async (platform: 'kakao' | 'facebook' | 'twitter') => {
    const text = `${name}님의 사주 - ${result.day.stem.ko}${result.day.stem.cn} 일간`;
    const url = window.location.href;

    if (platform === 'kakao') {
      alert('카카오톡 공유는 SDK 설정이 필요합니다.');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    }
  };

  // 이미지 다운로드 - 화면 그대로 저장 (고품질)
  const handleDownloadPDF = async () => {
    setIsSaving(true);
    try {
      const domtoimage = await import('dom-to-image-more');

      const element = document.getElementById('saju-result');
      if (!element) {
        console.error('저장 대상 요소를 찾을 수 없습니다.');
        setIsSaving(false);
        return;
      }

      // 버튼 숨기기
      const buttons = element.querySelectorAll('button');
      buttons.forEach(btn => (btn as HTMLElement).style.display = 'none');

      // 약간의 지연 후 캡처 (DOM 안정화)
      await new Promise(resolve => setTimeout(resolve, 300));

      // 고품질 PNG 생성 (dom-to-image는 색상을 완벽하게 재현)
      const dataUrl = await domtoimage.toPng(element, {
        quality: 1.0,
        bgcolor: '#ffffff',
        width: element.offsetWidth * 3,
        height: element.offsetHeight * 3,
        style: {
          transform: 'scale(3)',
          transformOrigin: 'top left',
          width: element.offsetWidth + 'px',
          height: element.offsetHeight + 'px'
        }
      });

      // 버튼 다시 보이기
      buttons.forEach(btn => (btn as HTMLElement).style.display = '');

      // 다운로드
      const link = document.createElement('a');
      const today = new Date().toISOString().split('T')[0];
      link.download = `${name}_사주풀이_${today}.png`;
      link.href = dataUrl;
      link.click();

      setIsSaving(false);
    } catch (error) {
      console.error('이미지 생성 오류:', error);
      if (error instanceof Error) {
        alert(`이미지 생성 실패: ${error.message}\n\n브라우저를 새로고침 후 다시 시도해주세요.`);
      } else {
        alert('이미지 생성 중 오류가 발생했습니다.\n브라우저를 새로고침 후 다시 시도해주세요.');
      }
      setIsSaving(false);
    }
  };

  return (
    <div id="saju-result" className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* 헤더 - 사용자 정보 */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-3">{name}님의 사주 풀이</h2>
              <div className="flex items-center gap-4 text-lg flex-wrap">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  {gender === 'male' ? '남자 👨' : '여자 👩'}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  {result.day.stem.ko}{result.day.stem.cn} 일간
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  {result.day.stem.element} {result.day.stem.yinyang === '+' ? '양' : '음'}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition"
                title="결과 저장"
              >
                💾 저장
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isSaving}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition disabled:opacity-50"
                title="이미지로 다운로드"
              >
                📸 {isSaving ? '생성중...' : '이미지'}
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-medium transition"
                title="공유하기"
              >
                🔗 공유
              </button>
              <button
                onClick={onReset}
                className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-opacity-90 transition"
              >
                다시 입력하기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 종합 평가 */}
      <div className="pdf-avoid-break bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-3xl shadow-xl p-8 border-2 border-amber-200 dark:border-amber-900">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">⭐ 종합 평가</h3>
          <Tooltip title="종합평가" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">일간 특성</div>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {result.dayPersonality.image}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {result.dayPersonality.personality.split('. ')[0]}.
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">신강/신약</div>
            <div className={`text-2xl font-bold mb-2 ${
              result.strength === 'strong' ? 'text-red-600 dark:text-red-400' :
              result.strength === 'weak' ? 'text-blue-600 dark:text-blue-400' :
              'text-gray-600 dark:text-gray-400'
            }`}>
              {result.strength === 'strong' ? '신강 🔥' : result.strength === 'weak' ? '신약 💧' : '중화 ⚖️'}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {result.strength === 'strong' && '일간이 강한 사주. 재성·관성이 용신'}
              {result.strength === 'weak' && '일간이 약한 사주. 인성·비겁이 용신'}
              {result.strength === 'neutral' && '균형 잡힌 중화 사주'}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-2xl shadow-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">용신 추천</div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {result.yongsin.split('(')[0]}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              필요한 기운을 보충하면 운이 좋아집니다
            </div>
          </div>
        </div>

        <div className="p-5 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">핵심 포인트</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                <strong>{result.day.stem.ko}{result.day.stem.cn} 일간</strong>은 {result.dayPersonality.image}처럼 {result.dayPersonality.strength.split(',')[0]}의 장점이 있습니다.
                십성 구성은 비겁 {result.tenGodsCount.비겁}, 식상 {result.tenGodsCount.식상}, 재성 {result.tenGodsCount.재성},
                관성 {result.tenGodsCount.관성}, 인성 {result.tenGodsCount.인성}개로 이루어져 있으며,
                {result.elementBalance.excess.length > 0 && ` ${result.elementBalance.excess.join('·')} 기운이 강하고`}
                {result.elementBalance.deficiency.length > 0 && ` ${result.elementBalance.deficiency.join('·')} 기운이 부족합니다.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 일간 성격 분석 */}
      <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">일간 성격 분석</h3>
          <Tooltip title="일간성격" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-5 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-4xl font-bold" style={{ color: ELEMENTS[result.day.stem.element as keyof typeof ELEMENTS].color }}>
                  {result.day.stem.ko}{result.day.stem.cn}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {result.day.stem.element} {result.day.stem.yinyang === '+' ? '양' : '음'}
                </div>
              </div>
              <div className="text-2xl font-semibold text-pink-700 dark:text-pink-300 mb-3">
                {result.dayPersonality.image}
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {result.dayPersonality.personality}
              </p>
            </div>

            <div className="p-5 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                <span>✨</span> 장점
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{result.dayPersonality.strength}</p>
            </div>

            <div className="p-5 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
              <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-2 flex items-center gap-2">
                <span>⚠️</span> 주의할 점
              </h4>
              <p className="text-gray-700 dark:text-gray-300">{result.dayPersonality.weakness}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                <span>💼</span> 적합한 직업
              </h4>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{result.dayPersonality.suitable}</p>
              <div className="space-y-2">
                {result.dayPersonality.suitable.split(',').map((job, idx) => (
                  <div key={idx} className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm mr-2 mb-2">
                    {job.trim()}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl">
              <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                <span>🎯</span> 성공 전략
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>장점인 {result.dayPersonality.strength.split(',')[0]}을(를) 최대한 활용하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{result.dayPersonality.weakness.split(',')[0]}을(를) 보완하도록 노력하세요</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>용신인 {result.yongsin.split('(')[0]} 기운을 보충하세요</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 사주 팔자 */}
      <div className="pdf-page-break-before pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 md:p-10 card-hover">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">사주 팔자</h3>
          <Tooltip title="사주팔자" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600">
                <th className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 text-left font-bold text-gray-700 dark:text-gray-200">구분</th>
                <th className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200">
                  시주<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">時柱</span>
                </th>
                <th className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 text-center font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30">
                  일주<br/>
                  <span className="text-xs font-normal text-indigo-500 dark:text-indigo-400">日柱 (나)</span>
                </th>
                <th className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200">
                  월주<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">月柱</span>
                </th>
                <th className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 text-center font-bold text-gray-700 dark:text-gray-200">
                  년주<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">年柱</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 font-bold bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  천간<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">天干</span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.hour.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.hour.stem.ko}<span className="text-2xl">{result.hour.stem.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.hour.stem.element} {result.hour.stem.yinyang}</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center bg-indigo-50 dark:bg-indigo-900/20">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.day.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.day.stem.ko}<span className="text-2xl">{result.day.stem.cn}</span>
                  </div>
                  <div className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">일간 (자신)</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.month.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.month.stem.ko}<span className="text-2xl">{result.month.stem.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.month.stem.element} {result.month.stem.yinyang}</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.year.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.year.stem.ko}<span className="text-2xl">{result.year.stem.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.year.stem.element} {result.year.stem.yinyang}</div>
                </td>
              </tr>
              <tr>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 font-bold bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  십성<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">十星</span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-3 text-center">
                  <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-semibold">
                    {result.tenGods.hour}
                  </span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-3 text-center bg-indigo-50 dark:bg-indigo-900/20">
                  <span className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-lg font-semibold">
                    {result.tenGods.day}
                  </span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-3 text-center">
                  <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-semibold">
                    {result.tenGods.month}
                  </span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-3 text-center">
                  <span className="inline-block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-semibold">
                    {result.tenGods.year}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-4 font-bold bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  지지<br/>
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400">地支</span>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.hour.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.hour.branch.ko}<span className="text-2xl">{result.hour.branch.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.hour.branch.element} · {result.hour.branch.animal}</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center bg-indigo-50 dark:bg-indigo-900/20">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.day.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.day.branch.ko}<span className="text-2xl">{result.day.branch.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.day.branch.element} · {result.day.branch.animal}</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.month.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.month.branch.ko}<span className="text-2xl">{result.month.branch.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.month.branch.element} · {result.month.branch.animal}</div>
                </td>
                <td className="border-2 border-gray-200 dark:border-gray-600 px-6 py-5 text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: ELEMENTS[result.year.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.year.branch.ko}<span className="text-2xl">{result.year.branch.cn}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{result.year.branch.element} · {result.year.branch.animal}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 오행 분석 (전체 폭) */}
      <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">오행 분석</h3>
          <Tooltip title="오행분석" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 레이더 차트 */}
          <div>
            <ElementsChart elements={result.elements} />
          </div>

          {/* 바 차트 */}
          <div className="space-y-6">
            {Object.entries(result.elements).map(([element, value]) => (
              <div key={element} className="space-y-2 animate-slide-in">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold" style={{ color: ELEMENTS[element as keyof typeof ELEMENTS].color }}>
                      {ELEMENTS[element as keyof typeof ELEMENTS].cn}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {element}
                    </span>
                  </div>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-300">{value.toFixed(1)}%</span>
                </div>
                <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${value}%`,
                      background: `linear-gradient(90deg, ${ELEMENTS[element as keyof typeof ELEMENTS].color}, ${ELEMENTS[element as keyof typeof ELEMENTS].color}dd)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* 신강/신약 판단 */}
        <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">신강/신약 분석</h3>
            <Tooltip title="신강신약" />
          </div>

          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className={`relative inline-flex items-center justify-center w-40 h-40 rounded-full text-3xl font-bold shadow-2xl ${
              result.strength === 'strong'
                ? 'bg-gradient-to-br from-red-400 to-orange-500 text-white'
                : result.strength === 'weak'
                ? 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white'
                : 'bg-gradient-to-br from-gray-400 to-gray-600 text-white'
            }`}>
              <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse"></div>
              <span className="relative z-10">
                {result.strength === 'strong' ? '신강' : result.strength === 'weak' ? '신약' : '중화'}
              </span>
            </div>

            <div className="text-center space-y-3">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {result.strength === 'strong' && '일간이 강한 사주입니다'}
                {result.strength === 'weak' && '일간이 약한 사주입니다'}
                {result.strength === 'neutral' && '일간이 중화된 사주입니다'}
              </p>
              <div className={`inline-block px-6 py-3 rounded-xl ${
                result.strength === 'strong'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  : result.strength === 'weak'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {result.strength === 'strong' && '재성(財星)과 관성(官星)이 용신이 될 수 있습니다'}
                {result.strength === 'weak' && '인성(印星)과 비겁(比劫)이 용신이 될 수 있습니다'}
                {result.strength === 'neutral' && '균형잡힌 사주입니다'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 12운성 */}
      <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">12운성</h3>
          <Tooltip title="12운성" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">시주</p>
            <p className="font-bold text-purple-700 dark:text-purple-300">{result.twelveCycles.hour}</p>
          </div>
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">일주 (나)</p>
            <p className="font-bold text-indigo-700 dark:text-indigo-300">{result.twelveCycles.day}</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">월주</p>
            <p className="font-bold text-purple-700 dark:text-purple-300">{result.twelveCycles.month}</p>
          </div>
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">년주</p>
            <p className="font-bold text-purple-700 dark:text-purple-300">{result.twelveCycles.year}</p>
          </div>
        </div>
      </div>

      {/* 대운 */}
      <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">대운 (大運)</h3>
          <Tooltip title="대운" />
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {result.daeun.slice(0, 6).map((daeun, idx) => (
              <div key={idx} className="flex-shrink-0 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl min-w-[100px] text-center">
                <p className="text-xs text-gray-500 mb-2">{daeun.age}세~</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {daeun.stem.ko}{daeun.stem.cn}
                </p>
                <p className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  {daeun.branch.ko}{daeun.branch.cn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 신살 & 합충 */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* 신살 */}
        <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">신살</h3>
            <Tooltip title="신살" />
          </div>

          {result.shinsals.length > 0 ? (
            <div className="space-y-3">
              {result.shinsals.map((shinsal, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${
                  shinsal.type === 'good'
                    ? 'bg-green-50 dark:bg-green-900/20'
                    : shinsal.type === 'bad'
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}>
                  <p className={`font-bold ${
                    shinsal.type === 'good'
                      ? 'text-green-700 dark:text-green-300'
                      : shinsal.type === 'bad'
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>{shinsal.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{shinsal.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">특별한 신살이 없습니다</p>
          )}
        </div>

        {/* 합충 */}
        <div className="pdf-avoid-break bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">합충형파해</h3>
            <Tooltip title="합충" />
          </div>

          {result.hapchung.length > 0 ? (
            <div className="space-y-3">
              {result.hapchung.map((hap, idx) => (
                <div key={idx} className={`p-4 rounded-xl ${
                  hap.type === '지지충'
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : 'bg-blue-50 dark:bg-blue-900/20'
                }`}>
                  <p className={`font-bold ${
                    hap.type === '지지충'
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-blue-700 dark:text-blue-300'
                  }`}>{hap.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{hap.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">합충이 없습니다</p>
          )}
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-2 pt-8">
        <p>이 사주 풀이는 전통적인 명리학 계산 방식을 기반으로 합니다</p>
        <p>더 정확한 해석을 원하시면 전문가와 상담하시기 바랍니다</p>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
          <p className="font-semibold text-indigo-600 dark:text-indigo-400">포스텔러 만세력 v2.3.0</p>
          <p className="text-xs mt-1 text-gray-400">Build: {new Date().toISOString().split('T')[0]} | PDF Download & Share Features Enabled</p>
        </div>
      </div>
    </div>
  );
}
