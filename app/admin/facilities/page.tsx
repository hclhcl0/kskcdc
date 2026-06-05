import { redirect } from 'next/navigation';
import FacilitiesClientPage from './ClientPage';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function FacilitiesPage() {
  const session = await auth();
  const role = (session?.user as any)?.role;

  if (role !== 'admin' && role !== 'admin_cdc') {
    redirect('/');
  }

  const facilities = await prisma.facility.findMany({
    orderBy: { name: 'asc' }
  });

  return <FacilitiesClientPage initialFacilities={facilities} />;
}
