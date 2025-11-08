import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Lead } from '@/models/Lead';
import { sendLeadNotification } from '@/lib/emailNotification';

export async function GET() {
  try {
    await dbConnect();
    
    const leads = await Lead.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: leads });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const lead = await Lead.create(body);
    
    // Send email notification asynchronously (don't wait for it)
    sendLeadNotification({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
    }).catch(err => console.error('Email notification failed:', err));
    
    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
