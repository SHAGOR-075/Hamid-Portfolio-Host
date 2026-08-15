import mongoose from 'mongoose';

export const buildIdQuery = (id: string) => {
  if (mongoose.Types.ObjectId.isValid(id) && id.length === 24) {
    return { $or: [{ _id: id }, { customId: id }] };
  }
  return { customId: id };
};
