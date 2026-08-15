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
    customId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    icon: { type: String, required: true },
    description: { type: String },
    level: { type: Number, default: 80, min: 0, max: 100 },
    order: { type: Number, default: 0, index: true },
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

SkillSchema.index({ active: 1, order: 1 });

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);
