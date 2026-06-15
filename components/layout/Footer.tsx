export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-8 bg-slate-50 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
        <p className="text-sm text-slate-600">
          &copy; {year} Bản quyền thuộc về <span className="font-bold text-blue-700">Trung tâm Kiểm soát bệnh tật (CDC) Thành phố Đà Nẵng</span>
        </p>
        <p className="text-xs text-slate-500">
          Hệ thống Báo cáo nhanh Khám Sức khỏe Toàn dân
        </p>
        <p className="text-xs text-slate-500 font-medium pt-1">
          Hỗ trợ: Chuyên môn BS Nguyễn Trí Thức, SĐT: 0399.016.244 ; Kỹ thuật KS. Hồ Công Lượng, SĐT: 0935.593.353
        </p>
      </div>
    </footer>
  );
}
