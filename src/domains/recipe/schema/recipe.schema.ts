import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongooseSchema } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import recipecourses from './subSchema/enums/recipecourse.enum';
import {
  Categories,
  RecipeUser,
  Info,
  Social,
  Source,
} from './subSchema/index';
import { Seo } from './subSchema/seo/seo.schema';
import { Grants } from './subSchema/grants.schema';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Recipe {
  @Prop()
  title: String;

  @Prop()
  niceName: String;

  @Prop()
  category: String;

  @Prop()
  categoryNiceName: String;

  @Prop()
  rate: Number;

  @Prop(Categories)
  categories: Categories[];

  @Prop([{ type: String, enum: recipecourses }])
  course: String[];

  @Prop(RecipeUser)
  user: RecipeUser;

  @Prop(Info)
  info: Info;

  @Prop()
  totalTime: Number;

  @Prop()
  cookTime: Number;

  @Prop()
  difficulty: Number;

  @Prop()
  price: Number;

  @Prop({ type: Object })
  compatibility: {};

  @Prop({ type: Object })
  size: {};

  @Prop({ type: Object })
  status: {};

  @Prop()
  images: String[];

  @Prop()
  videos: String[];

  @Prop([{ type: mongooseSchema.Types.ObjectId, ref: 'Group' }])
  groups: mongooseSchema.Types.ObjectId[];

  @Prop([String])
  tags: String[];

  @Prop(Social)
  social: Social;

  @Prop({ type: Object })
  nutritional: {};

  @Prop()
  foodGroups: String[];

  @Prop([{ type: Object }])
  rations: [{}];

  @Prop([{ type: mongooseSchema.Types.ObjectId, ref: 'Comment' }])
  comments: mongooseSchema.Types.ObjectId[];

  @Prop([{ type: mongooseSchema.Types.ObjectId, ref: 'Rating' }])
  ratings: mongooseSchema.Types.ObjectId[];

  @Prop(Source)
  source: Source;

  @Prop({ type: String })
  advice: string;

  @Prop(Grants)
  grants: Grants;
  @Prop(Seo)
  seo: Seo;

  @Prop()
  imageRights: Boolean;

  @Prop()
  region: String;

  @Prop()
  nutritionalForRation: Boolean;
}
export const RecipeSchema = SchemaFactory.createForClass(Recipe);
