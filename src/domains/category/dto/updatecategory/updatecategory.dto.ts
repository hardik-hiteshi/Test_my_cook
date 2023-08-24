import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
// import { TranslationsDTO } from './subdto/translations.dto';
// import { Type } from 'class-transformer';
export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  public name: string;

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
  //this part is currently skipped.
  // @IsOptional()
  // @ValidateNested()
  // @Type(() => TranslationsDTO)
  // public translations: TranslationsDTO;
}
