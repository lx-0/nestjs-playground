import mongoose from 'mongoose';
import { BaseEntity } from '../base-entity.class';

export type MongoRef<T extends BaseEntity> = T | mongoose.Types.ObjectId;
