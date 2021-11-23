import mongoose from 'mongoose';
import { BaseEntity } from 'src/common/base-entity.class';

export interface User extends BaseEntity {
  name: string;
}

// Schema options
export const USER_COLLECTION_NAME = 'users';
export const USER_MODEL_NAME = 'User';
export const USER_SCHEMA_OPTIONS: mongoose.SchemaOptions = {
  collection: USER_COLLECTION_NAME,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};

// Base Schema
export const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
    },
  },
  USER_SCHEMA_OPTIONS,
);

// Base mongoose Document (unpopulated)
export type UserDocument = User & mongoose.Document;

// Base mongoose Model
// export const User = mongoose.model<UserDocument>(USER_MODEL_NAME, UserSchema);
