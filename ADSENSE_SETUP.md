# Google AdSense 설정 가이드

포스텔러 만세력 사이트에 AdSense 광고가 추가되었습니다.

## 📋 설정해야 할 값

### 1. Publisher ID 설정

**파일:** `app/layout.tsx` (56번째 줄)

```typescript
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
```

**현재 계정:** winkown2@gmail.com

**찾는 방법:**
1. https://adsense.google.com 로그인
2. 계정 → 계정 정보
3. "게시자 ID" 복사 (ca-pub-XXXXXXXXXX 형식)
4. `ca-pub-XXXXXXXXXX` 부분을 실제 Publisher ID로 교체

---

### 2. Ad Slot ID 설정

광고 단위를 만들고 각 페이지에 Ad Slot ID를 설정해야 합니다.

#### **파일 1:** `components/AdSense.tsx` (31번째 줄)
```typescript
data-ad-client="ca-pub-XXXXXXXXXX"
```
→ Publisher ID로 교체

#### **파일 2:** `components/SajuResult.tsx` (733번째 줄)
```typescript
<AdSense adSlot="1234567890" />
```
→ 사주 결과 페이지용 Ad Slot ID로 교체

#### **파일 3:** `app/chatgpt-prompt/page.tsx` (189번째 줄)
```typescript
<AdSense adSlot="0987654321" />
```
→ ChatGPT 프롬프트 페이지용 Ad Slot ID로 교체

---

## 🎯 Ad Slot 만드는 방법

1. https://adsense.google.com 로그인
2. **광고 → 광고 단위** 클릭
3. **디스플레이 광고** 선택
4. 광고 단위 이름:
   - `사주결과_하단광고`
   - `ChatGPT프롬프트_하단광고`
5. 광고 크기: **반응형** 선택
6. 생성 후 코드에서 `data-ad-slot="XXXXXXXXXX"` 부분 복사
7. 위에 적힌 파일에 붙여넣기

---

## ✅ 설정 후 확인사항

1. ✅ Publisher ID 3곳 모두 교체 완료
2. ✅ Ad Slot ID 2개 광고 단위 생성 및 교체 완료
3. ✅ 배포 후 실제 사이트에서 광고 표시 확인
   - 처음엔 빈 공간으로 보일 수 있음 (AdSense 승인 대기)
   - 승인 후 24시간 이내 광고 표시 시작

---

## 📍 광고 위치

현재 광고가 배치된 위치:

1. **사주 결과 페이지** - 합충형파해 섹션 하단
2. **ChatGPT 프롬프트 페이지** - 분석 내용 미리보기 하단

---

## 🔧 추가 광고 배치하려면?

다른 페이지에도 광고를 추가하려면:

```tsx
import AdSense from '@/components/AdSense';

// 원하는 위치에 추가
<AdSense
  adSlot="새로운_광고_슬롯_ID"
  className="text-center my-8"
/>
```

---

## ⚠️ 주의사항

- **Auto Ads** (자동 광고)도 활성화됨 (layout.tsx에 스크립트 있음)
- AdSense 정책 위반 주의:
  - 본인이 광고 클릭 금지
  - 광고 클릭 유도 금지
  - 부적절한 콘텐츠 금지
- 승인 후에도 수익 발생까지 시간 소요될 수 있음
