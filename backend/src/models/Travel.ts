import mongoose, { Schema, Document } from 'mongoose';

export interface ITravelPhoto {
  id: string;
  url: string;
  caption: string;
  isCover: boolean;
  showInGallery: boolean;
  order: number;
}

export interface ITravelPost extends Document {
  customId: string;
  location: string;
  country: string;
  date: string;
  shortDescription: string;
  longDescription: string;
  coverImage: string;
  photos: ITravelPhoto[];
  featured: boolean;
  order: number;
  active: boolean;
  carouselSettings?: {
    autoplay: boolean;
    autoplaySpeed: number;
    loop: boolean;
    navigation: boolean;
    pagination: boolean;
  };
}

const TravelSchema: Schema = new Schema(
  {
    customId: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    date: { type: String, required: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    coverImage: { type: String, required: true },
    photos: [
      {
        id: { type: String },
        url: { type: String },
        caption: { type: String },
        isCover: { type: Boolean, default: false },
        showInGallery: { type: Boolean, default: true },
        order: { type: Number, default: 0 },
      },
    ],
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    carouselSettings: {
      autoplay: { type: Boolean, default: true },
      autoplaySpeed: { type: Number, default: 4000 },
      loop: { type: Boolean, default: true },
      navigation: { type: Boolean, default: true },
      pagination: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export const Travel = mongoose.model<ITravelPost>('Travel', TravelSchema);
