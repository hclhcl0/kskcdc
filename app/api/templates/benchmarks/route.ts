import { NextResponse } from 'next/server';
import { getBenchmarks } from '@/lib/benchmarks_db';
import ExcelJS from 'exceljs';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (role !== 'admin' && role !== 'admin_cdc') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const benchmarks = await getBenchmarks();
    
    const wb = new ExcelJS.Workbook();
    wb.creator = 'Health Report System';
    wb.created = new Date();

    const ws = wb.addWorksheet('Mau_Chi_Tieu');

    // Header styling
    const styleHeader = (cell: ExcelJS.Cell) => {
      cell.font = { name: 'Times New Roman', size: 12, bold: true };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD9E1F2' }
      };
    };

    // Columns: STT, Tên xã/phường, Trẻ em dưới 6 tuổi, Người cao tuổi, Người có công, Người khuyết tật, Hộ nghèo, Hộ cận nghèo, Vùng khó khăn/DTTS
    const headerRow = ws.addRow([
      'STT',
      'Tên xã/phường',
      'Trẻ em dưới 6 tuổi',
      'Người cao tuổi',
      'Người có công',
      'Người khuyết tật',
      'Hộ nghèo',
      'Hộ cận nghèo',
      'Vùng khó khăn/DTTS'
    ]);
    headerRow.height = 30;
    headerRow.eachCell(cell => styleHeader(cell));

    // Define column widths
    ws.getColumn(1).width = 6;
    ws.getColumn(2).width = 30;
    for (let i = 3; i <= 9; i++) {
      ws.getColumn(i).width = 18;
    }

    // Add data
    if (benchmarks.length === 0) {
      // Add a dummy row if db is empty
      const row = ws.addRow([1, 'Phường Mẫu', '', '', '', '', '', '', '']);
      row.eachCell(c => {
         c.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      });
    } else {
      benchmarks.forEach((b, idx) => {
        const rowData = [
          idx + 1,
          b.don_vi,
          b.tre_em_duoi_6_tuoi !== null ? b.tre_em_duoi_6_tuoi : '',
          b.nguoi_cao_tuoi !== null ? b.nguoi_cao_tuoi : '',
          b.nguoi_co_cong !== null ? b.nguoi_co_cong : '',
          b.nguoi_khuyet_tat !== null ? b.nguoi_khuyet_tat : '',
          b.ho_ngheo !== null ? b.ho_ngheo : '',
          b.ho_can_ngheo !== null ? b.ho_can_ngheo : '',
          b.vung_kho_khan !== null ? b.vung_kho_khan : ''
        ];
        const dataRow = ws.addRow(rowData);
        dataRow.eachCell((cell, colNumber) => {
          cell.font = { name: 'Times New Roman', size: 12 };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          cell.alignment = { vertical: 'middle', horizontal: colNumber === 2 ? 'left' : 'center' };
        });
      });
    }

    const buf = await wb.xlsx.writeBuffer();

    return new NextResponse(buf, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="Mau_Import_Chi_Tieu.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Export Template Error:', error);
    return NextResponse.json({ error: 'Failed to generate template' }, { status: 500 });
  }
}
