import {
  CategoriesDTO,
  CommentsDTO,
  GrantsDTO,
  GroupsDTO,
  RatingsDTO,
  SeoDTO,
  SocialDTO,
  SourceDTO,
} from './subDto';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import difficultyEnum from '../../schema/subSchema/enums/difficulty.enum';
import recipecourses from '../../schema/subSchema/enums/recipecourse.enum';

import { Schema as mongooseSchema } from 'mongoose';
import { NutritionalKeysDTO } from './subDto/nutritionalkeys/nutritionalkeys.dto';
import { RecipeTranslationsDTO } from './subDto/translations/recipetranslations.dto';
import { StatusDTO } from './subDto/status.dto';
import { Type } from 'class-transformer';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public category: string;
  @IsOptional()
  @IsNumber()
  public rate: number;

  @IsOptional()
  @IsString()
  public categoryNiceName: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => CategoriesDTO)
  public categories: CategoriesDTO[];

  @IsOptional()
  @IsIn(recipecourses, { each: true })
  public course: string[];

  @IsOptional()
  @IsMongoId()
  public user: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @IsNumber()
  public totalTime: number;

  @IsOptional()
  @IsNumber()
  public cookTime: number;

  @IsOptional()
  @IsNumber()
  @IsIn(difficultyEnum)
  public difficulty: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(3)
  public price: number;

  @IsOptional()
  @IsObject()
  public size: object;

  @IsOptional()
  @ValidateNested()
  @Type(() => StatusDTO)
  public status: StatusDTO;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public foodGroups: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public images: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public videos: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => GroupsDTO)
  public groups: GroupsDTO[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  public tags: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialDTO)
  public social: SocialDTO;

  @IsOptional()
  public comments: CommentsDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => RatingsDTO)
  public ratings: RatingsDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => SourceDTO)
  public source: SourceDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => GrantsDTO)
  public grants: GrantsDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => NutritionalKeysDTO)
  public nutritional: NutritionalKeysDTO;

  @IsOptional()
  @IsBoolean()
  public nutritionalForRation: boolean;

  @IsOptional()
  @IsString()
  public advice: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SeoDTO)
  public seo: SeoDTO;

  @IsOptional()
  @IsArray()
  @IsObject({ each: true })
  public rations: object[];

  @IsOptional()
  @IsBoolean()
  public imageRights: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => RecipeTranslationsDTO)
  public translations: RecipeTranslationsDTO;

  @IsOptional()
  @IsString()
  public viewUrl: string;

  @IsOptional()
  @IsString()
  public copyUrl: string;

  @IsOptional()
  @IsObject()
  public compatibility: object;

  @IsOptional()
  @IsBoolean()
  public isActive: boolean;
}
