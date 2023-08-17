import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsObject,
  ValidateNested,
} from 'class-validator';
export class LinkinDTO {
  @IsOptional()
  @IsString()
  url: String;

  @IsOptional()
  @IsString()
  text: String;
}
