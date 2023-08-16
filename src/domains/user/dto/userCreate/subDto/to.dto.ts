import { IsString, IsMongoId, IsOptional } from 'class-validator';
import mongoose from 'mongoose';
export class ToDto {
  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @IsString()
  niceName?: string;

  @IsOptional()
  @IsMongoId()
  _id?: mongoose.Types.ObjectId;
}
