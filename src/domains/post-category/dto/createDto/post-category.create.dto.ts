import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Schema as mongooseSchema } from 'mongoose';
import { PostCategoryCMSDTO } from './subDto/cms/post-category.cms.dto';
import { TranslationsDTO } from './subDto/translations.dto.ts/postCategory.translations.dto';
import { Type } from 'class-transformer';
export class CreatePostCategoryDTO {
  @IsNotEmpty()
  @IsString()
  public text: string;

  @IsNotEmpty()
  @IsMongoId()
  public parent: mongooseSchema.Types.ObjectId;

  @IsOptional()
  @ValidateNested()
  @Type(() => PostCategoryCMSDTO)
  public cms: PostCategoryCMSDTO;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TranslationsDTO)
  public translations: TranslationsDTO;
}
