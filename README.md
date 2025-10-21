# 포스텔러 만세력 (Forceteller Manseryeok)

모두를 위한 사주풀이 서비스 - 정확한 시간 보정을 통한 사주 오행 분석

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bubilife1202/forceteller&project-name=forceteller&repository-name=forceteller)

## 🌟 주요 기능

- ✅ **사용자 정보 입력** - 이름, 성별, 생년월일시, 도시
- ✅ **사주 팔자 계산** - 년주, 월주, 일주, 시주 (천간, 지지)
- ✅ **십성 분석** - 비견, 겁재, 식신, 상관, 편재, 정재, 편관, 정관, 편인, 정인
- ✅ **오행 분석** - 목(木), 화(火), 토(土), 금(金), 수(水)
- ✅ **신강/신약 판단** - 일간 강약 분석 및 용신 제시
- ✅ **반응형 디자인** - 모바일/데스크톱 완벽 대응

## 🚀 빠른 배포 (1분 완성!)

### 방법 1: Vercel로 원클릭 배포 (추천)

1. 위의 **"Deploy with Vercel"** 버튼 클릭
2. GitHub 계정으로 로그인
3. 저장소 권한 승인
4. Deploy 버튼 클릭
5. 완료! 🎉 자동으로 생성된 URL로 접속하세요

### 방법 2: Vercel CLI로 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 클론
git clone https://github.com/bubilife1202/forceteller.git
cd forceteller

# 배포
vercel
```

## 💻 로컬 개발

```bash
# 저장소 클론
git clone https://github.com/bubilife1202/forceteller.git
cd forceteller

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 📁 프로젝트 구조

```
forceteller/
├── app/
│   ├── page.tsx          # 메인 페이지
│   ├── layout.tsx        # 레이아웃
│   └── globals.css       # 글로벌 스타일
├── components/
│   ├── SajuForm.tsx      # 사용자 입력 폼
│   └── SajuResult.tsx    # 사주 결과 표시
├── lib/
│   ├── saju-constants.ts # 사주 상수 (천간, 지지, 오행 등)
│   └── saju-calculator.ts # 사주 계산 로직
└── vercel.json           # Vercel 배포 설정
```

## 🛠 기술 스택

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## 📖 사주 계산 로직

이 프로젝트는 전통적인 사주명리학의 계산 방식을 기반으로 합니다:

- **천간(天干)**: 갑, 을, 병, 정, 무, 기, 경, 신, 임, 계
- **지지(地支)**: 자, 축, 인, 묘, 진, 사, 오, 미, 신, 유, 술, 해
- **육십갑자**: 천간과 지지의 조합으로 60년 주기
- **십성**: 일간을 기준으로 다른 천간과의 관계 분석
- **오행**: 목, 화, 토, 금, 수의 균형 분석

## 🔮 향후 개선 계획

- [ ] 음력 변환 기능
- [ ] 대운/연운/월운 추가
- [ ] 일진 달력
- [ ] 지역별 시차 보정 정밀화
- [ ] 12운성 계산
- [ ] 신살 상세 분석
- [ ] 합충형파해 분석
- [ ] 사주 해석 AI 추가

## 📝 라이선스

MIT License

## 🤝 기여

이슈와 PR은 언제나 환영합니다!

---

**Made with ❤️ by Claude Code**
