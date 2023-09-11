import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContextFieldsDTO } from './subDTO/contextFields.DTO';
import regions from 'src/common/enum/region.enum';
import { Schema } from 'mongoose';
import { Type } from 'class-transformer';

export class CreateRegionDTO {
  @IsString()
  @IsNotEmpty()
  @IsIn(regions)
  public niceName: string;

  @IsString()
  @IsNotEmpty()
  public language: string;

  @IsOptional()
  @IsMongoId()
  public adminUser: Schema.Types.ObjectId;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ContextFieldsDTO)
  public contextFields: ContextFieldsDTO[];

  @IsOptional()
  @IsString()
  public contact2?: string;

  @IsOptional()
  @IsString()
  public description?: string;
}
