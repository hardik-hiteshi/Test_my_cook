import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { TranslationsDTO } from './subdto/translations.dto';
import { Type } from 'class-transformer';
export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public niceName: string;

  @IsOptional()
  @IsString()
  public image: string;

  @IsOptional()
  @IsBoolean()
  public visibility: boolean;

  @IsNotEmpty()
  @IsString()
  public region: string;

  @IsOptional()
  @IsString()
  public landingText: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public synonyms: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => TranslationsDTO)
  public translations: TranslationsDTO;
}
