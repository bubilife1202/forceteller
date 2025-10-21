'use client';

import Link from 'next/link';

export default function ChatGPTPromptPage() {
  const promptTemplate = `너는 세계 최고 수준의 사주 전문가이자 동시에 현대적 자기계발 코치야.
아래에 제공하는 내 만세력 자료를 기반으로,

① 2025년 한 해 전체의 운세 흐름을 월별·분기별로 세분화해 풀어주고,
② 타고난 기질과 성격을 오행과 십성 기준으로 구체적으로 해석해주며,
③ 인생 전반에서 반복되는 패턴과 중요한 전환점(20대·30대·40대 등)을 정리해주고,
④ 커리어·관계·재정·건강 4개 영역별로 나에게 적합한 방향성과 주의점을 제시하고,
⑤ 마지막으로 '사주를 데이터처럼 활용하는 실행 포인트 5가지'를 뽑아줘.

분석할 때는 전통적인 용어(비겁·식상·재성·관성·인성 등)를 풀어서 설명하고,
현대인이 이해할 수 있는 비유와 예시를 곁들여줘.

━━━━━━━━━━━━━━━━━━━━━
📌 기본 정보
━━━━━━━━━━━━━━━━━━━━━

이름: [여기에 이름 입력]
양력 생년월일: [예: 1995년 1월 1일 12시 0분]
음력 생년월일: [예: 1994년 12월 1일] (포스텔러가 자동 계산)
출생 시간: [예: 오시 (11:00-13:00)]
성별: [남자/여자]

━━━━━━━━━━━━━━━━━━━━━
📊 사주팔자 (四柱八字)
━━━━━━━━━━━━━━━━━━━━━

       시주    일주(나)  월주    년주
천간:  [__]    [__]    [__]    [__]
지지:  [__]    [__]    [__]    [__]

일간: [천간] - 나 자신을 나타냄

━━━━━━━━━━━━━━━━━━━━━
🔮 십성 분석
━━━━━━━━━━━━━━━━━━━━━

시주: [십성명]
일주: [십성명] ← 나
월주: [십성명]
년주: [십성명]

십성 개수:
- 비겁(比劫): [개수]개 - 경쟁력, 자립심
- 식상(食傷): [개수]개 - 표현력, 창의성
- 재성(財星): [개수]개 - 재물운, 실행력
- 관성(官星): [개수]개 - 책임감, 명예
- 인성(印星): [개수]개 - 학습력, 후원

━━━━━━━━━━━━━━━━━━━━━
🌊 오행 분석
━━━━━━━━━━━━━━━━━━━━━

목(木): [__]%
화(火): [__]%
토(土): [__]%
금(金): [__]%
수(水): [__]%

과다한 기운: [오행]
부족한 기운: [오행]

━━━━━━━━━━━━━━━━━━━━━
⚖️ 신강/신약 & 용신
━━━━━━━━━━━━━━━━━━━━━

신강/신약: [신강/신약/중화]
일간 특성: [포스텔러의 일간 성격 분석 복사]
용신(필요한 에너지): [오행명]

━━━━━━━━━━━━━━━━━━━━━
🔄 12운성
━━━━━━━━━━━━━━━━━━━━━

시주: [운성]
일주: [운성]
월주: [운성]
년주: [운성]

━━━━━━━━━━━━━━━━━━━━━
🌟 대운 (10년 주기)
━━━━━━━━━━━━━━━━━━━━━

[나이]세~: [천간][지지]
[나이]세~: [천간][지지]
[나이]세~: [천간][지지]
[나이]세~: [천간][지지]
[나이]세~: [천간][지지]
[나이]세~: [천간][지지]

━━━━━━━━━━━━━━━━━━━━━
✨ 신살 (특수별)
━━━━━━━━━━━━━━━━━━━━━

[신살명]: [의미]
(포스텔러 결과에서 복사)

━━━━━━━━━━━━━━━━━━━━━
🔗 합충형파해
━━━━━━━━━━━━━━━━━━━━━

[합충명]: [설명]
(포스텔러 결과에서 복사)

━━━━━━━━━━━━━━━━━━━━━

분석 시작 전에 반드시 내 기본 정보(이름, 양력, 음력, 시간)를 먼저 요약해서 보여주고,
그 다음 ①~⑤ 순서로 상세하게 분석해줘.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptTemplate);
    alert('프롬프트가 복사되었습니다!\nChatGPT에 붙여넣고 [ ] 안을 채워주세요.');
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
                <span>포스텔러에서 사주 풀이 완료 후 결과 확인</span>
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
                <span>ChatGPT에 붙여넣고 <code className="bg-gray-800 text-white px-2 py-1 rounded">[  ]</code> 부분을 포스텔러 결과로 채우기</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <span>ChatGPT가 전문가 수준의 상세 분석 제공!</span>
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
                💡 <strong>팁:</strong> [  ] 부분을 포스텔러 결과에서 복사한 내용으로 채우세요.
                천간/지지, 십성, 오행 비율 등을 그대로 복사하면 됩니다!
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
