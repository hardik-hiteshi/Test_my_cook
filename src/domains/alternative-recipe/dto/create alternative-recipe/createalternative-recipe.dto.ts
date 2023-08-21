import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CategoriesDTO, GroupsDTO, InfoDTO } from './subDto/index';
import { Type } from 'class-transformer';

export class CreateAlternativeRecipeDTO {
  @IsOptional()
  @IsString()
  public title: string;
  @IsNotEmpty()
  @IsString()
  public niceName: string;
  @IsOptional()
  @IsString()
  public category: string;
  @IsOptional()
  @IsString()
  public categoryNiceName: string;
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CategoriesDTO)
  public categories: CategoriesDTO[];
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public course: string[];
  @IsOptional()
  @ValidateNested()
  @Type(() => InfoDTO)
  public info?: InfoDTO;
  @IsOptional()
  @IsNumber()
  public totalTime?: number;
  @IsOptional()
  @IsNumber()
  public cookTime?: number;
  @IsOptional()
  @IsNumber()
  public difficulty?: number;
  @IsOptional()
  @IsNumber()
  public price?: number;
  @IsOptional()
  @IsObject()
  public size?: object;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public images?: string[];
  @IsOptional()
  @ValidateNested()
  @Type(() => GroupsDTO)
  public groups?: GroupsDTO[];
  @IsOptional()
  @IsObject()
  public nutritional?: object;
  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  public ration?: object[];
  @IsOptional()
  @IsString()
  public region?: string;
}
