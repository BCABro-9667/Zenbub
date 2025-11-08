import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = req.cookies.get('admin-session');
    
    if (session && session.value === 'authenticated') {
      return NextResponse.json({
        success: true,
        authenticated: true,
      });
    } else {
      return NextResponse.json({
        success: true,
        authenticated: false,
      });
    }
  } catch (error) {
    console.error('Check auth error:', error);
    return NextResponse.json(
      {
        success: false,
        authenticated: false,
      },
      { status: 500 }
    );
  }
}
