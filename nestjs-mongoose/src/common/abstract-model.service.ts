import mongodb from 'mongodb';
import {
  Aggregate,
  AggregatePaginateModel,
  AggregatePaginateOptions,
  AggregatePaginateResult,
  AnyKeys,
  AnyObject,
  FilterQuery,
  HydratedDocument,
  InsertManyOptions,
  Model,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
  PopulateOptions,
  QueryOptions,
  QueryWithHelpers,
  SaveOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  UpdateWriteOpResult,
} from 'mongoose';
import { BaseEntity } from './base-entity.class';
import { Populated } from './types/populated.type';

/**
 * Abstract Model Service.
 * Will return lean documents (POJO) instead of mongoose Documents only.
 *
 * @export
 * @abstract
 * @class AbstractModelService
 * @template T The entity type
 * @template {*} tbd
 */
export abstract class AbstractModelService<
  T extends BaseEntity,
  KPopulatedPaths extends keyof T,
  TPopulated = Populated<T, KPopulatedPaths>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  TQueryHelpers = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  TMethods = {},
  // eslint-disable-next-line @typescript-eslint/ban-types
  TVirtuals = {},
> {
  /**
   * Default population paths of the standard populated collection version `TPopulated` of `T`.
   *
   * @protected
   * @type {(PopulateOptions[] | string[])}
   */
  abstract readonly __defaultPopulationPaths: PopulateOptions[] | string[];

  constructor(
    private readonly model: Model<T, TQueryHelpers, TMethods, TVirtuals>,
  ) {}

  instanceOfPaginateModel(model: any): model is PaginateModel<T> {
    return model.paginate !== undefined;
  }

  instanceOfAggregatePaginateModel(
    model: any,
  ): model is AggregatePaginateModel<T> {
    // TODO maybe change T to R = any to reflect custom aggregation type
    return model.aggregatePaginate !== undefined;
  }

  /**
   * Creates a new document or documents. Shortcut for saving one or more documents to the database. MyModel.create(docs)
   * does new MyModel(doc).save() for every doc in docs.
   * Triggers the save() hook.
   * ! There is no input type validation!
   *
   * @param {(AnyKeys<T> | AnyKeys<T>[])} docs
   * @param {SaveOptions} [options]
   * @returns {Promise<T | T[]>}
   */
  create<DocContents = AnyKeys<T>>(
    docs: DocContents[],
    options?: SaveOptions,
  ): Promise<T[]>;
  create<DocContents = AnyKeys<T>>(doc: DocContents): Promise<T>;
  create(
    docs: AnyKeys<T> | AnyKeys<T>[],
    options?: SaveOptions,
  ): Promise<T | T[]> {
    if (Array.isArray(docs)) {
      return this.model
        .create(docs, options)
        .then((a) => a.map((d) => d.toObject<T>()));
    } else {
      return this.model.create(docs).then((d) => d.toObject<T>());
    }
  }

  /**
   *
   *
   * @template T
   * @param {T} doc
   * @return {Promise<TPopulated>}
   */
  createAndPopulate(doc: T): Promise<TPopulated> {
    return this.model
      .create(doc)
      .then((doc) =>
        doc
          .populate(this.__defaultPopulationPaths)
          .then((d) => d.toObject<TPopulated>()),
      );
  }

  /**
   * Inserts one or more new documents as a single `insertMany` call to the MongoDB server.
   *
   */
  insertMany(
    docs: (AnyKeys<T> | AnyObject)[],
    options?: InsertManyOptions,
  ): Promise<T[]>;
  insertMany(
    docs: AnyKeys<T> | AnyObject,
    options?: InsertManyOptions,
  ): Promise<T[]>;
  insertMany(
    docs: (AnyKeys<T> | AnyObject) | (AnyKeys<T> | AnyObject)[],
    options?: InsertManyOptions,
  ): Promise<T[]> {
    return this.model
      .insertMany(docs, options)
      .then((res) => res.map((doc) => doc.toObject<T>()));
  }

  /**
   * Deletes the first document that matches `conditions` from the collection.
   * Behaves like `remove()`, but deletes at most one document regardless of the
   * `single` option.
   *
   * @param {FilterQuery<T>} filter
   * @param {QueryOptions} [options]
   * @returns {QueryWithHelpers<mongodb.DeleteResult, HydratedDocument<D, TMethods, TVirtuals>, TQueryHelpers, T>}
   */
  deleteOne(
    filter?: FilterQuery<T>,
    options?: QueryOptions,
  ): QueryWithHelpers<
    mongodb.DeleteResult,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.deleteOne(filter, options);
  }

  /**
   * Deletes all of the documents that match `conditions` from the collection.
   * Behaves like `remove()`, but deletes all documents that match `conditions`
   * regardless of the `single` option.
   *
   * @param {FilterQuery<T>} filter
   * @param {QueryOptions} [options]
   * @returns {QueryWithHelpers<mongodb.DeleteResult, HydratedDocument<T, TMethods, TVirtuals>, TQueryHelpers, T>}
   */
  deleteMany(
    filter?: FilterQuery<T>,
    options?: QueryOptions,
  ): QueryWithHelpers<
    mongodb.DeleteResult,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.deleteMany(filter, options);
  }

  /**
   * Creates a `updateOne` query: updates the first document that matches `filter` with `update`.
   *
   * @param {FilterQuery<T>} filter
   * @param {(UpdateQuery<T> | UpdateWithAggregationPipeline)} update
   * @param {(QueryOptions | null)} [options]
   * @returns {QueryWithHelpers<UpdateWriteOpResult, HydratedDocument<T, TMethods, TVirtuals>, TQueryHelpers, T>}
   */
  updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions | null,
  ): QueryWithHelpers<
    UpdateWriteOpResult,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.updateOne(filter, update, options);
  }

  /**
   * Creates a `updateMany` query: updates all documents that match `filter` with `update`.
   *
   * @param {FilterQuery<T>} filter
   * @param {(UpdateQuery<T> | UpdateWithAggregationPipeline)} update
   * @param {(QueryOptions | null)} [options]
   * @returns {QueryWithHelpers<UpdateWriteOpResult, HydratedDocument<T, TMethods, TVirtuals>, TQueryHelpers, T>}
   */
  updateMany(
    filter: FilterQuery<T>,
    update: UpdateQuery<T> | UpdateWithAggregationPipeline,
    options?: QueryOptions | null,
  ): QueryWithHelpers<
    UpdateWriteOpResult,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.updateMany(filter, update, options);
  }

  /**
   * Creates a `find` query: gets a list of documents that match `filter`.
   * Returns a lean document.
   *
   * @param {FilterQuery<T>} filter
   * @param {(any | null)} [projection]
   * @param {(QueryOptions | null)} [options]
   * @returns {QueryWithHelpers<T[], T, TQueryHelpers, T>}
   */
  find(
    filter: FilterQuery<T>,
    projection?: any | null,
    options?: QueryOptions | null,
  ): QueryWithHelpers<
    T[],
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.find(filter, projection, options).lean();
  }

  findAndPopulate(
    filter: FilterQuery<T>,
    projection?: any | null,
    options?: QueryOptions | null,
  ): QueryWithHelpers<
    TPopulated[],
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model
      .find(filter, projection, options)
      .populate(this.__defaultPopulationPaths)
      .lean();
  }

  /**
   * Finds one document.
   * Returns a lean document.
   *
   * @param {FilterQuery<T>} filter - The find conditions
   * @param {(any| null)} [projection]
   * @param {(QueryOptions | null)} [options]
   * @returns {QueryWithHelpers<T | null, HydratedDocument<T, TMethods, TVirtuals>, TQueryHelpers, T>}
   */
  findOne(
    filter: FilterQuery<T>,
    projection?: any | null,
    options?: QueryOptions | null,
  ): QueryWithHelpers<
    T | null,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.findOne(filter, projection, options).lean();
  }

  findOneAndPopulate(
    filter: FilterQuery<T>,
    projection?: any | null,
    options?: QueryOptions | null,
  ): QueryWithHelpers<
    TPopulated | null,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model
      .findOne(filter, projection, options)
      .populate(this.__defaultPopulationPaths)
      .lean();
  }

  /**
   * Creates a `findOneAndUpdate` query: atomically find the first document that matches `filter` and apply `update`.
   * Returns a lean document.
   *
   * @param {FilterQuery<T>} filter - The find conditions
   * @param {UpdateQuery<T>} update
   * @param {(QueryOptions | null)} [options={ new: true }]
   * @returns {QueryWithHelpers<T | null, HydratedDocument<T, TMethods, TVirtuals>, TQueryHelpers, T>}
   */
  findOneAndUpdate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions | null = { new: true },
  ): QueryWithHelpers<
    T | null,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.findOneAndUpdate(filter, update, options).lean();
  }

  findOneAndUpdateAndPopulate(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: QueryOptions | null = { new: true },
  ): QueryWithHelpers<
    TPopulated | null,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model
      .findOneAndUpdate(filter, update, options)
      .populate(this.__defaultPopulationPaths)
      .lean();
  }

  /**
   * Finds a single document by its _id field. `findById(id)` is almost*
   * equivalent to `findOne({ _id: id })`. If you want to query by a document's
   * `_id`, use `findById()` instead of `findOne()`.
   * Returns a lean document.
   *
   * @param {(T['_id'] | string)} id - The internal id of the document to be found
   * @param {(any | null)} [projection]
   * @param {(QueryOptions | null)} [options]
   * @returns {QueryWithHelpers<T | null, HydratedDocument<T, TMethods, TVirtuals>, TQueryHelpers, T>}
   */
  findById(
    id: T['_id'] | string,
    projection?: any | null,
    options?: QueryOptions | null,
  ): QueryWithHelpers<
    T | null,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.findById(id, projection, options).lean();
  }

  findByIdAndPopulate(
    id: T['_id'] | string,
  ): QueryWithHelpers<
    TPopulated | null,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.findById(id).populate(this.__defaultPopulationPaths).lean();
  }

  /**
   * Creates a `findOneAndUpdate` query, filtering by the given `_id`.
   * Returns a lean document.
   *
   * See {@tutorial https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndUpdate}
   *
   * @param {(T['_id'] | string)} id
   * @param {UpdateQuery<T>} update
   * @param {(QueryOptions | null)} [options={ new: true }]
   * @returns {QueryWithHelpers<T | null, HydratedDocument<T, TMethods, TVirtuals>, TQueryHelpers, T>}
   */
  findByIdAndUpdate(
    id: T['_id'] | string,
    update: UpdateQuery<T>,
    options: QueryOptions | null = { new: true },
  ): QueryWithHelpers<
    T | null,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.findByIdAndUpdate(id, update, options).lean();
  }

  findByIdAndUpdateAndPopulate(
    id: T['_id'] | string,
    update: UpdateQuery<T>,
    options: QueryOptions | null = { new: true },
  ): QueryWithHelpers<
    TPopulated | null,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model
      .findByIdAndUpdate(id, update, options)
      .populate(this.__defaultPopulationPaths)
      .lean();
  }

  /**
   * Creates a `findByIdAndDelete` query, filtering by the given `_id`.
   * Returns a lean document.
   *
   * @param {(T['_id'] | string)} id
   * @param {(QueryOptions | null)} [options]
   * @returns {QueryWithHelpers<T | null, HydratedDocument<T, TMethods, TVirtuals>, TQueryHelpers, T>}
   */
  findByIdAndDelete(
    id: T['_id'] | string,
    options?: QueryOptions | null,
  ): QueryWithHelpers<
    T | null,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.findByIdAndDelete(id, options).lean();
  }

  /**
   * Creates a `replaceOne` query: finds the first document that matches `filter` and replaces it with `replacement`.
   * ! Does not return the updated document!
   *
   * @param {FilterQuery<T>} filter - The find conditions
   * @param {T | AnyObject} replacement
   * @param {(QueryOptions | null)} [options]
   * @returns {QueryWithHelpers<any, HydratedDocument<T, TMethods, TVirtuals>, TQueryHelpers, T>}
   */
  replaceOne(
    filter: FilterQuery<T>,
    replacement?: T | AnyObject,
    options?: QueryOptions | null,
  ): QueryWithHelpers<
    any,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.replaceOne(filter, replacement, options);
  }

  /**
   * Finds documents. Sets default collation to 'de'.
   * TODO check if returned docs are lean, if not, convert from mongoose Documents to lean.
   *
   * @param {FilterQuery<T>} query
   * @param {PaginateOptions} options
   * @returns {Promise<PaginateResult<T>>}
   */
  paginate(
    query: FilterQuery<T>,
    options: PaginateOptions,
  ): Promise<PaginateResult<T>> {
    if (this.instanceOfPaginateModel(this.model)) {
      return this.model.paginate(query, options);
    } else {
      throw new Error(`${this.model.modelName} is no PaginateModel`);
    }
  }

  paginateAndPopulate(
    query: FilterQuery<T>,
    options: PaginateOptions,
  ): Promise<PaginateResult<TPopulated>> {
    if (this.instanceOfPaginateModel(this.model)) {
      return this.model.paginate<TPopulated>(query, {
        ...options,
        populate: this.__defaultPopulationPaths,
      });
    } else {
      throw new Error(`${this.model.modelName} is no PaginateModel`);
    }
  }

  /**
   * Performs aggregations on the models collection.
   * TODO check if returned docs are lean, if not, convert from mongoose Documents to lean.
   *
   * @param {any[]} [aggregations] pipeline operator(s) or operator array
   * @returns {Aggregate<R[]>}
   */
  aggregate<R = any>(aggregations?: any[]): Aggregate<R[]> {
    return this.model.aggregate(aggregations);
  }

  /**
   * Finds orders via aggregate and returns them paginated.
   * TODO check if returned docs are lean, if not, convert from mongoose Documents to lean.
   *
   * @param {Aggregate<R[]>} [query]
   * @param {PaginateOptions} [options]
   * @returns {Promise<AggregatePaginateResult<R>>}
   */
  aggregatePaginate<R = any>(
    query?: Aggregate<R[]>,
    options?: AggregatePaginateOptions,
  ): Promise<AggregatePaginateResult<R>> {
    if (this.instanceOfAggregatePaginateModel(this.model)) {
      return this.model.aggregatePaginate<R>(query, options);
    } else {
      throw new Error(`${this.model.modelName} is no PaginateModel`);
    }
  }

  /**
   * Creates a `countDocuments` query: counts the number of documents that match `filter`.
   */
  countDocuments(
    filter: FilterQuery<T>,
  ): QueryWithHelpers<
    number,
    HydratedDocument<T, TMethods, TVirtuals>,
    TQueryHelpers,
    T
  > {
    return this.model.countDocuments(filter);
  }

  /**
   * * ** BACKUP ** *
   *
   * Following functions might not be required as AbstractModelService will only return
   * lean / POJO documents and no model is required anymore.
   */

  // /**
  //  * Model constructor
  //  * Provides the interface to MongoDB collections as well as creates document instances.
  //  * ! There is no input type validation!
  //  *
  //  * @param {AnyKeys<T> & AnyObject} [doc] values with which to create the document
  //  * @returns {T}
  //  */
  // getNewModel(doc?: AnyKeys<T> & AnyObject): T {
  //   return new this.model(doc).toObject<T>();
  // }

  // /**
  //  * Shortcut for creating a new Document from existing raw data, pre-saved in the DB.
  //  * The document returned has no paths marked as modified initially.
  //  *
  //  * @param {any} [doc]
  //  * @returns {HydratedDocument<T, TMethods, TVirtuals>}
  //  */
  // hydrate(doc?: any): HydratedDocument<T, TMethods, TVirtuals> {
  //   return this.model.hydrate(doc);
  // }

  //   /**
  //  * Populates document references.
  //  *
  //  * @param {Array<any> | any} docs Either a single document or array of documents to populate.
  //  * @param {(PopulateOptions | PopulateOptions[] | string)} options A hash of key/val (path, options) used for population.
  //  * @returns {Promise<TPopulated[] | TPopulated>}
  //  */
  //    populate(
  //     docs: Array<any>,
  //     options: PopulateOptions | PopulateOptions[] | string,
  //   ): Promise<TPopulated[]>;
  //   populate(
  //     docs: any,
  //     options: PopulateOptions | PopulateOptions[] | string,
  //   ): Promise<TPopulated>;
  //   populate(
  //     docs: any,
  //     options: PopulateOptions | PopulateOptions[] | string,
  //   ): Promise<any> {
  //     return this.model.populate(docs, options);
  //   }

  //   /**
  //    * Populates the document `doc` with default population paths.
  //    *
  //    * @param {D} doc
  //    * @returns {Promise<U>}
  //    */
  //   populateDefault(doc: D): Promise<U> {
  //     return this.model.populate(doc, this.__defaultPopulationPaths) as any;
  //   }

  //   depopulateDefault(doc: U): D {
  //     for (const path of this.extractDefaultPopulationPaths()) {
  //       doc = doc.depopulate(path);
  //     }
  //     return doc as any;
  //   }

  //   extractDefaultPopulationPaths(): Array<string> {
  //     const defaultPaths = this.__defaultPopulationPaths;
  //     return defaultPaths.map((path: any) => path.path);
  //   }
}
