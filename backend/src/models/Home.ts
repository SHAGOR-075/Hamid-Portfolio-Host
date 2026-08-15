import mongoose, { Schema, Document } from 'mongoose';

export interface IHome extends Document {
  name: string;
  badge: string;
  heading: string;
  description: string;
  location: string;
  availability: string;
  heroImage: string;
  primaryButtonText: string;
  primaryButtonUrl: string;
  secondaryButtonText: string;
  secondaryButtonUrl: string;
  floatingTags: string[];
}

const HomeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    badge: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, default: 'Dhaka, Bangladesh' },
    availability: { type: String, default: 'Available for full-time roles & projects' },
    heroImage: { type: String, required: true },
    primaryButtonText: { type: String, default: 'Explore Projects' },
    primaryButtonUrl: { type: String, default: '#projects' },
    secondaryButtonText: { type: String, default: 'Download CV' },
    secondaryButtonUrl: { type: String, default: '/resume.pdf' },
    floatingTags: [{ type: String }],
  },
  { timestamps: true }
);

export const Home = mongoose.model<IHome>('Home', HomeSchema);
