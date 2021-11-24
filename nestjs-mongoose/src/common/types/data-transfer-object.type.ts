import mongoose from 'mongoose';
import { MongooseDocumentReference } from './mongoose-document-reference.type';

/**
 * Ensures a valid DTO type.
 *
 * - converts mongoose ObjectIds to string recursively
 * - converts DateTime to string recursively
 * - omits all non primitive types (string, number, boolean)
 */
// export type DataTransferObject<T> = OmitNonPrimitives<ObjectIdsAsString<DateTimesAsString<T>>>;

// from: https://dev.to/tamj0rd2/dto-a-typescript-utility-type-4o3m
// from: https://github.com/tamj0rd2/dto/blob/master/src/dto.ts
// expanded to also replace mongoose object ids
type IsOptional<T> = Extract<T, undefined> extends never ? false : true;
export type Func = (...args: any[]) => any;
type IsFunction<T> = T extends Func ? true : false;
type IsValueType<T> = T extends
  | mongoose.Types.ObjectId
  | string
  | number
  | boolean
  | null
  | undefined
  | Func
  | Set<any>
  | Map<any, any>
  | Date
  | Array<any>
  ? true
  : false;

type ReplaceMongooseObjectId<T> = T extends mongoose.Types.ObjectId
  ? string
  : T;
type ReplaceMongooseDocumentReference<T> = T extends MongooseDocumentReference
  ? string
  : T;
type ReplaceDate<T> = T extends Date ? string : T;
type ReplaceSet<T> = T extends Set<infer X> ? X[] : T;
type ReplaceMap<T> = T extends Map<infer K, infer I>
  ? Record<
      K extends string | number | symbol ? K : string,
      IsValueType<I> extends true
        ? I
        : { [K in keyof ExcludeFuncsFromObj<I>]: Dto<I[K]> }
    >
  : T;
type ReplaceArray<T> = T extends Array<infer X> ? Dto<X>[] : T;

type ExcludeFuncsFromObj<T> = Pick<
  T,
  { [K in keyof T]: IsFunction<T[K]> extends true ? never : K }[keyof T]
>;

// type Dtoified<T> = IsValueType<T> extends true
//   ? ReplaceDate<ReplaceMoment<ReplaceMap<ReplaceSet<ReplaceArray<ReplaceMongooseObjectId<T>>>>>>
//   : { [K in keyof ExcludeFuncsFromObj<T>]: Dto<ReplaceMongooseDocumentReference<T[K]>> };
type Dtoified<T> = IsValueType<T> extends true
  ? ReplaceDate<
      ReplaceMap<ReplaceSet<ReplaceArray<ReplaceMongooseObjectId<T>>>>
    >
  : { [K in keyof T]: Dto<ReplaceMongooseDocumentReference<T[K]>> };

export type Dto<T> = IsFunction<T> extends true
  ? never
  : IsOptional<T> extends true
  ? Dtoified<Exclude<T, undefined>> | null
  : Dtoified<T>;

export type Serializable<T> = T & { serialize(): Dto<T> };

// // * TEST data
// function update(updateDto: Dto<UpdatePostDto>, update: UpdatePostDto) {
//   updateDto.requestedServices.shuttle.limit = {
//     type: ComposedValueType.AMOUNT_INTERVAL,
//     interval: Interval.ORDER_PERIOD,
//     amount: '0',
//   };
//   update.requestedServices.shuttle.limit = {
//     type: ComposedValueType.AMOUNT_INTERVAL,
//     interval: Interval.ORDER_PERIOD,
//   };

//   const newPost: Dto<UpdatePostDto> = {
//     partners: undefined,
//     businessInformation: undefined,
//     state: undefined,
//     user: undefined,
//     testAccount: undefined,
//     requestedServices: {},
//     schedule: undefined,
//     priority: undefined,
//     role: undefined,
//     aufgabenbereiche: undefined,
//     arbeitszeit: undefined,
//     mobile: undefined,
//     special_services: undefined,
//     description: undefined,
//     validity: undefined,
//     working_time: undefined,
//     fallnummer: undefined,
//     insurance: undefined,
//     expense_flat: undefined,
//     anfahrten: undefined,
//     maxHourlyRate: undefined,
//     maximalVolume: undefined,
//     pflegebeduerftigerInformation: undefined,
//   };
// }

// enum CarType {
//   TRUCK = 'TRUCK',
//   AUTO = 'AUTO',
// }

// enum MetaType {
//   TRUCK = 'TRUCK',
//   AUTO = 'AUTO',
// }

// interface ICar {
//   _id?: mongoose.Types.ObjectId;
//   type: CarType;
//   paintDate: Date;
//   factoryDate: Date | Moment;
//   buyDate: DateTime;
//   name: string;
//   num: number;
//   passangers: string[];
//   meta: {
//     deleted: boolean;
//     metaType: MetaType;
//     createdAt: DateTime;
//     updatedAt?: DateTime;
//   };
//   user: { _id: mongoose.Types.ObjectId; name: string; createdAt: DateTime };
// }

// const y: Dto<ICar> = {
//   _id: 'asdf',
//   user: 'asdf',
//   paintDate: 'asdf',
// };

// class Car implements Dto<ICar> {
//   _id: string;
//   type: ;
//   factoryDate: string;
//   buyDate: string;
//   meta: {
//     deleted: boolean;
//     metaType: MetaType;
//     createdAt: string;
//   };
// }

// class Car2 implements ICar {
//   id: number;
//   type: number;
// }
