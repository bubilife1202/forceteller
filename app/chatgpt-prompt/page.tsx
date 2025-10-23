'use client';

import Link from 'next/link';
import AdSense from '@/components/AdSense';

export default function ChatGPTPromptPage() {
  const promptTemplate = `너는 세계 최고 수준의 사주 전문가이자 동시에 현대적 자기계발 코치야.

첨부한 이미지는 포스텔러 만세력 앱에서 받은 내 사주 풀이 결과야.
이미지를 자세히 보고 아래 정보를 추출해서 분석해줘:

📌 기본 정보: 이름, 양력, 음력, 출생 시간, 성별
📊 사주팔자: 시주·일주·월주·년주의 천간과 지지
🔮 십성: 각 주의 십성과 개수 분포
🌊 오행: 목화토금수 비율
⚖️ 신강/신약: 일간 특성과 용신
🔄 12운성: 각 주의 운성
🌟 대운: 10년 주기 흐름
✨ 신살: 특수별 목록
🔗 합충형파해: 상호작용

위 정보를 바탕으로 아래 내용을 분석해줘:

━━━━━━━━━━━━━━━━━━━━━

① 2025년 한 해 전체의 운세 흐름을 월별·분기별로 세분화해 풀어주고,

② 타고난 기질과 성격을 오행과 십성 기준으로 구체적으로 해석해주며,

③ 인생 전반에서 반복되는 패턴과 중요한 전환점(20대·30대·40대 등)을 정리해주고,

④ 커리어·관계·재정·건강 4개 영역별로 나에게 적합한 방향성과 주의점을 제시하고,

⑤ 마지막으로 '사주를 데이터처럼 활용하는 실행 포인트 5가지'를 뽑아줘.

━━━━━━━━━━━━━━━━━━━━━

분석할 때는 전통적인 용어(비겁·식상·재성·관성·인성 등)를 풀어서 설명하고,
현대인이 이해할 수 있는 비유와 예시를 곁들여줘.

분석 시작 전에 반드시 이미지에서 읽은 내 기본 정보(이름, 양력, 음력, 시간)를 먼저 요약해서 보여주고,
그 다음 ①~⑤ 순서로 상세하게 분석해줘.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptTemplate);
    alert('프롬프트가 복사되었습니다!\nChatGPT에 사주 결과 이미지를 첨부하고 프롬프트를 붙여넣으세요.');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900"></div>

      <div className="relative z-10 py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              ChatGPT 사주 분석 프롬프트
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
              포스텔러 결과를 ChatGPT로 더 깊이 분석하세요
            </p>
            <Link
              href="/"
              className="inline-block text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              ← 사주 풀이로 돌아가기
            </Link>
          </div>

          {/* 사용 방법 */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              📖 사용 방법
            </h2>
            <ol className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>포스텔러에서 사주 풀이 완료 후 <strong>&quot;이미지 다운로드&quot;</strong> 버튼으로 결과 이미지 저장</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>아래 <strong>&quot;프롬프트 복사&quot;</strong> 버튼 클릭</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>ChatGPT에 <strong>사주 결과 이미지를 첨부</strong>하고 프롬프트 붙여넣기</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <span>ChatGPT가 이미지를 보고 전문가 수준의 상세 분석 제공!</span>
              </li>
            </ol>
          </div>

          {/* 프롬프트 템플릿 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                📋 프롬프트 템플릿
              </h2>
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
              >
                📋 프롬프트 복사
              </button>
            </div>

            <div className="bg-gray-900 text-gray-100 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
                {promptTemplate}
              </pre>
            </div>

            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                💡 <strong>팁:</strong> ChatGPT가 이미지를 읽고 자동으로 모든 정보를 추출합니다.
                별도로 입력할 필요 없이 이미지만 첨부하면 됩니다!
              </p>
            </div>
          </div>

          {/* 분석 내용 미리보기 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              ✨ ChatGPT가 분석해주는 내용
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">
                  ① 2025년 운세 전망
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  분기별·월별 흐름, 주의사항, 전체 키워드 3가지
                </p>
              </div>

              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <h3 className="font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                  ② 타고난 기질과 성격
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  오행 밸런스와 십성 구성으로 본 성격, 장점과 보완점
                </p>
              </div>

              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl">
                <h3 className="font-bold text-pink-700 dark:text-pink-300 mb-2">
                  ③ 인생 패턴과 전환점
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  20대·30대·40대 특징, 반복되는 테마, 주요 전환기
                </p>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">
                  ④ 4대 영역별 가이드
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  커리어·관계·재정·건강 각 영역별 구체적 조언
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">
                  ⑤ 실행 포인트 5가지
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  사주를 데이터처럼 활용하는 구체적 행동 계획
                </p>
              </div>
            </div>
          </div>

          {/* 광고 */}
          <div className="my-8">
            <AdSense
              adSlot="0987654321"
              className="text-center"
            />
          </div>

          {/* 하단 정보 */}
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>포스텔러 만세력 v2.3.0</p>
            <p className="mt-2">
              <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                홈으로 돌아가기
              </Link>
              {' · '}
              <Link href="/guide" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                사주 용어 설명
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
