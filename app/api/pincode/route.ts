import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pincode = searchParams.get('pincode');

    if (!pincode) {
      return NextResponse.json(
        { success: false, message: 'PIN code is required' },
        { status: 400 }
      );
    }

    // Fetch from postal pincode API
    const response = await fetch(`http://www.postalpincode.in/api/pincode/${pincode}`);
    const data = await response.json();

    if (data.Status === 'Success' && data.PostOffice && data.PostOffice.length > 0) {
      const postOffice = data.PostOffice[0];
      return NextResponse.json({
        success: true,
        data: {
          city: postOffice.District || '',
          state: postOffice.State || '',
        },
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid PIN code' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error fetching pincode details:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch PIN code details' },
      { status: 500 }
    );
  }
}
