import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Animal } from 'src/animals/schemas/animal.schema';
import { AbstractModelService } from 'src/common/abstract-model.service';

@Injectable()
export class AnimalModelService extends AbstractModelService<
  Animal,
  'owner' | 'breeder'
> {
  __defaultPopulationPaths = <const>['owner', 'breeder'];

  constructor(
    @InjectModel(Animal.name)
    private mongooseModel: mongoose.Model<Animal>,
  ) {
    super(mongooseModel);
  }
}
