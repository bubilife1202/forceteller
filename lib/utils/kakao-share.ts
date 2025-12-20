// 카카오 공유 유틸리티

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      Link: {
        sendDefault: (params: any) => void;
      };
    };
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

interface KakaoShareParams {
  title: string;
  description: string;
  imageUrl?: string;
  buttonText?: string;
}

export const shareToKakao = ({ title, description, imageUrl, buttonText = '운세 보러가기' }: KakaoShareParams) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const defaultImage = 'https://palzawang.co.kr/og-image.png';

  if (typeof window !== 'undefined' && window.Kakao) {
    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
      // 카카오 SDK가 초기화되지 않은 경우
      console.warn('Kakao SDK not initialized');
      fallbackShare(title, description, shareUrl);
      return;
    }

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title,
        description,
        imageUrl: imageUrl || defaultImage,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: buttonText,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  } else {
    fallbackShare(title, description, shareUrl);
  }
};

const fallbackShare = (title: string, description: string, url: string) => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    navigator.share({
      title,
      text: description,
      url,
    }).catch(() => {
      // 공유 취소 시 무시
    });
  } else {
    // 클립보드에 복사
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다!');
    }
  }
};
