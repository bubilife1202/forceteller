import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import "../globals.css";
import LanguageSwitcher from '@/components/LanguageSwitcher';

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
      url: "https://forceteller.nomadlab.kr",
      title: metadata.title,
      description: metadata.description,
      siteName: locale === 'ko' ? "팔자왕" : "Paljawang",
      images: [
        {
          url: "https://forceteller.nomadlab.kr/opengraph-image",
          width: 1200,
          height: 630,
          alt: locale === 'ko' ? "팔자왕 - 무료 사주 운세 서비스" : "Paljawang - Free Fortune Telling",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: ["https://forceteller.nomadlab.kr/opengraph-image"],
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
    url: 'https://forceteller.nomadlab.kr',
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
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8245597797545485"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <LanguageSwitcher />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
