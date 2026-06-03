// app/login/layout.tsx
// Trang login không hiển thị Navbar
import { Suspense } from 'react';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    // Xóa padding-top vì trang login không có navbar
    <div className="!pt-0 -mt-16">
      <Suspense>{children}</Suspense>
    </div>
  );
}
