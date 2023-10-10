import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PostCategoryCMS } from './subSchema/cms/post-category.cms.subschema';
import { PostCategoryTranslations } from './subSchema/translations/translations.subSchema';
import regions from 'src/common/enum/region.enum';
export type PostCategoryDocument = HydratedDocument<PostCategory>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class PostCategory {
  @Prop()
  public uniqueId: string;

  @Prop({ required: true })
  public text: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    required: true,
    ref: 'PostCategory',
  })
  public parent: mongooseSchema.Types.ObjectId;

  @Prop(PostCategoryCMS)
  public cms: PostCategoryCMS;

  @Prop()
  public translations: PostCategoryTranslations;

  @Prop({ default: true, enum: regions })
  public region: string;

  @Prop({ default: true })
  public isActive: boolean;
}

export const postCategorySchema = SchemaFactory.createForClass(PostCategory);
