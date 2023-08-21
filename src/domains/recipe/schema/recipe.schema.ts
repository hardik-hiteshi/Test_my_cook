import {
  Categories,
  Comments,
  Group,
  Info,
  Ratings,
  Social,
  Source,
} from './subSchema/index';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Grants } from './subSchema/grants.schema';
import { HydratedDocument } from 'mongoose';
import recipecourses from './subSchema/enums/recipecourse.enum';
import { RecipeUser } from './subSchema/recipeuser.schema';
import { Seo } from './subSchema/seo/seo.schema';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Recipe {
  @Prop()
  public title: string;

  @Prop()
  public niceName: string;

  @Prop()
  public category: string;

  @Prop()
  public categoryNiceName: string;

  @Prop()
  public rate: number;

  @Prop(Categories)
  public categories: Categories[];

  @Prop([{ type: String, enum: recipecourses }])
  public course: string[];

  @Prop(RecipeUser)
  public user: RecipeUser;

  @Prop(Info)
  public info: Info;

  @Prop()
  public totalTime: number;

  @Prop()
  public cookTime: number;

  @Prop()
  public difficulty: number;

  @Prop()
  public price: number;

  @Prop({ type: Object })
  public compatibility: object;

  @Prop({ type: Object })
  public size: object;

  @Prop({ type: Object })
  public status: object;

  @Prop()
  public images: string[];

  @Prop()
  public videos: string[];

  @Prop()
  public groups: Group[];

  @Prop([String])
  public tags: string[];

  @Prop(Social)
  public social: Social;

  @Prop({ type: Object })
  public nutritional: object;

  @Prop()
  public foodGroups: string[];

  @Prop([{ type: Object }])
  public rations: object[];

  @Prop(Comments)
  public comments: Comments[];

  @Prop(Ratings)
  public ratings: Ratings[];

  @Prop(Source)
  public source: Source;

  @Prop({ type: String })
  public advice: string;

  @Prop(Grants)
  public grants: Grants;
  @Prop(Seo)
  public seo: Seo;

  @Prop()
  public imageRights: boolean;

  @Prop()
  public region: string;

  @Prop()
  public nutritionalForRation: boolean;

  @Prop({ default: true })
  public isActive: boolean;
}
export const recipeSchema = SchemaFactory.createForClass(Recipe);
