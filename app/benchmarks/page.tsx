import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getBenchmarks } from '@/lib/benchmarks_db';
import BenchmarksTable from '@/components/admin/BenchmarksTable';
import { Target, Info } from 'lucide-react';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Quản lý chỉ tiêu | CDC',
};

export default async function BenchmarksPage() {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (role !== 'admin') redirect('/submit-report');

  const benchmarks = await getBenchmarks();

  // Tính tổng chỉ tiêu
  const totalUnits = benchmarks.length;
  const filledUnits = benchmarks.filter((b) =>
    [b.nguoi_cao_tuoi, b.nguoi_khuyet_tat, b.ho_ngheo, b.ho_can_ngheo, b.nguoi_co_cong, b.vung_kho_khan, b.tre_em_duoi_6_tuoi].some((v) => v !== null)
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <Target className="w-7 h-7 text-blue-600" />
          Quản lý chỉ tiêu
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Nhập số liệu chỉ tiêu từng nhóm đối tượng cho 93 xã/phường — dùng để tính % hoàn thành trên Dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-2xl font-bold text-blue-700">{totalUnits}</p>
          <p className="text-xs text-slate-500 mt-0.5">Tổng đơn vị</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-2xl font-bold text-emerald-600">{filledUnits}</p>
          <p className="text-xs text-slate-500 mt-0.5">Đã có chỉ tiêu</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-2xl font-bold text-amber-600">{totalUnits - filledUnits}</p>
          <p className="text-xs text-slate-500 mt-0.5">Chưa có chỉ tiêu</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <p className="text-2xl font-bold text-violet-600">{Math.round((filledUnits / totalUnits) * 100)}%</p>
          <p className="text-xs text-slate-500 mt-0.5">Hoàn thiện dữ liệu</p>
        </div>
      </div>

      {/* Info notice */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100 mb-6">
        <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          <strong>Cách nhập:</strong> Nhấn vào ô số để chỉnh sửa, nhấn <strong>Enter</strong> hoặc click ra ngoài để xác nhận giá trị.
          Để trống (—) nếu đơn vị không có đối tượng này. Sau đó nhấn biểu tượng <strong>💾 Lưu</strong> ở cuối hàng để lưu vào database.
        </p>
      </div>

      {/* Table */}
      <BenchmarksTable initialData={benchmarks} />
    </div>
  );
}
