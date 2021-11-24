import mongoose from 'mongoose';
import { BaseEntity } from '../base-entity.class';

/**
 * Defines a reference to another mongo db collection.
 * Will be typed as union of mongo object id and the collection entity type.
 */
export type MongoRef<T extends BaseEntity> = T | mongoose.Types.ObjectId;
