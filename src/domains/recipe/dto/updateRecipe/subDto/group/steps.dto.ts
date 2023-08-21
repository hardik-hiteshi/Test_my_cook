import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IngredientDTO } from './ingredient.dto';
import { Type } from 'class-transformer';
export class StepsDTO {
  @IsOptional()
  @IsString()
  public description?: string;
  @IsOptional()
  @IsString()
  public type?: string;
  @IsOptional()
  @IsNumber()
  public cookTime?: number;
  @IsOptional()
  @IsNumber()
  public stepTime?: number;
  @IsOptional()
  @IsNumber()
  public temperature?: number;
  @IsOptional()
  @IsNumber()
  public outsideTemperature?: number;
  @IsOptional()
  @IsNumber()
  public microwaveWatts?: number;
  @IsOptional()
  @IsString()
  public speed?: string;
  @IsOptional()
  @IsString()
  public function?: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public accessories?: string[];
  @IsOptional()
  @Type(() => IngredientDTO)
  @ValidateNested()
  public ingredients?: IngredientDTO[];
  @IsOptional()
  @IsBoolean()
  public haveImage: boolean;
}
