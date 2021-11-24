import mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { CreateAnimalDto } from '../dto/create-animal.dto';
import { AnimalType } from '../entities/animal-type.enum';
import { Animal } from './animal.schema';

describe('AnimalSchema', () => {
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [AnimalsService],
  //   }).compile();

  //   service = module.get<AnimalsService>(AnimalsService);
  // });

  it('create new instance from DTO', () => {
    const myOwner: User = {
      _id: new mongoose.Types.ObjectId(),
      name: 'Jon',
    };
    const createAnimalDto: CreateAnimalDto = {
      name: 'Garfield',
      hasWings: false,
      type: AnimalType.CAT,
      age: 43,
      bornAt: new Date('1978-06-19'),
      owner: myOwner,
    };

    // create instance to be tested
    const newAnimal = new Animal(createAnimalDto);

    // test types of instance properties
    expect(typeof newAnimal.name).toBe('string'); // shall be primitive string
    expect(typeof newAnimal.owner).toBe('object'); // shall be unpopulated
    console.log('_id', {
      type: typeof newAnimal._id,
      constructorName: newAnimal._id.constructor.name,
      instanceOfObjectId: newAnimal._id instanceof mongoose.Types.ObjectId,
    });
    console.log('owner', {
      type: typeof newAnimal.owner,
      constructorName: newAnimal.owner.constructor.name,
      instanceOfObjectId: newAnimal.owner instanceof mongoose.Types.ObjectId,
    });
  });
});
