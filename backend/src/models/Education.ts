import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  customId: string;
  degree: string;
  institution: string;
  department: string;
  startYear: string;
  endYear: string;
  gpa: string;
  description: string;
  achievement: string;
  location: string;
  icon: string;
  order: number;
  active: boolean;
}

const EducationSchema: Schema = new Schema(
  {
    customId: { type: String, required: true, unique: true },
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    department: { type: String, required: true },
    startYear: { type: String, required: true },
    endYear: { type: String, required: true },
    gpa: { type: String },
    description: { type: String },
    achievement: { type: String },
    location: { type: String },
    icon: { type: String, default: 'GraduationCap' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Education = mongoose.model<IEducation>('Education', EducationSchema);
