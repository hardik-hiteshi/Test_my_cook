import { IsMongoId, IsOptional, IsString } from 'class-validator';
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
  @IsString()
  public image: string;
}
