import { NextResponse } from 'next/server';
import { getProgressDashboard } from '@/lib/data';
import { formatNumber } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    // Basic API Key security check (optional but recommended)
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    // You can set ZALO_INTEGRATION_TOKEN in your .env file
    // const EXPECTED_TOKEN = process.env.ZALO_INTEGRATION_TOKEN;
    // if (EXPECTED_TOKEN && token !== EXPECTED_TOKEN) {
    //   return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    // }

    const stats = await getProgressDashboard();
    
    const today = new Date().toLocaleDateString('vi-VN');
    
    const groupStats = stats.systemGroupStats || [];
    
    const totalExam = groupStats.reduce((sum, g) => sum + g.achieved, 0);
    const totalTarget = groupStats.reduce((sum, g) => sum + (g.target || 0), 0);
    const percentage = totalTarget > 0 ? ((totalExam / totalTarget) * 100).toFixed(1) : '0';

    const totalUnits = stats.units.length;
    const submittedUnits = stats.units.filter(u => u.reportCount > 0).length;

    // Format text for Zalo OA Broadcast message
    const textMessage = `📊 BÁO CÁO KHÁM SỨC KHỎE (${today})
------------------------
🏥 Tổng lượt khám: ${formatNumber(totalExam)}
🎯 Tỷ lệ hoàn thành: ${percentage}%
📝 Tình hình báo cáo: ${submittedUnits}/${totalUnits} trạm Y tế

👉 Các nhóm chính:
${groupStats.filter(g => g.achieved > 0).slice(0, 4).map(g => `- ${g.label}: ${formatNumber(g.achieved)}`).join('\n')}

🌐 Xem chi tiết: https://ksktd.danang.gov.vn`;

    // Data for ZNS Template (if needed)
    const znsData = {
      report_date: today,
      total_examinations: formatNumber(totalExam),
      overall_percentage: percentage,
      total_units_submitted: `${submittedUnits}/${totalUnits}`
    };

    // Detailed Markdown for AI Knowledge Base (RAG)
    const markdownKnowledge = `# BÁO CÁO KHÁM SỨC KHỎE TOÀN DÂN CDC ĐÀ NẴNG
Ngày cập nhật: ${today}

## TỔNG QUAN HỆ THỐNG
- Tổng lượt khám toàn thành phố: ${formatNumber(totalExam)} người
- Tỷ lệ hoàn thành chỉ tiêu: ${percentage}%
- Tiến độ nộp báo cáo: ${submittedUnits}/${totalUnits} Trạm Y Tế đã nộp.

## CHI TIẾT THEO NHÓM ĐỐI TƯỢNG
${groupStats.map(g => `- Nhóm ${g.label}: Khám được ${formatNumber(g.achieved)} người (Chỉ tiêu: ${g.target ? formatNumber(g.target) : 0} người, đạt ${g.pct ? g.pct.toFixed(1) : 0}%).`).join('\n')}

*Tài liệu này dùng để trả lời tự động cho người dân hoặc cán bộ về số liệu khám sức khỏe trên địa bàn thành phố Đà Nẵng.*`;

    return NextResponse.json({
      success: true,
      data: {
        text_message: textMessage,
        zns_variables: znsData,
        markdown_knowledge: markdownKnowledge,
        raw_stats: stats
      }
    });
  } catch (error) {
    console.error('Error exporting Zalo OA data:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi tạo dữ liệu Zalo' },
      { status: 500 }
    );
  }
}
