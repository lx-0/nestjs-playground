import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import { BaseEntity } from 'src/common/base-entity.class';
import { MongoRef } from 'src/common/mongo-ref.type';
import { User } from 'src/users/entities/user.entity';
import { AnimalType } from '../entities/animal-type.enum';

/**
 * Defines the properties required to create an instance of the entity.
 * ! Not required as DTO already has non-primitive types.
 */
// export type CreateAnimal = Omit<Animal, '_id'>;

/**
 * Defines the entity and it's database schema.
 *
 * @class Animal
 */
@Schema()
export class Animal extends BaseEntity {
  // __defaultPopulationPaths = <const>['owner', 'breeder'];

  /**
   * Creates an instance of Animal.
   * Used for setting defaults when instantiating new entity.
   *
   * @param {CreateAnimal} input
   * @memberof Animal
   */
  constructor(input: Omit<Animal, '_id'>) {
    super(['owner', 'breeder'] as const);
    console.log('### `Animal`.constructor() ###');
    this._id = new mongoose.Types.ObjectId();
    this.name = input.name;
    this.owner = input.owner;
    this.type = input.type;
    this.foodPlan = { hasBreakfast: false, hasLunch: false, hasDinner: false };
    this.hasWings = false;
    type x = typeof this.__defaultPopulationPaths[number];
  }

  @Prop({ required: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  type: AnimalType;

  @Prop({ required: true })
  name: string;

  @Prop()
  age?: number;

  @Prop()
  bornAt?: Date;

  @Prop({ required: true })
  hasWings: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: MongoRef<User>; // ? how to reflect populated / unpopulated state

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  breeder?: User | mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  prevOwner?: User | mongoose.Types.ObjectId;

  @Prop({
    type: {
      hasBreakfast: Boolean,
      hasLunch: Boolean,
      hasDinner: Boolean,
    },
    _id: false,
    required: true,
  }) // nested document
  foodPlan?: {
    hasBreakfast: boolean;
    hasLunch: boolean;
    hasDinner: boolean;
  };
}

/**
 * Creates the database schema from the entity class.
 */
export const AnimalSchema = SchemaFactory.createForClass(Animal);

// ****************
// * Plugins
// ****************
AnimalSchema.plugin(mongoosePaginate);
AnimalSchema.plugin(mongooseAggregatePaginate);
