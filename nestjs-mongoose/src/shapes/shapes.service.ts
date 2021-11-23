import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateShapeDto } from './dto/create-shape.dto';
import { UpdateShapeDto } from './dto/update-shape.dto';
import {
  ShapeBase,
  ShapeType,
  SHAPE_MODEL_NAME,
} from './entities/shape.entity';

@Injectable()
export class ShapesService {
  constructor(
    @InjectModel(SHAPE_MODEL_NAME)
    private readonly shapeModel: typeof ShapeBase,
  ) {}

  async create(createShapeDto: CreateShapeDto) {
    // const creator: User = {
    //   _id: new mongoose.Types.ObjectId('ABCDEFABCDEFABCDEFABCDEF'),
    // };
    const foo: ShapeBase = {
      type: ShapeType.BASE,
      name: createShapeDto.name,
      // createdBy: creator,
    };
    const newShape = new this.shapeModel(foo);
    await newShape.save();

    // console.dir({ newShape });
    // console.log(newShape.schema);

    // this.print(foo);
    return newShape;
  }

  // print(bar: Shape) {
  //   console.log({ type: bar.type });
  //   if (bar.type === ShapeType.RECTANGLE) {
  //     console.log({ sides: bar.sides });
  //   }
  // }

  findAll() {
    return `This action returns all shapes`;
  }

  async countAll() {
    const count = await this.shapeModel.countDocuments();

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
