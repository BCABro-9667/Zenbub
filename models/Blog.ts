import mongoose, { Schema, model, models } from 'mongoose';

export interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  author: string;
  shortDescription: string;
  content: string;
  image: string;
  metaImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  tags?: string[];
  category?: string;
  isActive: boolean;
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    shortDescription: { type: String, required: true, maxlength: 350 },
    content: { type: String, required: true },
    image: { type: String, required: true },
    metaImage: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    tags: [{ type: String }],
    category: { type: String },
    isActive: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Blog = models.Blog || model<IBlog>('Blog', BlogSchema);
