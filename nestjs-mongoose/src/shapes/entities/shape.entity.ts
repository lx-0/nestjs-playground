import mongoose from 'mongoose';

// Discriminator Key
export enum ShapeType {
  BASE = 'Base',
  RECTANGLE = 'RectangleShape',
  CIRCLE = 'CircleShape',
}

// Base Interface
export interface ShapeBase {
  type: ShapeType;
  name: string;
  // additionalProp: string;
  // createdBy: User | User['_id'];
}

// Discriminated Interfaces
export interface Rectangle extends ShapeBase {
  type: ShapeType.RECTANGLE;
  sides: number;
}
export interface Circle extends ShapeBase {
  type: ShapeType.CIRCLE;
  radius: number;
}

// export interface Shape extends Circle, Rectangle {}
export type Shape = Circle | Rectangle;

// Populated Variant of Base Interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ShapeBasePopulated extends ShapeBase {
  // createdBy: User;
}

// Schema options
export const SHAPE_COLLECTION_NAME = 'shapes';
export const SHAPE_MODEL_NAME = 'Shape';
export const SHAPE_SCHEMA_OPTIONS: mongoose.SchemaOptions = {
  collection: SHAPE_COLLECTION_NAME,
  discriminatorKey: 'type',
};

// Base Schema
export const ShapeSchema = new mongoose.Schema<ShapeBaseDocument>(
  {
    name: {
      type: String,
    },
    // notExisting: {
    //   type: String,
    // },
  },
  SHAPE_SCHEMA_OPTIONS,
);

// Base mongoose Document (unpopulated)
export interface ShapeBaseDocument extends ShapeBase, mongoose.Document {
  //   createdBy: User['_id'];
}

// Base mongoose Document (populated)
export interface ShapeBasePopulatedDocument
  extends ShapeBase,
    mongoose.Document {
  //   createdBy: User;
}

// Base mongoose Model
export const ShapeBase = mongoose.model<ShapeBaseDocument>(
  SHAPE_MODEL_NAME,
  ShapeSchema,
);

// Discriminator mongoose Document
export interface RectangleDocument extends Rectangle, mongoose.Document {}
export interface CircleDocument extends Circle, mongoose.Document {}

// Discriminators
export const RectangleSchema = new mongoose.Schema<RectangleDocument>(
  {
    sides: { type: Number },
    // notExisting: {
    //   type: String,
    // },
  },
  { discriminatorKey: 'type' },
);
// export const Rectangle = ShapeBase.discriminator<RectangleDocument>(
//   ShapeType.RECTANGLE,
//   RectangleSchema,
// );
export const CircleSchema = new mongoose.Schema<CircleDocument>(
  { radius: { type: Number } },
  { discriminatorKey: 'type' },
);
// export const Circle = ShapeBase.discriminator<CircleDocument>(
//   ShapeType.CIRCLE,
//   CircleSchema,
// );
