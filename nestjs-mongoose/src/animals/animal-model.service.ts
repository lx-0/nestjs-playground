import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Animal } from 'src/animals/schemas/animal.schema';
import { AbstractModelService } from 'src/common/abstract-model.service';
import { BaseEntity } from 'src/common/base-entity.class';

@Injectable()
export class AnimalModelService<
  T extends BaseEntity = Animal,
> extends AbstractModelService<T> {
  __defaultPopulationPaths = <const>['owner', 'breeder'];

  constructor(
    @InjectModel(Animal.name)
    private mongooseModel: mongoose.Model<T>,
  ) {
    super(mongooseModel);
  }
}
