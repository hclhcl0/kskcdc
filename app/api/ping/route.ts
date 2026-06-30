import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Public endpoint - không yêu cầu đăng nhập
// Cron job gọi mỗi ngày để giữ Supabase luôn active
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'ok', time: new Date().toISOString() });
  } catch {
    // Vẫn trả 200 dù DB lỗi - không chặn cron job
    return NextResponse.json({ status: 'ok', time: new Date().toISOString() });
  }
}
