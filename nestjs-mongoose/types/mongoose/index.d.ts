// ! copied manually as npm version required @types/mongoose which conflicts with standard mongoose typings
// ! copied from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/mongoose-paginate-v2/index.d.ts
// ! copied from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/mongoose-aggregate-paginate-v2/index.d.ts

declare module 'mongoose' {
  // source: Type definitions for mongoose-paginate-v2 1.4
  interface CustomLabels {
    totalDocs?: string | undefined;
    docs?: string | undefined;
    limit?: string | undefined;
    page?: string | undefined;
    nextPage?: string | undefined;
    prevPage?: string | undefined;
    hasNextPage?: string | undefined;
    hasPrevPage?: string | undefined;
    totalPages?: string | undefined;
    pagingCounter?: string | undefined;
    meta?: string | undefined;
  }

  // source: Type definitions for mongoose-paginate-v2 1.4
  interface ReadOptions {
    pref: string;
    tags?: any[] | undefined;
  }

  // source: Type definitions for mongoose-paginate-v2 1.4
  interface PaginateOptions {
    select?: object | string | undefined;
    collation?: import('mongodb').CollationOptions | undefined;
    sort?: object | string | undefined;
    populate?:
      | PopulateOptions[]
      | string[]
      | PopulateOptions
      | string
      | PopulateOptions
      | undefined;
    projection?: any;
    lean?: boolean | undefined;
    leanWithId?: boolean | undefined;
    offset?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    customLabels?: CustomLabels | undefined;
    /* If pagination is set to `false`, it will return all docs without adding limit condition. (Default: `true`) */
    pagination?: boolean | undefined;
    useEstimatedCount?: boolean | undefined;
    useCustomCountFn?: (() => Promise<number>) | undefined;
    forceCountFn?: boolean | undefined;
    allowDiskUse?: boolean | undefined;
    read?: ReadOptions | undefined;
    options?: QueryOptions | undefined;
  }

  // source: Type definitions for mongoose-paginate-v2 1.4
  interface PaginateResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    page?: number | undefined;
    totalPages: number;
    offset: number;
    prevPage?: number | null | undefined;
    nextPage?: number | null | undefined;
    pagingCounter: number;
    meta?: any;
    [customLabel: string]: T[] | number | boolean | null | undefined;
  }

  // source: Type definitions for mongoose-paginate-v2 1.4
  interface PaginateModel<T> extends Model<T> {
    paginate<R = T>(
      query?: FilterQuery<T>,
      options?: PaginateOptions,
      callback?: (err: any, result: PaginateResult<R>) => void,
    ): Promise<PaginateResult<R>>;
  }

  // source: Type definitions for mongoose-aggregate-paginate-v2 1.0
  interface AggregatePaginateOptions {
    sort?: object | string | undefined;
    offset?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    customLabels?: CustomLabels | undefined;
    /* If pagination is set to `false`, it will return all docs without adding limit condition. (Default: `true`) */
    pagination?: boolean | undefined;
    allowDiskUse?: boolean | undefined;
    countQuery?: object | undefined;
  }

  // source: Type definitions for mongoose-paginate-v2 1.4
  interface AggregatePaginateResult<T> {
    docs: T[];
    totalDocs: number;
    limit: number;
    page?: number | undefined;
    totalPages: number;
    nextPage?: number | null | undefined;
    prevPage?: number | null | undefined;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    meta?: any;
    [customLabel: string]: T[] | number | boolean | null | undefined;
  }

  // source: Type definitions for mongoose-paginate-v2 1.4
  interface AggregatePaginateModel<T> extends Model<T> {
    aggregatePaginate<R = T>(
      query?: Aggregate<R[]>,
      options?: AggregatePaginateOptions,
      callback?: (err: any, result: AggregatePaginateResult<R>) => void,
    ): Promise<AggregatePaginateResult<R>>;
  }

  // source: Type definitions for mongoose-paginate-v2 1.4
  // tslint:disable-next-line no-unnecessary-generics
  function model<T>(
    name: string,
    schema?: Schema,
    collection?: string,
    skipInit?: boolean,
  ): PaginateModel<T> | AggregatePaginateModel<any>;
}

import mongoose = require('mongoose');
declare function _(schema: mongoose.Schema): void;
export = _;
declare namespace _ {
  // source: Type definitions for mongoose-paginate-v2 1.4
  const paginate: { options: mongoose.PaginateOptions };
  // source: Type definitions for mongoose-paginate-v2 1.4
  const aggregatePaginate: { options: mongoose.AggregatePaginateOptions };
}
