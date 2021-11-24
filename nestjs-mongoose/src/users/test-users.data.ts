import mongoose from 'mongoose';
import { User } from './entities/user.entity';

export const testUsers: User[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Jon',
  },
];
