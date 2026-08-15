import mongoose, { Schema, Document } from 'mongoose';

export interface IAboutStat {
  id: string;
  value: string;
  label: string;
  iconName: string;
  order: number;
  active: boolean;
}

export interface IAbout extends Document {
  badge: string;
  title: string;
  description: string;
  paragraphs: string[];
  profileImage: string;
  buttonText: string;
  buttonLink: string;
  stats: IAboutStat[];
}

const AboutSchema: Schema = new Schema(
  {
    badge: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    paragraphs: [{ type: String }],
    profileImage: { type: String, required: true },
    buttonText: { type: String, default: 'Get In Touch' },
    buttonLink: { type: String, default: '#contact' },
    stats: [
      {
        id: { type: String },
        value: { type: String },
        label: { type: String },
        iconName: { type: String },
        order: { type: Number, default: 0 },
        active: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

export const About = mongoose.model<IAbout>('About', AboutSchema);
