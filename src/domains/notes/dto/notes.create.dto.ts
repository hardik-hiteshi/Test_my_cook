import { IsMongoId, IsNotEmpty, IsObject } from 'class-validator';
import { Types } from 'mongoose';

export class CreateNotesDTO {
  @IsNotEmpty()
  @IsMongoId()
  public user: Types.ObjectId;
  @IsNotEmpty()
  @IsMongoId()
  public recipe: Types.ObjectId;
  @IsNotEmpty()
  @IsObject()
  public id: string;
}
