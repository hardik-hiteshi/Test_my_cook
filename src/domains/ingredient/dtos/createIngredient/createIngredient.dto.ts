import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { NutritionalKeysDTO } from './subDto/nutritionalkeys/nutritionalkeys.dto';
import { Schema } from 'mongoose';
import { TranslationDto } from './subDto/translation.dto';
import { Type } from 'class-transformer';

export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  public niceName: string;

  @IsOptional()
  @IsString({ each: true })
  public alias: string[];

  @IsOptional()
  @IsNumber()
  public ndbNumber: number;

  @IsOptional()
  @IsNumber()
  public unitWeight: number;

  @IsOptional()
  @IsNumber()
  public density: number;

  @IsOptional()
  @IsString()
  @IsIn(['volume', 'weight', 'unit'])
  public preferedUnit: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => NutritionalKeysDTO)
  public nutritional: NutritionalKeysDTO;

  @IsOptional()
  @IsMongoId({ each: true })
  public foodGroup: Schema.Types.ObjectId[];

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationDto)
  public translations: TranslationDto;

  @IsOptional()
  @IsNumber()
  public thresholdQuantity: number;

  @IsOptional()
  @IsNumber()
  public fryQuantity: number;

  @IsOptional()
  @IsNumber()
  public coatQuantity: number;
}
