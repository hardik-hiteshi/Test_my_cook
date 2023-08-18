import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RankTranslationsFrom } from './from.subSchema';
import { RankTranslationsTo } from './to.subSchema';

export type RankTranslationsDocument = HydratedDocument<RankTranslations>;

@Schema()
export class RankTranslations {
  @Prop(RankTranslationsFrom)
  public from: RankTranslationsFrom;

  @Prop([RankTranslationsTo])
  public to: RankTranslationsTo[];

  @Prop()
  public preserve: boolean;
}

export const rankTranslationsSchema =
  SchemaFactory.createForClass(RankTranslations);

//     translations: {
//       from: {
//         region: { type: String, readonly: true },
//         niceName: { type: String, readonly: true },
//       },
//       to: [
//         {
//           region: { type: String },
//           niceName: { type: String },
//           lastUpdate: { type: Date },
//         },
//       ],
//       preserve: { type: Boolean },
//     },
