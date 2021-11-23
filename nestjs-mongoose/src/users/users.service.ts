import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument, USER_MODEL_NAME } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(USER_MODEL_NAME)
    private readonly userModel: mongoose.Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create({ name: createUserDto.name });
    console.log(newUser);

    return newUser;
  }

  async createAlternative(createUserDto: CreateUserDto) {
    const newUser2 = new this.userModel({ name: createUserDto.name });
    await newUser2.save();
    console.log(newUser2);

    return newUser2;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
