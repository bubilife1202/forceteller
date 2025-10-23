'use client';

import Link from 'next/link';
import AdSense from '@/components/AdSense';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-12 px-4">
      <div className="w-full max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            사주 용어 설명
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            사주 풀이 결과를 이해하기 위한 기본 용어들을 설명합니다
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition"
          >
            ← 돌아가기
          </Link>
        </div>

        {/* 용어 설명 섹션들 */}
        <div className="space-y-6">
          {/* 사주팔자 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
              사주팔자 (四柱八字)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              년(年)·월(月)·일(日)·시(時) 네 기둥으로 태어난 시간의 우주 에너지를 나타냅니다.
              각 기둥은 천간(天干, 하늘)과 지지(地支, 땅) 두 글자로 구성되어 총 8글자가 됩니다.
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">천간 (天干)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  갑(甲)·을(乙)·병(丙)·정(丁)·무(戊)·기(己)·경(庚)·신(辛)·임(壬)·계(癸) 10개.
                  하늘의 기운을 나타내며, 양(陽)과 음(陰)이 번갈아 나타납니다.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">지지 (地支)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  자(子)·축(丑)·인(寅)·묘(卯)·진(辰)·사(巳)·오(午)·미(未)·신(申)·유(酉)·술(戌)·해(亥) 12개.
                  땅의 기운이자 12띠 동물을 나타냅니다.
                </p>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                <h3 className="font-bold text-pink-700 dark:text-pink-300 mb-2">십성 (十星)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  나(일간)를 기준으로 다른 천간이 어떤 의미인지 보여줍니다.
                  비견·겁재(형제), 식신·상관(표현), 편재·정재(재물), 편관·정관(직장), 편인·정인(학문) 등이 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 오행분석 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">
              오행 분석 (五行)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              목(木)·화(火)·토(土)·금(金)·수(水) 다섯 기운의 균형을 분석합니다.
              오행은 서로 생(生)하거나 극(剋)하는 관계를 가지며, 균형이 중요합니다.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">목 (木) - 나무</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">성장, 확장, 창의성, 인자함. 봄의 기운</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">화 (火) - 불</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">열정, 활동, 명예, 예의. 여름의 기운</p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">토 (土) - 흙</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">중재, 신용, 안정, 포용. 환절기의 기운</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2">금 (金) - 쇠</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">의리, 결단, 정의, 강직함. 가을의 기운</p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">수 (水) - 물</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">지혜, 유연, 지략, 침착함. 겨울의 기운</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">상생(相生) 관계</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                목→화→토→금→수→목 순서로 서로를 도와줍니다. (나무는 불을 피우고, 불은 재가 되어 흙을 만들고...)
              </p>
            </div>
          </div>

          {/* 신강신약 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-orange-600 dark:text-orange-400">
              신강/신약 (身强/身弱)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              일간(나)의 세력이 강한지 약한지 판단합니다. 사주 팔자 안에서 나를 돕는 기운이 많으면 신강, 적으면 신약입니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl border-2 border-red-200 dark:border-red-800">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-3 text-xl">신강 (身强)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  나를 돕는 기운(비겁·인성)이 많아 일간이 강한 상태입니다.
                </p>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                  용신: 재성(재물), 관성(직장·명예), 식상(표현·재능)이 좋습니다.
                </p>
              </div>
              <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-3 text-xl">신약 (身弱)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  나를 돕는 기운이 적어 일간이 약한 상태입니다.
                </p>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  용신: 인성(학문·어른), 비겁(형제·동료)이 도움이 됩니다.
                </p>
              </div>
            </div>
          </div>

          {/* 12운성 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-400">
              12운성 (十二運星)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              일간이 각 기둥(년·월·일·시)에서 어떤 생명 주기 단계에 있는지 나타냅니다.
              사람의 인생을 12단계로 나눈 것과 같습니다.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <p className="font-bold text-green-700 dark:text-green-300">장생</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">새 생명의 시작</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <p className="font-bold text-blue-700 dark:text-blue-300">목욕</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">성장과 변화</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                <p className="font-bold text-purple-700 dark:text-purple-300">관대</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">성년, 왕성함</p>
              </div>
              <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-center">
                <p className="font-bold text-pink-700 dark:text-pink-300">건록</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">왕성한 활동</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                <p className="font-bold text-red-700 dark:text-red-300">제왕</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">정점, 최고조</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                <p className="font-bold text-orange-700 dark:text-orange-300">쇠</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">쇠퇴 시작</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                <p className="font-bold text-yellow-700 dark:text-yellow-300">병</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">약해짐</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                <p className="font-bold text-gray-700 dark:text-gray-300">사</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">소멸</p>
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
                <p className="font-bold text-indigo-700 dark:text-indigo-300">묘</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">무덤, 잠복</p>
              </div>
              <div className="p-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg text-center">
                <p className="font-bold text-violet-700 dark:text-violet-300">절</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">끊어짐</p>
              </div>
              <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg text-center">
                <p className="font-bold text-cyan-700 dark:text-cyan-300">태</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">태아, 준비</p>
              </div>
              <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg text-center">
                <p className="font-bold text-teal-700 dark:text-teal-300">양</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">자양, 성장 준비</p>
              </div>
            </div>
          </div>

          {/* 대운 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              대운 (大運)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              10년마다 바뀌는 큰 운의 흐름입니다. 태어난 월주를 기준으로 순행 또는 역행하며 계산됩니다.
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">순행 (順行)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  양년생 남자, 음년생 여자는 월주에서 다음 간지로 순서대로 진행합니다.
                </p>
              </div>
              <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
                <h3 className="font-bold text-cyan-700 dark:text-cyan-300 mb-2">역행 (逆行)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  양년생 여자, 음년생 남자는 월주에서 이전 간지로 거꾸로 진행합니다.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">대운의 중요성</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  각 대운마다 영향을 주는 천간·지지가 달라 인생의 전환기를 예측할 수 있습니다.
                  좋은 대운이 오면 기회를 잡기 좋고, 나쁜 대운에는 조심해야 합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 신살 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-yellow-600 dark:text-yellow-400">
              신살 (神殺)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              사주에 특별한 의미를 부여하는 길성(吉星)과 흉성(凶星)입니다.
              신살이 있다고 해서 절대적인 것은 아니며, 참고용으로 활용합니다.
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">천을귀인 (天乙貴人)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  귀인의 도움을 받는 별. 어려울 때 도움을 받거나 귀인을 만날 가능성이 높습니다.
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">역마살 (驛馬殺)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  이동과 변화가 많은 별. 여행, 이사, 직장 이동 등이 잦을 수 있습니다.
                </p>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl border-l-4 border-pink-500">
                <h3 className="font-bold text-pink-700 dark:text-pink-300 mb-2">도화살 (桃花殺)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  이성운과 인기가 있는 별. 사교성이 좋고 매력적이지만, 이성 문제에 주의가 필요할 수 있습니다.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-l-4 border-purple-500">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">문창귀인 (文昌貴人)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  학문과 예술의 별. 공부를 잘하거나 문학·예술 방면에 재능이 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 합충 */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 card-hover">
            <h2 className="text-3xl font-bold mb-4 text-pink-600 dark:text-pink-400">
              합충형파해 (合沖刑破害)
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              천간이나 지지 간의 조화와 충돌을 분석합니다. 합(合)은 조화를, 충(沖)은 변화·충돌을 의미합니다.
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">천간합 (天干合)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  갑+기, 을+경, 병+신, 정+임, 무+계 조합. 서로 화합하여 새로운 오행으로 변화합니다.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  예: 갑기합화토 (갑+기 → 토로 변화)
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">지지합 (地支合)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  자+축, 인+해, 묘+술, 진+유, 사+신, 오+미 조합. 육합(六合)이라고 하며 서로 돕는 관계입니다.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">삼합 (三合)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  세 지지가 합하여 하나의 오행을 이루는 것. 매우 강한 조화입니다.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  예: 인+오+술=화, 해+묘+미=목, 사+유+축=금, 신+자+진=수
                </p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">지지충 (地支沖)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  자↔오, 축↔미, 인↔신, 묘↔유, 진↔술, 사↔해 조합. 정면으로 충돌하는 관계로 변화나 갈등을 의미합니다.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  충은 나쁜 것만은 아니며, 변화와 발전의 계기가 되기도 합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 광고 */}
        <div className="my-8">
          <AdSense
            adSlot="9952740191"
            className="text-center"
          />
        </div>

        {/* 하단 안내 */}
        <div className="text-center mt-12 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            이 설명은 전통 명리학의 기본 개념을 간략히 정리한 것입니다.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            더 정확하고 깊이 있는 해석을 원하시면 전문가와 상담하시기 바랍니다.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
          >
            사주 풀이 하러 가기
          </Link>
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
            <p className="font-semibold text-indigo-600 dark:text-indigo-400">포스텔러 만세력 v2.4.0</p>
            <p className="text-xs mt-1 text-gray-400">Comprehensive Saju Terminology Guide</p>
          </div>
        </div>
      </div>
    </div>
  );
}
