import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectMetric {
  label: string;
  value: string;
}

export interface IProject extends Document {
  customId: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  order: number;
  active: boolean;
  metrics?: IProjectMetric[];
  features?: string[];
  architectureOverview?: string;
}

const ProjectSchema: Schema = new Schema(
  {
    customId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, index: true },
    image: { type: String, required: true },
    technologies: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0, index: true },
    active: { type: Boolean, default: true, index: true },
    metrics: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    features: [{ type: String }],
    architectureOverview: { type: String, default: '' },
  },
  { timestamps: true }
);

ProjectSchema.index({ featured: -1, order: 1 });
ProjectSchema.index({ active: 1, order: 1 });

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
