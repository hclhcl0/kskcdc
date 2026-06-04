// app/register/layout.tsx
// Trang register không hiển thị Navbar
import { Suspense } from 'react';

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    // Xóa padding-top vì trang register không có navbar
    <div className="!pt-0 -mt-16">
      <Suspense>{children}</Suspense>
    </div>
  );
}
