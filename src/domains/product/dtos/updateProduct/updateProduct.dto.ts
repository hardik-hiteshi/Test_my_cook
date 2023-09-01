import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  ProductAttributesDto,
  ProductAvailabilityDto,
  ProductCmsDto,
  ProductExtraDto,
  ProductPrivateDto,
} from './subDto';
import mongoose from 'mongoose';
import { Type } from 'class-transformer';

export class UpdateProductDto {
  @IsOptional()
  @MinLength(3)
  @IsString()
  public reference?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  public name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductAvailabilityDto)
  public availability?: ProductAvailabilityDto;

  @IsOptional()
  @MinLength(3)
  @IsString()
  public gtin?: string;

  @IsOptional()
  @IsString()
  @IsIn(['private', 'public', 'test'])
  public visibility?: string;

  @IsOptional()
  @IsBoolean()
  public isBuyable?: boolean;

  @IsOptional()
  @IsBoolean()
  public isNewRelease?: boolean;

  @IsOptional()
  @IsBoolean()
  public feeds?: boolean;

  @IsOptional()
  @IsBoolean()
  public feedsForAll?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => mongoose.Schema.Types.ObjectId)
  public category?: mongoose.Schema.Types.ObjectId[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => mongoose.Schema.Types.ObjectId)
  @ArrayMaxSize(3)
  public relatedProducts?: mongoose.Types.ObjectId;

  @IsOptional()
  @MinLength(3)
  @IsString()
  public description?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  public shortDescription?: string;

  @IsOptional()
  @IsNumber()
  public taxes?: number;

  @IsOptional()
  @IsNumber()
  public stock?: number;

  @IsOptional()
  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  public images?: string[];

  @IsOptional()
  @IsNumber()
  public originalPrice?: number;

  @IsOptional()
  @IsNumber()
  public price?: number;

  @IsOptional()
  @IsNumber()
  public landingPrice?: number;

  @IsOptional()
  @IsNumber()
  public affiliatePrice?: number;

  @IsOptional()
  @IsBoolean()
  public manualMode?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductPrivateDto)
  public private?: ProductPrivateDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductAttributesDto)
  public attributes?: ProductAttributesDto;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ProductAttributesDto)
  public extra?: ProductExtraDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductCmsDto)
  public cms?: ProductCmsDto;

  @IsOptional()
  @IsString()
  @IsIn(['es_ES', 'en_GB'])
  public language?: string;

  @IsOptional()
  @IsString()
  public extraDescription?: string;

  @IsOptional()
  @IsString()
  public warehouse?: string;
}
