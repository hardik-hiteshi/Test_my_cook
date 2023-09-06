import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NutritionalDisclaimerTranslations } from './subschema/translations/NutritionalDisclaimerTranslations.subschema';
import { NutritionalLegend } from './subschema/NutritionalLegend.subschema';
import regions from '../../../common/elements/regions';

export type NutritionalDisclaimerDocument =
  HydratedDocument<NutritionalDisclaimer>;

@Schema({ shardKey: { region: 1 } })
export class NutritionalDisclaimer {
  @Prop()
  public niceName: string;

  @Prop()
  public referenceAdvice: string;
  @Prop()
  public legalText: string;
  @Prop()
  public disclaimerColorCode: string;

  @Prop()
  public methodology: string;
  @Prop()
  public calculateForPax: string;
  @Prop()
  public calculateForRecipe: string;
  @Prop()
  public nutritionalLogo: mongooseSchema.Types.Mixed;
  @Prop(NutritionalLegend)
  public nutritionalLegend: NutritionalLegend;

  @Prop({ enum: regions, required: true })
  public region: string;

  @Prop({ type: NutritionalDisclaimerTranslations })
  public translations: NutritionalDisclaimerTranslations;

  @Prop({ default: true })
  public isActive: boolean;
}

export const nutritionalDisclaimerSchema = SchemaFactory.createForClass(
  NutritionalDisclaimer,
);
