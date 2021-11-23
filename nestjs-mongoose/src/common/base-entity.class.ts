import mongoose from 'mongoose';

export class BaseEntity {
  readonly __defaultPopulationPaths;

  constructor(paths: any) {
    this.__defaultPopulationPaths = paths;
  }

  _id: mongoose.Types.ObjectId;
}
