import {
  CategoriesDTO,
  GrantsDTO,
  InfoDTO,
  RecipeUserDTO,
  SeoDTO,
  SocialDTO,
  SourceDTO,
} from './subDto';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';
import { Type } from 'class-transformer';

export class CreateRecipeDto {
  @IsOptional()
  @IsString()
  public title: string;

  @IsNotEmpty()
  @IsString()
  public niceName: string;

  @IsOptional()
  @IsString()
  public category?: string;

  @IsOptional()
  @IsString()
  public categoryNiceName?: string;

  @IsOptional()
  @IsNumber()
  public rate?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoriesDTO)
  public categories?: CategoriesDTO;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public course?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => RecipeUserDTO)
  public user?: RecipeUserDTO;

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
  public compatibility?: object;

  @IsOptional()
  @IsObject()
  public size?: object;

  @IsOptional()
  @IsObject()
  public status?: object;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public images?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public videos?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  public groups?: mongooseSchema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public tags?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialDTO)
  public social?: SocialDTO;

  @IsOptional()
  @IsObject()
  public nutritional?: object;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public foodGroups?: string[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  public rations?: [object];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  public comments?: mongooseSchema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  public ratings?: mongooseSchema.Types.ObjectId[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SourceDTO)
  public source?: SourceDTO;

  @IsOptional()
  @IsString()
  public advice?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => GrantsDTO)
  public grants?: GrantsDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => SeoDTO)
  public seo?: SeoDTO;

  @IsOptional()
  @IsBoolean()
  public imageRights?: boolean;

  @IsOptional()
  @IsString()
  public region?: string;

  @IsOptional()
  @IsBoolean()
  public nutritionalForRation?: boolean;

  @IsOptional()
  @IsBoolean()
  public isActive?: boolean;
}
