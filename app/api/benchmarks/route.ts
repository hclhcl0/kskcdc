import { NextResponse } from 'next/server';
import { getBenchmarks } from '@/lib/benchmarks_db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const benchmarks = await getBenchmarks();
    return NextResponse.json({ success: true, data: benchmarks });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể tải dữ liệu chỉ tiêu' },
      { status: 500 }
    );
  }
}
