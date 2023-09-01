import { IsMongoId, IsNotEmpty, IsObject } from 'class-validator';
import { Schema } from 'mongoose';

export class CreateNotesDTO {
  @IsNotEmpty()
  @IsMongoId()
  public user: Schema.Types.ObjectId;
  @IsNotEmpty()
  @IsMongoId()
  public recipe: Schema.Types.ObjectId;
  @IsNotEmpty()
  @IsObject()
  public steps: Schema.Types.Mixed;
}
