import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // 기본 언어(ko)는 URL에 prefix 없음
});

export const config = {
  // 모든 경로에 미들웨어 적용 (API, static files 제외)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
