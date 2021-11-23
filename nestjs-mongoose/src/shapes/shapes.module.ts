import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CircleSchema,
  RectangleSchema,
  ShapeSchema,
  ShapeType,
  SHAPE_MODEL_NAME,
} from './entities/shape.entity';
import { RectanglesService } from './rectangles.service';
import { ShapesController } from './shapes.controller';
import { ShapesService } from './shapes.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SHAPE_MODEL_NAME,
        schema: ShapeSchema,
        discriminators: [
          {
            name: ShapeType.RECTANGLE,
            schema: RectangleSchema,
          },
          { name: ShapeType.CIRCLE, schema: CircleSchema },
        ],
      },
    ]),
  ],
  controllers: [ShapesController],
  providers: [ShapesService, RectanglesService],
})
export class ShapesModule {}
