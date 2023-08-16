import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RankTranslationsToDocument = HydratedDocument<RankTranslationsTo>;

@Schema({ _id: false })
export class RankTranslationsTo {
  @Prop()
  region: string;

  @Prop()
  niceName: string;

  @Prop()
  lastUpdate: Date;
}

export const RankTranslationsToSchema =
  SchemaFactory.createForClass(RankTranslationsTo);
//   {
//           region: { type: String },
//           niceName: { type: String },
//           lastUpdate: { type: Date },
//         },
