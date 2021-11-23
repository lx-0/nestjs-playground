import { mongoose, prop } from '@typegoose/typegoose';
import { IsEmail, IsString } from 'class-validator';

export class User {
  _id: mongoose.Types.ObjectId;

  @IsString()
  @prop({ required: true })
  name: string;

  @IsEmail()
  @prop({ required: true, unique: true })
  email: string;

  @IsString()
  @prop({ required: true })
  password: string;
}
