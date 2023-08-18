import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ExtraDTO } from './extra.dto';
import { LinkinDTO } from './linkin.dto';
import { SuggestionsDTO } from './suggestions.dto';
import { Type } from 'class-transformer';
export class SeoDTO {
  @IsOptional()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsString()
  public canonical: string;

  @IsOptional()
  @IsString()
  public url: string;

  @IsOptional()
  @IsBoolean()
  public index: boolean;

  @IsOptional()
  @IsBoolean()
  public follow: boolean;
  @IsOptional()
  @ValidateNested()
  @Type(() => LinkinDTO)
  public linkin: LinkinDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SuggestionsDTO)
  public suggestions: SuggestionsDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ExtraDTO)
  public extra: ExtraDTO;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public keywords: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public autopublishDate: string[];
}
