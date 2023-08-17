import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Info, Categories, Group } from './subSchema/index';
import AlternativeRecipeCourses from './subSchema/enums/AlternativeRecipeCourses.enum';

export type AlternativeRecipeDocument = HydratedDocument<AlternativeRecipe>;
@Schema({
  shardKey: {
    region: 1,
  },
})
export class AlternativeRecipe {
  @Prop()
  title: String;
  @Prop()
  niceName: String;
  @Prop()
  category: String;
  @Prop()
  categoryNiceName: String;
  @Prop([Categories])
  categories: Categories[];
  @Prop([{ type: String, enum: AlternativeRecipeCourses }])
  course: String[];
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
  size: {};
  @Prop([String])
  images: String[];
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Group' })
  groups: Group[];
  @Prop({ type: Object })
  nutritional: {};
  @Prop([{ type: Object }])
  rations: [{}];
  @Prop()
  region: String;
}

export const AlternativeRecipeSchema =
  SchemaFactory.createForClass(AlternativeRecipe);
