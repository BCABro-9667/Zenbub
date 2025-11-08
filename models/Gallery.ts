import mongoose, { Schema, model, models } from 'mongoose';

export interface IGallery {
  _id?: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const GallerySchema = new Schema<IGallery>(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    category: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Gallery = models.Gallery || model<IGallery>('Gallery', GallerySchema);