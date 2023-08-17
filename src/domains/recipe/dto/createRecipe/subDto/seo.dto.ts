import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { LinkinDTO } from './linkin.dto';
import { SuggestionsDTO } from './suggestions.dto';
import { ExtraDTO } from './extra.dto';
export class SeoDTO {
  @IsOptional()
  @IsString()
  title: String;

  @IsOptional()
  @IsString()
  description: String;

  @IsOptional()
  @IsString()
  canonical: String;

  @IsOptional()
  @IsString()
  url: String;

  @IsOptional()
  @IsBoolean()
  index: Boolean;

  @IsOptional()
  @IsBoolean()
  follow: Boolean;
  @IsOptional()
  @ValidateNested()
  @Type(() => LinkinDTO)
  linkin: LinkinDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SuggestionsDTO)
  suggestions: SuggestionsDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ExtraDTO)
  extra: ExtraDTO;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords: String[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  autopublishDate: String[];
}
