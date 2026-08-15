import mongoose, { Schema, Document } from 'mongoose';

export interface IContactMessage extends Document {
  customId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  starred: boolean;
  createdAt?: Date;
}

const ContactMessageSchema: Schema = new Schema(
  {
    customId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['unread', 'read'], default: 'unread' },
    starred: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ContactMessage = mongoose.model<IContactMessage>('ContactMessage', ContactMessageSchema);
