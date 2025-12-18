import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, htmlContent, fortuneType } = await request.json();

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!to || !emailRegex.test(to)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!htmlContent) {
      return NextResponse.json(
        { error: 'HTML 콘텐츠가 필요합니다.' },
        { status: 400 }
      );
    }

    // Naver SMTP 설정
    const transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NAVER_USER,
        pass: process.env.NAVER_PASSWORD,
      },
    });

    // 운세 타입별 제목 설정
    const subjectMap: Record<string, string> = {
      daily: '오늘의 운세 결과',
      newyear: '2026 신년운세 결과',
      compatibility: '궁합 분석 결과',
      tojeong: '2026 토정비결 결과',
      monthly: '월별 운세 결과',
      rekindling: '재회 운세 결과',
      dream: '꿈해몽 결과',
      saju: '사주 풀이 결과',
      tarot: '타로 카드 결과',
    };

    const emailSubject = subject || `[팔자왕] ${subjectMap[fortuneType] || '운세 결과'}`;

    // 이메일 발송
    await transporter.sendMail({
      from: `"팔자왕" <${process.env.NAVER_USER}>`,
      to,
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html lang="ko">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${emailSubject}</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <!-- 헤더 -->
            <div style="text-align: center; padding: 30px 0; border-bottom: 1px solid #334155;">
              <h1 style="color: #fbbf24; font-size: 28px; margin: 0;">
                ✨ 팔자왕
              </h1>
              <p style="color: #94a3b8; font-size: 14px; margin-top: 10px;">
                전통 명리학 기반 운세 서비스
              </p>
            </div>

            <!-- 본문 -->
            <div style="padding: 30px 0;">
              ${htmlContent}
            </div>

            <!-- 푸터 -->
            <div style="text-align: center; padding: 30px 0; border-top: 1px solid #334155;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                본 운세는 전통 명리학을 바탕으로 제작되었으며, 재미와 참고용으로 활용해 주세요.
              </p>
              <p style="color: #64748b; font-size: 12px; margin-top: 10px;">
                <a href="https://forceteller.nomadlab.kr" style="color: #fbbf24; text-decoration: none;">
                  팔자왕 바로가기 →
                </a>
              </p>
              <p style="color: #475569; font-size: 11px; margin-top: 20px;">
                © 2025 팔자왕. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, message: '이메일이 발송되었습니다!' });
  } catch (error) {
    console.error('이메일 발송 오류:', error);
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
    return NextResponse.json(
      { error: '이메일 발송에 실패했습니다.', detail: errorMessage },
      { status: 500 }
    );
  }
}
