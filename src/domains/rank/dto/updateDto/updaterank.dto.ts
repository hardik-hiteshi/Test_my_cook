import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RankTranslationsDTO } from './translations/translations.dto';
import { Type } from 'class-transformer';
export class UpdateRankDTO {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public niceName: string;

  @IsOptional()
  @IsString()
  public image: string;

  @IsNotEmpty()
  @IsString()
  public description: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => RankTranslationsDTO)
  public translations: RankTranslationsDTO;
}
