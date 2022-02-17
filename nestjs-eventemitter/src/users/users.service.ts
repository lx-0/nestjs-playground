import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserEvent } from './enums/user-event.enum';

@Injectable()
export class UsersService {
  constructor(private eventEmitter: EventEmitter2) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUserData: User = {
      ...createUserDto,
      password: 'secret',
    };
    this.eventEmitter.emit(UserEvent.CREATED, newUserData);
    return newUserData;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.eventEmitter.emit(UserEvent.DELETED, {});
    return `This action removes a #${id} user`;
  }
}
