import { NextResponse } from 'next/server';
import { updateBenchmark } from '@/lib/benchmarks';
import { auth } from '@/lib/auth';

export async function PUT(
  request: Request,
  context: { params: Promise<{ don_vi: string }> }
) {
  try {
    const { don_vi: encodedDonVi } = await context.params;
    const session = await auth();
    // Chặn nếu không phải admin
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const don_vi = decodeURIComponent(encodedDonVi);
    const body = await request.json();
    
    // updateBenchmark mong đợi các thuộc tính số hoặc null
    const updated = updateBenchmark(don_vi, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy đơn vị báo cáo' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Không thể cập nhật chỉ tiêu' },
      { status: 500 }
    );
  }
}
