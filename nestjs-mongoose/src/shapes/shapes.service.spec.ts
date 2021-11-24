import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { SHAPE_MODEL_NAME } from './entities/shape.entity';
import { ShapesService } from './shapes.service';

class ShapeModelMock {
  // static find = jest.fn().mockResolvedValue([testAnimals[0]]);
  // static findOne = jest.fn().mockResolvedValue(testAnimals[0]);
}

describe('ShapesService', () => {
  let service: ShapesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShapesService,
        {
          provide: getModelToken(SHAPE_MODEL_NAME),
          useClass: ShapeModelMock,
        },
      ],
    }).compile();

    service = module.get<ShapesService>(ShapesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
