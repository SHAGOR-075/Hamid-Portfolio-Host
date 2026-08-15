import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  siteTitle: string;
  siteTagline: string;
  metaDescription: string;
  keywords: string[];
  favicon: string;
  ogImage: string;
  googleAnalyticsId: string;
  searchConsoleTag: string;
  websiteName: string;
  browserTitle: string;
  footerName: string;
  footerDescription: string;
  copyrightText: string;
  previewUrl: string;
}

const SettingsSchema: Schema = new Schema(
  {
    siteTitle: { type: String, required: true },
    siteTagline: { type: String, required: true },
    metaDescription: { type: String, required: true },
    keywords: [{ type: String }],
    favicon: { type: String },
    ogImage: { type: String },
    googleAnalyticsId: { type: String },
    searchConsoleTag: { type: String },
    websiteName: { type: String },
    browserTitle: { type: String },
    footerName: { type: String },
    footerDescription: { type: String },
    copyrightText: { type: String },
    previewUrl: { type: String },
  },
  { timestamps: true }
);

export const Settings = mongoose.model<ISettings>('Settings', SettingsSchema);
