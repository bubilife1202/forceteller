import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "포스텔러 만세력 - 무료 사주 풀이, 대운, 신살 분석",
  description: "정확한 시간 보정을 통한 사주 오행 분석 서비스. 사주 팔자, 십성, 대운, 12운성, 신살, 합충 분석을 무료로 제공합니다. 음력/양력 변환 지원.",
  keywords: ["사주", "만세력", "사주풀이", "사주팔자", "십성", "오행", "대운", "신살", "음력", "양력", "운세", "명리학"],
  authors: [{ name: "Forceteller" }],
  creator: "Forceteller",
  publisher: "Forceteller",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://forceteller.netlify.app",
    title: "포스텔러 만세력 - 무료 사주 풀이",
    description: "정확한 시간 보정과 상세한 분석으로 제공하는 사주 풀이 서비스",
    siteName: "포스텔러 만세력",
  },
  twitter: {
    card: "summary_large_image",
    title: "포스텔러 만세력 - 무료 사주 풀이",
    description: "정확한 사주 오행 분석 서비스",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
