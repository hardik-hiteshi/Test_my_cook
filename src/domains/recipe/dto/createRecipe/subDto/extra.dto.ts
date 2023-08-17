import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsObject,
  ValidateNested,
} from 'class-validator';
export class ExtraDTO {
  @IsOptional()
  @IsString()
  title: String;

  @IsOptional()
  @IsString()
  text: String;
}
