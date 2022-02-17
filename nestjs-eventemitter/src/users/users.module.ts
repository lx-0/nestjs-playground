import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersListener } from './users.listener';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersListener],
})
export class UsersModule {}
