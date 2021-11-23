import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateShapeDto } from './dto/create-shape.dto';
import { UpdateShapeDto } from './dto/update-shape.dto';
import { RectanglesService } from './rectangles.service';
import { ShapesService } from './shapes.service';

@Controller('shapes')
export class ShapesController {
  constructor(
    private readonly shapesService: ShapesService,
    private readonly rectanglesService: RectanglesService,
  ) {}

  @Post()
  create(@Body() createShapeDto: CreateShapeDto) {
    return this.shapesService.create(createShapeDto);
  }

  @Get('count')
  countAll() {
    return this.shapesService.countAll();
  }

  @Post('rectangle')
  createRect(@Body() createShapeDto: CreateShapeDto) {
    return this.rectanglesService.create(createShapeDto);
  }

  @Get('rectangle')
  findAllRect() {
    return this.rectanglesService.findAll();
  }

  @Get('rectangle/count')
  countAllRect() {
    return this.rectanglesService.countAll();
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
