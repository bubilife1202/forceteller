import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const metadata = messages.metadata as Record<string, string>;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords.split(', '),
    authors: [{ name: "Paljawang" }],
    creator: "Paljawang",
    publisher: "Paljawang",
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
      locale: locale === 'ko' ? 'ko_KR' : 'en_US',
      url: "https://palzawang.co.kr",
      title: metadata.title,
      description: metadata.description,
      siteName: locale === 'ko' ? "팔자왕" : "Paljawang",
      images: [
        {
          url: "https://palzawang.co.kr/og-image.png",
          width: 1200,
          height: 1200,
          alt: locale === 'ko' ? "팔자왕 - 무료 사주 운세 서비스" : "Paljawang - Free Fortune Telling",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["https://palzawang.co.kr/og-image.png"],
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
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 잘못된 locale인 경우 404
  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const metadata = messages.metadata as Record<string, string>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: metadata.title,
    description: metadata.description,
    url: 'https://palzawang.co.kr',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    author: {
      '@type': 'Organization',
      name: 'Paljawang',
    },
    inLanguage: [locale === 'ko' ? 'ko-KR' : 'en-US'],
  };

  return (
    <html lang={locale} className="dark">
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Version log */}
        <Script
          id="version-log"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `console.log('%c팔자왕 v2.5.0', 'color: #a855f7; font-weight: bold; font-size: 14px;');`
          }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
