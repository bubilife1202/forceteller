import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "포스텔러 만세력 - 사주 풀이",
  description: "정확한 시간 보정을 통한 사주 오행 분석 서비스",
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
