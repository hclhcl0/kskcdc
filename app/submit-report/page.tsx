import ReportForm from '@/components/submit-report/ReportForm';
import { FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nộp báo cáo | Khám Sức khỏe Toàn dân',
  description: 'Biểu mẫu nhập liệu kết quả khám sức khỏe toàn dân dành cho các đơn vị y tế',
};

export default function SubmitReportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors">
          Tổng hợp số liệu
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-600 font-medium">Nộp báo cáo</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 shadow-md shadow-blue-600/30">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Biểu mẫu Báo cáo Kết quả Khám Sức khỏe Toàn dân
            </h1>
            <p className="text-sm text-slate-500">
              Dành cho các trạm y tế, phòng khám tuyến dưới
            </p>
          </div>
        </div>

        {/* Official document reference */}
        <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs px-3 py-2 rounded-lg">
          <span className="font-semibold">📋</span>
          <span>
            Theo hướng dẫn của Sở Y tế – Phiếu báo cáo kết quả khám sức khỏe toàn dân
          </span>
        </div>
      </div>

      {/* Form */}
      <ReportForm />

      {/* Footer note */}
      <p className="text-center text-xs text-slate-400 mt-6">
        Mọi thắc mắc vui lòng liên hệ bộ phận kế hoạch – nghiệp vụ CDC Đà Nẵng
      </p>
    </div>
  );
}
