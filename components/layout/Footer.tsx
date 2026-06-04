export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-8 bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
        <p className="text-sm text-slate-600">
          &copy; {year} Bản quyền thuộc về <span className="font-bold text-blue-700">Trung tâm Kiểm soát bệnh tật (CDC) Thành phố Đà Nẵng</span>
        </p>
        <p className="text-xs text-slate-500">
          Hệ thống Báo cáo Khám Sức khỏe Toàn dân & Tiến độ Tiêm chủng
        </p>
      </div>
    </footer>
  );
}
