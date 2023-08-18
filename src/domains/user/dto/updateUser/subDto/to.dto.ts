import { IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
export class ToDto {
  @IsOptional()
  @IsString()
  public region?: string;

  @IsOptional()
  @IsString()
  public niceName?: string;

  @IsOptional()
  @IsMongoId()
  public _id?: mongoose.Types.ObjectId;
}
