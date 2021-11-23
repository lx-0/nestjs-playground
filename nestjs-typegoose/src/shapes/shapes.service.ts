import { Injectable } from '@nestjs/common';
import { CreateShapeDto } from './dto/create-shape.dto';
import { UpdateShapeDto } from './dto/update-shape.dto';

@Injectable()
export class ShapesService {
  create(createShapeDto: CreateShapeDto) {
    return 'This action adds a new shape';
  }

  findAll() {
    return `This action returns all shapes`;
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
