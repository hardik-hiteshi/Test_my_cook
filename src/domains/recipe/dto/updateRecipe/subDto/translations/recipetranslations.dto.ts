import {
  IsArray,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { RecipeFromDTO } from './translationsSubDTo/from.subdto';
import { RecipeToDTO } from './translationsSubDTo/to.subdto';
import { Type } from 'class-transformer';

export class RecipeTranslationsDTO {
  @IsOptional()
  @ValidateNested()
  @Type(() => RecipeFromDTO)
  public from: RecipeFromDTO;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => RecipeToDTO)
  public to: RecipeToDTO[];

  @IsOptional()
  @IsBoolean()
  public preserve: boolean;
}
