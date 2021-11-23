## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

Enhanced by example of strongly typed models.

Model service returns lean objects only to ensure no magic mongoose document methods and properties are present (e.g. when copying the returned mongoose Document via `Object.assign()` or spreading it into another object, see [Common issues with mongoose.Document](#common-issues-with-mongoose.Document)).

## Common issues with mongoose.Document

While using mongoose.Document:

```
const animalDoc = await this.animalModel.findOne({ _id: id });
```

The returned object contains magic mongoose methods and properties. When trying to copy the returned object, the magic methods and properties will break the object's structure:

```
console.log('Spreaded `animalDoc`: ', { ...animalDoc });
console.log('Object.assign `animalDoc`: ', Object.assign({}, animalDoc));
console.log('raw `animalDoc`: ', animalDoc);
```

Result:

```
Spreaded `animalDoc`:  {
  '$__': InternalCache {
    activePaths: StateMachine {
      paths: [Object],
      states: [Object],
      stateNames: [Array],
      map: [Function]
    },
    ownerDocument: undefined,
    fullPath: undefined,
    emitter: EventEmitter {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: 0,
      [Symbol(kCapture)]: false
    },
    strictMode: true,
    _id: new ObjectId("619cf8c4904cff3e6d50dc78"),
    op: null,
    saving: undefined,
    validating: null,
    validationError: undefined,
    cachedRequired: {},
    backup: {
      activePaths: [Object],
      validationError: undefined,
      errors: undefined
    },
    inserting: true,
    savedState: {}
  },
  '$isNew': false,
  _doc: {
    foodPlan: { hasBreakfast: false, hasLunch: false, hasDinner: false },
    owner: new ObjectId("618d1b230098de2024d3d9e9"),
    hasWings: false,
    name: 'My first Animal',
    type: 'PARROT',
    _id: new ObjectId("619cf8c4904cff3e6d50dc78"),
    __v: 0
  },
  '$errors': undefined
}
Object.assign `animalDoc`:  {
  '$__': InternalCache {
    activePaths: StateMachine {
      paths: [Object],
      states: [Object],
      stateNames: [Array],
      map: [Function]
    },
    ownerDocument: undefined,
    fullPath: undefined,
    emitter: EventEmitter {
      _events: [Object: null prototype],
      _eventsCount: 2,
      _maxListeners: 0,
      [Symbol(kCapture)]: false
    },
    strictMode: true,
    _id: new ObjectId("619cf8c4904cff3e6d50dc78"),
    op: null,
    saving: undefined,
    validating: null,
    validationError: undefined,
    cachedRequired: {},
    backup: {
      activePaths: [Object],
      validationError: undefined,
      errors: undefined
    },
    inserting: true,
    savedState: {}
  },
  '$isNew': false,
  _doc: {
    foodPlan: { hasBreakfast: false, hasLunch: false, hasDinner: false },
    owner: new ObjectId("618d1b230098de2024d3d9e9"),
    hasWings: false,
    name: 'My first Animal',
    type: 'PARROT',
    _id: new ObjectId("619cf8c4904cff3e6d50dc78"),
    __v: 0
  },
  '$errors': undefined
}
raw `animalDoc`:  {
  foodPlan: { hasBreakfast: false, hasLunch: false, hasDinner: false },
  owner: new ObjectId("618d1b230098de2024d3d9e9"),
  hasWings: false,
  name: 'My first Animal',
  type: 'PARROT',
  _id: new ObjectId("619cf8c4904cff3e6d50dc78"),
  __v: 0
}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
