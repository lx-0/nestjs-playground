import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { User } from './entities/user.entity';
import { UserEvent } from './enums/user-event.enum';

@Injectable()
export class UsersListener {
  constructor() {}

  @OnEvent(UserEvent.DELETED)
  @OnEvent(UserEvent.CREATED)
  async handleDeletedUserEvent(deletedUser: User): Promise<void> {
    Logger.log(`handle 'UserEvent.DELETED'`, this.constructor.name);
  }
}
