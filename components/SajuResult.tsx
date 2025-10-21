'use client';

import { SajuResult as SajuResultType } from '@/lib/saju-calculator';
import { ELEMENTS } from '@/lib/saju-constants';

interface SajuResultProps {
  result: SajuResultType;
  name: string;
  gender: 'male' | 'female';
  onReset: () => void;
}

export default function SajuResult({ result, name, gender, onReset }: SajuResultProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-2">{name}님의 사주</h2>
        <p className="text-blue-100">
          {gender === 'male' ? '남자' : '여자'}
        </p>
      </div>

      {/* 사주 팔자 */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">사주 팔자</h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">구분</th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">시주<br/><span className="text-xs font-normal">(시간)</span></th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">일주<br/><span className="text-xs font-normal">(일)</span></th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">월주<br/><span className="text-xs font-normal">(월)</span></th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">년주<br/><span className="text-xs font-normal">(년)</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium bg-gray-50">천간</td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <div className="text-2xl font-bold" style={{ color: ELEMENTS[result.hour.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.hour.stem.ko}{result.hour.stem.cn}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{result.hour.stem.element}</div>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center bg-blue-50">
                  <div className="text-2xl font-bold" style={{ color: ELEMENTS[result.day.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.day.stem.ko}{result.day.stem.cn}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{result.day.stem.element}</div>
                  <div className="text-xs text-purple-600 mt-1 font-semibold">나</div>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <div className="text-2xl font-bold" style={{ color: ELEMENTS[result.month.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.month.stem.ko}{result.month.stem.cn}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{result.month.stem.element}</div>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <div className="text-2xl font-bold" style={{ color: ELEMENTS[result.year.stem.element as keyof typeof ELEMENTS].color }}>
                    {result.year.stem.ko}{result.year.stem.cn}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{result.year.stem.element}</div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium bg-gray-50">십성</td>
                <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-purple-600">
                  {result.tenGods.hour}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-purple-600 bg-blue-50">
                  {result.tenGods.day}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-purple-600">
                  {result.tenGods.month}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center text-sm font-medium text-purple-600">
                  {result.tenGods.year}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium bg-gray-50">지지</td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <div className="text-2xl font-bold" style={{ color: ELEMENTS[result.hour.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.hour.branch.ko}{result.hour.branch.cn}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{result.hour.branch.element} · {result.hour.branch.animal}</div>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center bg-blue-50">
                  <div className="text-2xl font-bold" style={{ color: ELEMENTS[result.day.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.day.branch.ko}{result.day.branch.cn}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{result.day.branch.element} · {result.day.branch.animal}</div>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <div className="text-2xl font-bold" style={{ color: ELEMENTS[result.month.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.month.branch.ko}{result.month.branch.cn}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{result.month.branch.element} · {result.month.branch.animal}</div>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  <div className="text-2xl font-bold" style={{ color: ELEMENTS[result.year.branch.element as keyof typeof ELEMENTS].color }}>
                    {result.year.branch.ko}{result.year.branch.cn}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{result.year.branch.element} · {result.year.branch.animal}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 오행 분석 */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">오행 분석</h3>

        <div className="space-y-4">
          {Object.entries(result.elements).map(([element, value]) => (
            <div key={element} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium" style={{ color: ELEMENTS[element as keyof typeof ELEMENTS].color }}>
                  {ELEMENTS[element as keyof typeof ELEMENTS].cn} ({element})
                </span>
                <span className="text-sm font-semibold">{value.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${value}%`,
                    backgroundColor: ELEMENTS[element as keyof typeof ELEMENTS].color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 신강/신약 */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">신강/신약 분석</h3>

        <div className="text-center">
          <div className={`inline-block px-8 py-4 rounded-xl text-2xl font-bold ${
            result.strength === 'strong'
              ? 'bg-red-100 text-red-700'
              : result.strength === 'weak'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {result.strength === 'strong' ? '신강 (强)' : result.strength === 'weak' ? '신약 (弱)' : '중화 (中)'}
          </div>
          <p className="mt-4 text-gray-600">
            {result.strength === 'strong' && '일간이 강한 사주입니다. 재성과 관성이 용신이 될 수 있습니다.'}
            {result.strength === 'weak' && '일간이 약한 사주입니다. 인성과 비겁이 용신이 될 수 있습니다.'}
            {result.strength === 'neutral' && '일간이 중화된 사주입니다.'}
          </p>
        </div>
      </div>

      {/* 다시 입력하기 버튼 */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition"
        >
          다시 입력하기
        </button>
      </div>
    </div>
  );
}
