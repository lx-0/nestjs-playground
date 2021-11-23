import { BadRequestException } from '@nestjs/common';
import { OmitType } from '@nestjs/mapped-types';
import { Transform, TransformFnParams, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { AnimalType } from '../entities/animal-type.enum';
import { Animal } from '../schemas/animal.schema';

const transformMongoId = ({ value }: TransformFnParams) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new BadRequestException('Invalid ObjectId');
  }
  return new mongoose.Types.ObjectId(value);
};

/**
 * Dto<T> type is used to ensure no non-primitive types are used in DTO.
 *
 * Validation decorators: https://github.com/typestack/class-validator#validation-decorators
 *
 * @class CreateAnimalDto
 * @implements {CreateAnimal}
 */
export class CreateAnimalDto extends OmitType(Animal, ['_id'] as const) {
  @IsString()
  name!: Animal['name'];

  // TODO: create class-validator to check real mongo object id
  // @IsMongoId() // ! only parses if value is 24-char string
  @Transform(transformMongoId) // convert non-primitive type to mongo object id, also validates it
  owner: Animal['owner']; // needs to be primitive type string instead of mongoose object id, otherwise might query id by string (instead of mongoose object id)

  @IsEnum(AnimalType)
  type: AnimalType;

  @IsNumber()
  @IsOptional()
  age: Animal['age'];

  @Type(() => Date) // to transform `string` to `Date`
  @IsDate()
  @IsOptional()
  bornAt: Animal['bornAt'];

  @IsBoolean()
  hasWings: Animal['hasWings'];

  /**
   * Used to convert DTO to non-primitive entity type.
   * Not required if using @Transform on non-primitive types in the DTO class (primitive types will be checked and converted automatically).
   *
   * @return {*}  {CreateAnimal}
   * @memberof CreateAnimalDto
   */
  // mapToEntity(): CreateAnimal {
  // return {
  //   ...this,
  //   owner: new mongoose.Types.ObjectId(this.owner), // type conversion from primitive to entity type
  // };
  // }
  someFunc() {
    return 'someFunc()';
  }
}
