import mongoose, { Schema, model, models } from 'mongoose';

export interface ILead {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt?: Date;
  updatedAt?: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String },
    source: { type: String, default: 'website' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const Lead = models.Lead || model<ILead>('Lead', LeadSchema);
