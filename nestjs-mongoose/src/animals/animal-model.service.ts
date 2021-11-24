import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Animal } from '../animals/schemas/animal.schema';
import { AbstractModelService } from '../common/abstract-model.service';

@Injectable()
export class AnimalModelService extends AbstractModelService<
  Animal,
  'owner' | 'breeder'
> {
  __defaultPopulationPaths = ['owner', 'breeder']; // TODO only define once, maybe infer from KPopulatedPaths ?

  constructor(
    @InjectModel(Animal.name)
    private mongooseModel: mongoose.Model<Animal>,
  ) {
    super(mongooseModel);
  }
}
