import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import mongoose from 'mongoose';

export class ParseMongoIdPipe
  implements PipeTransform<string, Promise<mongoose.Types.ObjectId>>
{
  async transform(
    value: string,
    metadata: ArgumentMetadata,
  ): Promise<mongoose.Types.ObjectId> {
    return new mongoose.Types.ObjectId(value);
  }
}
