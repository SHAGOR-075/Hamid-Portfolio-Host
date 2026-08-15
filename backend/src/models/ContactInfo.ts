import mongoose, { Schema, Document } from 'mongoose';

export interface IContactInfo extends Document {
  email: string;
  phone: string;
  location: string;
  availability: string;
  contactDescription: string;
  contactFormEnabled: boolean;
  badge: string;
  title: string;
  responseTime: string;
}

const ContactInfoSchema: Schema = new Schema(
  {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    availability: { type: String, required: true },
    contactDescription: { type: String, required: true },
    contactFormEnabled: { type: Boolean, default: true },
    badge: { type: String, default: 'GET IN TOUCH' },
    title: { type: String, default: "Let's Build Something Intelligent" },
    responseTime: { type: String, default: 'Usually responds within 24 hours' },
  },
  { timestamps: true }
);

export const ContactInfo = mongoose.model<IContactInfo>('ContactInfo', ContactInfoSchema);
