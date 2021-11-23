import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateShapeDto } from './dto/create-shape.dto';
import { UpdateShapeDto } from './dto/update-shape.dto';
import {
  Rectangle,
  RectangleDocument,
  ShapeType,
} from './entities/shape.entity';

@Injectable()
export class RectanglesService {
  constructor(
    @InjectModel(ShapeType.RECTANGLE)
    private readonly rectangleModel: mongoose.Model<RectangleDocument>,
  ) {}

  async create(createShapeDto: CreateShapeDto) {
    const newShapeData: Rectangle = {
      type: ShapeType.RECTANGLE,
      name: createShapeDto.name,
      sides: 4,
      // radius: 50,
    };

    const newShape: any = new this.rectangleModel(newShapeData);
    await newShape.save();

    console.log(this.rectangleModel.baseModelName);
    console.log(this.rectangleModel.modelName);

    // console.dir({ newShape });
    // console.log(newShape.schema);

    return newShape;
  }

  async findAll() {
    const rectangles = await this.rectangleModel.find();

    console.log(rectangles);

    return rectangles;
  }

  async countAll() {
    const count = await this.rectangleModel.countDocuments();

    console.log(count);

    return count;
  }

  findOne(id: number) {
    return `This action returns a #${id} shape`;
  }

  update(id: number, updateShapeDto: UpdateShapeDto) {
    return `This action updates a #${id} shape`;
  }

  remove(id: number) {
    return `This action removes a #${id} shape`;
  }
}
