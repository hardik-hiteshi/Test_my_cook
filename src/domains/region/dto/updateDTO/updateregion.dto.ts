import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContextFieldsDTO } from './subDTO/contextFields.DTO';
import { Schema } from 'mongoose';
import { Type } from 'class-transformer';

export class UpdateRegionDTO {
  @IsString()
  @IsNotEmpty()
  public language: string;

  @IsOptional()
  public adminUser: Schema.Types.ObjectId;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContextFieldsDTO)
  public contextFields: ContextFieldsDTO[];

  @IsOptional()
  @IsString()
  public contact2?: string;

  @IsOptional()
  @IsString()
  public description?: string;
}
