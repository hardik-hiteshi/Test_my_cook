import {
  IsArray,
  IsBoolean,
  IsDateString,
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
  @IsDateString()
  public autopublishDate: Date;

  @IsOptional()
  @IsBoolean()
  public index: boolean;

  @IsOptional()
  @IsBoolean()
  public follow: boolean;

  @IsOptional()
  @IsString()
  public url: string;

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
}
