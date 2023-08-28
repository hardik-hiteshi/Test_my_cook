import { IsMongoId, IsNumber, IsOptional, IsString } from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';

export class UpdateAdvertisementDTO {
  @IsOptional()
  @IsMongoId()
  public category: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @IsString()
  public url: string;

  @IsOptional()
  @IsString()
  public urlTitle: string;

  @IsOptional()
  @IsNumber()
  public views: number;

  @IsOptional()
  @IsNumber()
  public clicks: number;
  @IsOptional()
  @IsString()
  public image: string;
}
