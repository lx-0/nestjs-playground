import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AnimalModelService } from './animal-model.service';
import { AnimalsStandardService } from './animals-standard.service';
import { AnimalsService } from './animals.service';
import { Animal } from './schemas/animal.schema';
import { testAnimals } from './test-animals.data';

class AnimalModelMock {
  static find = jest.fn().mockResolvedValue([testAnimals[0]]);
  static findOne = jest.fn().mockResolvedValue(testAnimals[0]);
}

describe('AnimalsService', () => {
  let service: AnimalsStandardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalsService,
        {
          provide: getModelToken(Animal.name),
          useClass: AnimalModelMock,
        },
        {
          provide: AnimalModelService,
          useValue: {
            create: jest.fn(() => null),
            findOneAndPopulate: jest.fn(() => null),
          },
        },
      ],
    }).compile();

    service = module.get<AnimalsStandardService>(AnimalsStandardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
