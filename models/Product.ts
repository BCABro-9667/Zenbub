import mongoose, { Schema, model, models } from 'mongoose';

export interface IProduct {
  _id?: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description: string;
  specifications?: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: string;
  stock: number;
  sku?: string;
  brochureUrl?: string;
  videoUrl?: string;
  whatsappNumber?: string;
  isActive: boolean;
  isFeatured: boolean;
  isTopRated: boolean;
  isTopSale: boolean;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String },
    description: { type: String, required: true },
    specifications: { type: String },
    price: { type: Number, required: true },
    comparePrice: { type: Number },
    images: [{ type: String }],
    category: { type: String, ref: 'Category', required: true },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String },
    brochureUrl: { type: String },
    videoUrl: { type: String },
    whatsappNumber: { type: String },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isTopRated: { type: Boolean, default: false },
    isTopSale: { type: Boolean, default: false },
    tags: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
  },
  { timestamps: true }
);

export const Product = models.Product || model<IProduct>('Product', ProductSchema);
