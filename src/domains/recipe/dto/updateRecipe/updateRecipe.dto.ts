import {
  IsString,
  ValidateNested,
  IsArray,
  IsOptional,
  IsNumber,
  IsObject,
  IsMongoId,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';
import {
  CategoriesDTO,
  GrantsDTO,
  InfoDTO,
  RecipeUserDTO,
  SeoDTO,
  SocialDTO,
  SourceDTO,
} from './subDto';
import { Type } from 'class-transformer';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  title: String;

  @IsOptional()
  @IsString()
  category?: String;

  @IsOptional()
  @IsString()
  categoryNiceName?: String;

  @IsOptional()
  @IsNumber()
  rate?: Number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CategoriesDTO)
  categories?: CategoriesDTO;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  course?: String;

  @IsOptional()
  @ValidateNested()
  Type: () => RecipeUserDTO;
  user?: RecipeUserDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => InfoDTO)
  info?: InfoDTO;

  @IsOptional()
  @IsNumber()
  totalTime?: Number;

  @IsOptional()
  @IsNumber()
  cookTime?: Number;

  @IsOptional()
  @IsNumber()
  difficulty?: Number;

  @IsOptional()
  @IsNumber()
  price?: Number;

  @IsOptional()
  @IsObject()
  compatibility?: {};

  @IsOptional()
  @IsObject()
  size?: {};

  @IsOptional()
  @IsObject()
  status?: {};
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: String[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  videos?: String[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groups?: mongooseSchema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: String;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialDTO)
  social?: SocialDTO;

  @IsOptional()
  @IsObject()
  nutritional?: {};

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  foodGroups?: String[];

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  rations?: [{}];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  comments?: mongooseSchema.Types.ObjectId[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  ratings?: mongooseSchema.Types.ObjectId[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SourceDTO)
  source?: SourceDTO;

  @IsOptional()
  @IsString()
  advice?: String;

  @IsOptional()
  @ValidateNested()
  @Type(() => GrantsDTO)
  grants?: GrantsDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => SeoDTO)
  seo?: SeoDTO;

  @IsOptional()
  @IsBoolean()
  imageRights?: Boolean;

  @IsOptional()
  @IsString()
  region?: String;

  @IsOptional()
  @IsBoolean()
  nutritionalForRation?: Boolean;
}
