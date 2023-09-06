import {
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Schema } from 'mongoose';
import { TranslationDto } from './subDto/translate.dto';
import { Type } from 'class-transformer';

export class UpdateFoodGroupDto {
  @IsOptional()
  @IsString()
  public name?: string;

  @IsOptional()
  public image?: Schema.Types.Mixed;

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationDto)
  public translations?: TranslationDto;

  @IsOptional()
  @IsBoolean()
  public mustShow?: boolean;
}
