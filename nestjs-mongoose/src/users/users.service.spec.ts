import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { USER_MODEL_NAME } from './entities/user.entity';
import { UsersService } from './users.service';

class UserModelMock {
  // static find = jest.fn().mockResolvedValue([testAnimals[0]]);
  // static findOne = jest.fn().mockResolvedValue(testAnimals[0]);
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(USER_MODEL_NAME),
          useClass: UserModelMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
