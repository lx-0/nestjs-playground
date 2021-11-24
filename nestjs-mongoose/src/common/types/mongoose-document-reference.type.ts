import mongoose from 'mongoose';

/**
 * Defines a type for a mongoose ObjectId or a populated mongoose document.
 */
export type MongooseDocumentReference =
  | mongoose.Types.ObjectId
  | { _id: mongoose.Types.ObjectId }
  | { _id?: mongoose.Types.ObjectId };
