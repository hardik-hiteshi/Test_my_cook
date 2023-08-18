import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RankTranslationsToDocument = HydratedDocument<RankTranslationsTo>;

@Schema({ _id: false })
export class RankTranslationsTo {
  @Prop()
  public region: string;

  @Prop()
  public niceName: string;

  @Prop()
  public lastUpdate: Date;
}

export const rankTranslationsToSchema =
  SchemaFactory.createForClass(RankTranslationsTo);
//   {
//           region: { type: String },
//           niceName: { type: String },
//           lastUpdate: { type: Date },
//         },
