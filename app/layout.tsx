import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import AuthProvider from '@/components/layout/AuthProvider';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Báo cáo Khám Sức khỏe Toàn dân | Thành phố Đà Nẵng',
  description: 'Hệ thống báo cáo số liệu khám sức khỏe định kỳ cho các đơn vị y tế trên địa bàn.',
  keywords: ['sức khỏe', 'khám sức khỏe', 'CDC', 'y tế', 'báo cáo'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        <AuthProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
