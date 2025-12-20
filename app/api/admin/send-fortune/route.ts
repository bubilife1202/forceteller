import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { calculateSaju } from '@/lib/saju-calculator';
import { generateFortuneHtml } from '@/lib/utils/fortune-generator';

interface CustomerData {
  name: string;
  year: number;
  month: number;
  day: number;
  hour: number | null;
  gender: 'male' | 'female';
  email: string;
}

type FortuneType = 'newyear2026' | 'wealth' | 'daily' | 'compatibility' | 'career' | 'daeun';

export async function POST(request: NextRequest) {
  try {
    const { customer, fortuneType, brandName, brandContact, password } = await request.json() as {
      customer: CustomerData;
      fortuneType: FortuneType;
      brandName: string;
      brandContact: string;
      password: string;
    };

    // 비밀번호 확인
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (password !== adminPassword) {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 401 });
    }

    // 네이버 SMTP 설정 확인
    const naverEmail = process.env.NAVER_EMAIL;
    const naverPassword = process.env.NAVER_PASSWORD;

    if (!naverEmail || !naverPassword) {
      return NextResponse.json(
        { error: 'NAVER_EMAIL, NAVER_PASSWORD 환경변수가 필요합니다' },
        { status: 500 }
      );
    }

    // 사주 계산
    const sajuResult = calculateSaju({
      year: customer.year,
      month: customer.month,
      day: customer.day,
      hour: customer.hour ?? 12,
    }, customer.gender);

    // HTML 결과 생성
    const htmlContent = generateFortuneHtml({
      fortuneType,
      name: customer.name,
      gender: customer.gender,
      year: customer.year,
      month: customer.month,
      day: customer.day,
      hour: customer.hour,
      sajuResult,
      brandName,
      brandContact,
    });

    // 이메일 제목 설정
    const subjectMap: Record<FortuneType, string> = {
      newyear2026: `[${brandName}] ${customer.name}님의 2026년 신년운세`,
      wealth: `[${brandName}] ${customer.name}님의 재물운 분석`,
      daily: `[${brandName}] ${customer.name}님의 오늘의 운세`,
      career: `[${brandName}] ${customer.name}님의 직업운 분석`,
      daeun: `[${brandName}] ${customer.name}님의 대운 분석`,
      compatibility: `[${brandName}] 궁합 분석 결과`,
    };

    // 네이버 SMTP 트랜스포터 생성
    const transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: naverEmail,
        pass: naverPassword,
      },
    });

    // 이메일 발송
    await transporter.sendMail({
      from: `${brandName} <${naverEmail}>`,
      to: customer.email,
      subject: subjectMap[fortuneType],
      html: `
        <div style="font-family: 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto;">
          <p style="color: #333; font-size: 16px;">
            안녕하세요, ${customer.name}님!<br><br>
            요청하신 운세 분석 결과를 보내드립니다.<br>
            첨부된 HTML 파일을 다운로드하시거나, 아래 내용을 확인해주세요.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          ${brandContact ? `<p style="color: #666; font-size: 14px;">문의: ${brandContact}</p>` : ''}
        </div>
      `,
      attachments: [
        {
          filename: `${customer.name}_운세결과.html`,
          content: htmlContent,
          contentType: 'text/html',
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '발송 실패' },
      { status: 500 }
    );
  }
}
