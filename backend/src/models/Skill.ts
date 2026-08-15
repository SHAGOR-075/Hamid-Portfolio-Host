import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
  customId: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  level: number;
  order: number;
  active: boolean;
}

const SkillSchema: Schema = new Schema(
  {
    customId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String },
    level: { type: Number, default: 80, min: 0, max: 100 },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);
