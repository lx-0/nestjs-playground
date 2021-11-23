import mongoose from 'mongoose';
import { AnimalType } from 'src/animals/entities/animal-type.enum';
import { Animal } from 'src/animals/schemas/animal.schema';
import { User } from 'src/users/entities/user.entity';

/**
 * Defines all mongoose.Types.ObjectId union types of object T as objects (populated).
 * TODO: define keys to be populated
 */
export type PopulatedAll<T> = {
  [K in keyof T]: Exclude<T[K], mongoose.Types.ObjectId> extends never
    ? T[K]
    : Exclude<T[K], mongoose.Types.ObjectId>;
};

export type PlainMongoRef<T> = {
  [K in keyof T]: Extract<T[K], mongoose.Types.ObjectId> extends never
    ? T[K]
    : mongoose.Types.ObjectId;
};

// Pick + Exclude used instead of Omit to be type safe, see: https://stackoverflow.com/questions/67916501/why-is-omit-not-typesafe
type TypeSafeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
// from: https://hackernoon.com/how-to-link-mongoose-and-typescript-for-a-single-source-of-truth-94o3uqc
export type Populated<T, K extends keyof T> = PlainMongoRef<
  TypeSafeOmit<T, K>
> & {
  [P in K]: Exclude<T[P], mongoose.Types.ObjectId[] | mongoose.Types.ObjectId>;
};
// export type PopulatedDefault<T extends BaseEntity> = Populated<
//   T,
//   T['__defaultPopulationPaths'][number]
// >;

const x: Populated<Animal, 'owner' | 'breeder'> = {
  _id: new mongoose.Types.ObjectId(),
  name: 'Garfield',
  hasWings: false,
  owner: <User>{},
  // owner: new mongoose.Types.ObjectId(), // throws error
  prevOwner: new mongoose.Types.ObjectId(),
  type: AnimalType.CAT,
  age: 2,
  // missingProp: true, // throws error
};
