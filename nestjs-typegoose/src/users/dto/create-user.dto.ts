import { IsEmail, IsNotEmpty } from 'class-validator';
import { Unique } from 'src/common/unique.decorator';
import { UsersService } from '../users.service';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @Unique(UsersService.isUniqueEmail)
  email: string;
}
