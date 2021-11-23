import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ParseMongoIdPipe } from 'src/common/parse-mongo-id.pipe';
import { Populated } from 'src/common/populated.type';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './schemas/animal.schema';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  /**
   *
   *
   * @param {CreateAnimalDto} createAnimalDto `createAnimalDto` is a plain object without ValidationPipe({`transform: true`}) and not a class object (required to use class methods)
   * @return {Promise<Animal>}
   */
  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) // transforms incoming dto properties from string to its primitive types; can also be set globally in main.ts
  create(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal> {
    console.log('### DTO ###');
    console.dir(createAnimalDto);
    console.log(createAnimalDto.someFunc()); // class function is missing on literal objects, therefore ValidationPipe({`transform: true`}) is required to convert plain/literal object to class object. alternative use `plainToClass()`
    console.log({
      types: {
        name: typeof createAnimalDto.name,
        type: typeof createAnimalDto.type,
        age: typeof createAnimalDto.age,
        bornAt: typeof createAnimalDto.bornAt,
        hasWings: typeof createAnimalDto.hasWings,
      },
    });
    return this.animalsService.create(createAnimalDto);
  }

  /**
   *
   *
   * @return {Promise<Animal[]>}
   */
  @Get()
  findAll(): Promise<Animal[]> {
    return this.animalsService.findAll();
  }

  /**
   *
   *
   * @param {Animal['_id']} id explicit non-primitive type for `id`, value conversion to mongo id via parse pipe.
   * @return {Promise<Animal | null>}
   */
  @Get(':id')
  findOne(
    @Param('id', ParseMongoIdPipe) id: Animal['_id'],
  ): Promise<Animal | null> {
    console.dir(id); // is mongo id
    return this.animalsService.findOne(id); // otherwise `.findOne(new mongoose.Types.ObjectId(id))` would be required
  }

  /**
   *
   *
   * @param {Animal['_id']} id
   * @return {Promise<Populated<Animal> | null>}
   */
  @Get(':id/populated')
  async findOnePopulated(
    @Param('id', ParseMongoIdPipe) id: Animal['_id'],
  ): Promise<Populated<Animal, 'owner'> | null> {
    const myAnimal = await this.animalsService.findOnePopulated(id);
    if (!myAnimal) {
      throw new HttpException(`Animal not found.`, HttpStatus.NOT_FOUND);
    }
    console.log(myAnimal.owner.name);
    return myAnimal;
  }

  /**
   *
   *
   * @param {Animal['age']} age `age` will be converted automatically to type `number` when `transform: true` is set
   * @return {*}
   * @memberof AnimalsController
   */
  @Patch('age/:age')
  @UsePipes(new ValidationPipe({ transform: true })) // can also be set globally in main.ts
  updateAge(@Param('age') age: Animal['age']) {
    console.dir(age);
    console.log(typeof age);
    return;
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: Animal['_id'],
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    return this.animalsService.update(id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Animal['_id']) {
    return this.animalsService.remove(id);
  }
}
