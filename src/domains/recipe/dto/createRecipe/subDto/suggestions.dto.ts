import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsObject,
  ValidateNested,
} from 'class-validator';
export class SuggestionsDTO {
  @IsOptional()
  @IsString()
  title: String;

  @IsOptional()
  @IsString()
  niceName: String;
}
