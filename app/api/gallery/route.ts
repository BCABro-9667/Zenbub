import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Gallery } from '@/models/Gallery';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || '100';
    const category = searchParams.get('category') || '';
    const isActive = searchParams.get('isActive') || 'true';
    
    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (isActive === 'true') {
      query.isActive = true;
    } else if (isActive === 'false') {
      query.isActive = false;
    }
    
    const galleries = await Gallery.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    return NextResponse.json({
      success: true,
      data: galleries,
      count: galleries.length
    });
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch galleries'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { title, description, imageUrl, category, isActive } = body;
    
    const newGallery = new Gallery({
      title,
      description,
      imageUrl,
      category,
      isActive: isActive !== undefined ? isActive : true
    });
    
    const savedGallery = await newGallery.save();
    
    return NextResponse.json({
      success: true,
      data: savedGallery
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to create gallery'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { id, ...updateData } = body;
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Gallery ID is required'
      }, { status: 400 });
    }
    
    const updatedGallery = await Gallery.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true }
    );
    
    if (!updatedGallery) {
      return NextResponse.json({
        success: false,
        error: 'Gallery not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: updatedGallery
    });
  } catch (error) {
    console.error('Error updating gallery:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to update gallery'
    }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Gallery ID is required'
      }, { status: 400 });
    }
    
    const deletedGallery = await Gallery.findByIdAndDelete(id);
    
    if (!deletedGallery) {
      return NextResponse.json({
        success: false,
        error: 'Gallery not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Gallery deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting gallery:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to delete gallery'
    }, { status: 500 });
  }
}