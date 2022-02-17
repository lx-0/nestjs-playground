import { IsEmail, IsString } from 'class-validator';

export class User {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

const x: User = {
  name: 'Bob',
  password: 'secret123',
  email: 'mail@mordor.mittelerde',
};

const y: User = {
  name: 'Bob',
  password: 'secret123',
  email: 'mail@mordor.mittelerde',
};
