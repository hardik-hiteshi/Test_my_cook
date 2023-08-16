import { IsNotEmpty, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';

export class MongoIdDto {
  @IsNotEmpty()
  @IsMongoId()
  id: mongoose.Types.ObjectId;
}
