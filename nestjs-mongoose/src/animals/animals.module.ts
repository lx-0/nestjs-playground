import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalModelService } from './animal-model.service';
import { AnimalsStandardService } from './animals-standard.service';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { Animal, AnimalSchema } from './schemas/animal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Animal.name, schema: AnimalSchema }]),
  ],
  controllers: [AnimalsController],
  providers: [AnimalsService, AnimalsStandardService, AnimalModelService],
})
export class AnimalsModule {}
