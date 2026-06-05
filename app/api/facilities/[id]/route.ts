import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (role !== 'admin' && role !== 'admin_cdc') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    
    // Check if there are any accounts using this facility
    const facility = await prisma.facility.findUnique({ where: { id } });
    if (!facility) {
      return NextResponse.json({ error: 'Facility not found' }, { status: 404 });
    }

    const accountsUsing = await prisma.account.count({
      where: { facilityName: facility.name }
    });

    if (accountsUsing > 0) {
      return NextResponse.json({ 
        error: `Không thể xóa vì đang có ${accountsUsing} đơn vị thuộc Cơ sở y tế này.` 
      }, { status: 400 });
    }

    await prisma.facility.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting facility:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
