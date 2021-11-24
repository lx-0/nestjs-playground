import { Test, TestingModule } from '@nestjs/testing';
import { RectanglesService } from './rectangles.service';
import { ShapesController } from './shapes.controller';
import { ShapesService } from './shapes.service';

describe('ShapesController', () => {
  let controller: ShapesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShapesController],
      providers: [
        {
          provide: ShapesService,
          useFactory: () => ({}),
        },
        {
          provide: RectanglesService,
          useFactory: () => ({}),
        },
      ],
    }).compile();

    controller = module.get<ShapesController>(ShapesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
