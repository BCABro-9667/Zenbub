import mongoose, { Schema, model, models } from 'mongoose';

export interface IBanner {
  _id?: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink?: string;
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const BannerSchema = new Schema<IBanner>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, default: '/shop' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Banner = models.Banner || model<IBanner>('Banner', BannerSchema);
