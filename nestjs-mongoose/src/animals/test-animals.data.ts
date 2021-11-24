import mongoose from 'mongoose';
import { testUsers } from '../users/test-users.data';
import { AnimalType } from './entities/animal-type.enum';
import { Animal } from './schemas/animal.schema';

export const testAnimals: Animal[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Garfield',
    hasWings: false,
    type: AnimalType.CAT,
    age: 43,
    bornAt: new Date('1978-06-19'),
    owner: testUsers[0],
  },
];
