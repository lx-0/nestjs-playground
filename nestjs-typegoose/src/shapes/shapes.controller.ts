import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShapesService } from './shapes.service';
import { CreateShapeDto } from './dto/create-shape.dto';
import { UpdateShapeDto } from './dto/update-shape.dto';

@Controller('shapes')
export class ShapesController {
  constructor(private readonly shapesService: ShapesService) {}

  @Post()
  create(@Body() createShapeDto: CreateShapeDto) {
    return this.shapesService.create(createShapeDto);
  }

  @Get()
  findAll() {
    return this.shapesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shapesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShapeDto: UpdateShapeDto) {
    return this.shapesService.update(+id, updateShapeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shapesService.remove(+id);
  }
}
