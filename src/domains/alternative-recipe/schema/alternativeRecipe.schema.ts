import { Categories, Group, Info } from './subSchema/index';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import AlternativeRecipeCourses from './subSchema/enums/AlternativeRecipeCourses.enum';

export type AlternativeRecipeDocument = HydratedDocument<AlternativeRecipe>;
@Schema({
  shardKey: {
    region: 1,
  },
})
export class AlternativeRecipe {
  @Prop()
  public title: string;
  @Prop()
  public niceName: string;
  @Prop()
  public category: string;
  @Prop()
  public categoryNiceName: string;
  @Prop([Categories])
  public categories: Categories[];
  @Prop([{ type: String, enum: AlternativeRecipeCourses }])
  public course: string[];
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
  public size: object;
  @Prop([String])
  public images: string[];
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Group' })
  public groups: Group[];
  @Prop({ type: Object })
  public nutritional: object;
  @Prop([{ type: Object }])
  public rations: [object];
  @Prop()
  public region: string;
}

export const alternativeRecipeSchema =
  SchemaFactory.createForClass(AlternativeRecipe);
