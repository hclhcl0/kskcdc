import { NextRequest, NextResponse } from 'next/server';
import { getProgressDashboard, getDashboardStats } from '@/lib/data';

export const dynamic = 'force-dynamic';

function getCorsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key, Authorization',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
}

export async function GET(request: NextRequest) {
  const corsHeaders = getCorsHeaders();

  try {
    // 1. Xác thực API Key qua header X-API-Key hoặc Authorization Bearer token
    const apiKey = request.headers.get('x-api-key') || 
                   request.headers.get('Authorization')?.replace('Bearer ', '');
                   
    const expectedKey = process.env.EXTERNAL_API_KEY;

    if (!expectedKey) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error (API Key not set)' },
        { status: 500, headers: corsHeaders }
      );
    }

    if (!apiKey || apiKey !== expectedKey) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid API Key' },
        { status: 401, headers: corsHeaders }
      );
    }

    // 2. Lấy dữ liệu tổng hợp và tiến độ đơn vị
    const [progress, stats] = await Promise.all([
      getProgressDashboard(),
      getDashboardStats(),
    ]);

    // 3. Chuẩn hóa dữ liệu trả về
    const responseData = {
      success: true,
      updatedAt: new Date().toISOString(),
      summary: {
        totalReports: stats.totalReports,
        totalExaminations: stats.totalExaminations,
        submittedUnits: progress.units.filter(u => u.reportCount > 0).length,
        totalUnits: progress.units.length,
        systemOverallPct: progress.systemOverallPct
      },
      systemGroupStats: progress.systemGroupStats || [],
      unitsProgress: progress.units.map(u => ({
        don_vi: u.don_vi,
        co_so_y_te: u.co_so_y_te,
        reportCount: u.reportCount,
        lastReportDate: u.lastReportDate,
        overallPct: u.overallPct,
        stats: u.stats.map(s => ({
          key: s.key,
          label: s.label,
          achieved: s.achieved,
          target: s.target,
          pct: s.pct,
          hasNoBenchmark: s.hasNoBenchmark || false
        }))
      }))
    };

    return NextResponse.json(responseData, {
      status: 200,
      headers: corsHeaders
    });

  } catch (error: any) {
    console.error('Error generating external dashboard API data:', error);
    return NextResponse.json(
      { success: false, error: `Failed to fetch: ${error.message || 'Internal server error'}` },
      { status: 500, headers: corsHeaders }
    );
  }
}
