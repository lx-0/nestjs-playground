import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { LeanDocument } from 'mongoose';
import { Populated } from '../common/types/populated.type';
import { AnimalModelService } from './animal-model.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './schemas/animal.schema';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectModel(Animal.name)
    private animalModel: mongoose.Model<Animal>,
    private readonly animalModelService: AnimalModelService,
  ) {}

  async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const newAnimal = new Animal(createAnimalDto); // does call entity `Animal` constructor // ! required for settings defaults
    const newAnimal2 = new Animal(createAnimalDto); // does call entity `Animal` constructor // ! required for settings defaults
    // const newAnimal2: Animal = {
    //   _id: new mongoose.Types.ObjectId(),
    //   name: 'Manfred',
    //   type: AnimalType.ELEPHANT,
    //   owner: new mongoose.Types.ObjectId('618d1b230098de2024d3d9e9'),
    // };

    // const createAnimal = new this.animalModel(newAnimal); // does not call entity `Animal` constructor
    // await createAnimal.save();
    // Alternative:
    const createdAnimalDoc = await this.animalModel.create(newAnimal); // does not call entity `Animal` constructor
    const createdAnimal = await this.animalModelService.create(newAnimal2); // does not call entity `Animal` constructor

    console.log('### MONGOOSE DOCUMENT ###');
    this.print(createdAnimalDoc); // will accept `createAnimal` as LeanDocument<Animal>, even if it isn't
    this.printFoodPlan(createdAnimalDoc.foodPlan);

    console.log('### LEAN ###');
    this.print(createdAnimal); // will accept `createAnimal` as LeanDocument<Animal>, even if it isn't
    this.printFoodPlan(createdAnimal.foodPlan);

    return createdAnimal;
  }

  async findAll(): Promise<Animal[]> {
    return this.animalModel.find().exec();
  }

  async findOne(id: Animal['_id']) {
    const animalDoc = await this.animalModel.findOne({ _id: id });

    const animalLean = await this.animalModel.findOne({ _id: id }).lean(); // has simple return type `Animal | null`

    const animalPopulated = await this.animalModelService.findOneAndPopulate({
      _id: id,
    }); // animalPopulated is typeof PopulatedDefault<Animal>

    const animalLeanAlternative2 = animalDoc?.toObject(); // has complex return type

    const animalLeanAlternative = animalDoc?.toObject<Animal>(); // has simple return type `Animal | undefined`, but needs generic

    if (animalDoc) {
      console.log('### MONGOOSE DOCUMENT ###');
      this.print(animalDoc);
      this.printFoodPlan(animalDoc.foodPlan);
    }

    if (animalLean) {
      console.log('### LEAN ###');
      this.print(animalLean);
      this.printFoodPlan(animalLean.foodPlan);
    }

    console.log('### REFERENCES ###');
    console.log(animalDoc?.owner); // is unpopulated
    console.log({ populated: animalDoc?.populated('owner') });

    await animalDoc?.populate('owner');
    console.log(animalDoc?.owner); // is populated, still of type `Animal`
    console.log({ populated: animalDoc?.populated('owner') });

    return animalLean;
  }

  findOnePopulated(
    id: Animal['_id'],
  ): Promise<Populated<Animal, 'owner'> | null> {
    return this.animalModel
      .findOne({ _id: id })
      .populate('owner') // TODO: define default population paths
      .lean<LeanDocument<Populated<Animal, 'owner'>>>() // LeanDocument<T> just to ensure it is lean; actually not required
      .exec();
  }

  update(id: Animal['_id'], updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: Animal['_id']) {
    return `This action removes a #${id} animal`;
  }

  print(animal: LeanDocument<Animal>) {
    console.log(`The animal of type ${animal.type} is called: ${animal.name}`);
    console.log('Spreaded `animal`: ', { ...animal });
    console.log('Object.assign `animal`: ', Object.assign({}, animal));
    console.log('raw `animal`: ', animal);
  }

  /**
   * Service function to accept and process nested subdocument of entity `Animal`.
   *
   * @param {Animal['foodPlan']} foodPlan
   * @memberof AnimalsService
   */
  printFoodPlan(foodPlan: Animal['foodPlan']) {
    console.log('Spreaded `foodPlan`: ', { ...foodPlan }); // spreading the nested mongoose document explodes all the magic mongoose functions and properties
    console.log('Object.assign `foodPlan`: ', Object.assign({}, foodPlan));
    console.log('raw `foodPlan`: ', foodPlan);
  }
}
