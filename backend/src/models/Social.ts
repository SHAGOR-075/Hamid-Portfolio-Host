import mongoose, { Schema, Document } from 'mongoose';

export interface ISocial extends Document {
  customId: string;
  platform: string;
  url: string;
  icon: string;
  visible: boolean;
  order: number;
}

const SocialSchema: Schema = new Schema(
  {
    customId: { type: String, required: true, unique: true },
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Social = mongoose.model<ISocial>('Social', SocialSchema);
