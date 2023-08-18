import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RankTranslations } from './subSchema/translations/translations.subSchemas';

export type RankDocument = HydratedDocument<Rank>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Rank {
  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public niceName: string;

  @Prop({ default: '' })
  public image: string;

  @Prop({ required: true })
  public description: string;

  @Prop({ required: true })
  public region: string;

  @Prop(RankTranslations)
  public translations: RankTranslations;
  @Prop()
  public preserve: boolean;
}

export const rankSchema = SchemaFactory.createForClass(Rank);

// {
//     name: { type: String, required: true },
//     niceName: { type: String, required: true },
//     image: { type: String, default: "" },
//     description: { type: String, required: true },
//     region: { type: String, required: true },
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
//   },
