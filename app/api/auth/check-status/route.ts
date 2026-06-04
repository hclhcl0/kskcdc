import { NextResponse } from 'next/server';
import { findAccountByUsername } from '@/lib/accounts';

export async function POST(request: Request) {
  try {
    const { username } = await request.json();
    if (!username) {
      return NextResponse.json({ error: 'Missing username' }, { status: 400 });
    }

    const account = await findAccountByUsername(username);
    if (!account) {
      return NextResponse.json({ status: 'not-found' });
    }

    return NextResponse.json({ status: account.status || 'approved' });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
