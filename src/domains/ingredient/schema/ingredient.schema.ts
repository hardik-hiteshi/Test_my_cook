import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NutritionalKeys } from './subSchema/nutritionalkeys/nutritionalkeys.schema';
import regions from 'src/common/enum/region.enum';
import { Translations } from './subSchema/translation.subSchema';

export type IngredientDocument = HydratedDocument<Ingredient>;

@Schema()
export class Ingredient {
  @Prop({ required: true })
  public niceName: string;

  @Prop([String])
  public alias: string[];

  @Prop()
  public ndbNumber: number;

  @Prop()
  public unitWeight: number;

  @Prop()
  public density: number;

  @Prop({ enum: ['volume', 'weight', 'unit'] })
  public preferedUnit: string;

  @Prop({ type: NutritionalKeys, default: {} })
  public nutritional: NutritionalKeys;

  @Prop([{ type: mongoSchema.Types.ObjectId, ref: 'FoodGroup' }])
  public foodGroup: mongoSchema.Types.ObjectId[];

  @Prop(Translations)
  public translations: Translations;

  @Prop()
  public thresholdQuantity: number;

  @Prop()
  public fryQuantity: number;

  @Prop()
  public coatQuantity: number;

  @Prop({ required: true, enum: regions })
  public region: string;

  @Prop({ default: true })
  public isActive: boolean;
}

export const ingredientSchema = SchemaFactory.createForClass(Ingredient);
