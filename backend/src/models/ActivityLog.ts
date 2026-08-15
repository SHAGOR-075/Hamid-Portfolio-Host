import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  customId: string;
  action: string;
  section: string;
  timestamp: string;
}

const ActivityLogSchema: Schema = new Schema(
  {
    customId: { type: String, required: true },
    action: { type: String, required: true },
    section: { type: String, required: true },
    timestamp: { type: String, required: true },
  },
  { timestamps: true }
);

export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
