import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RankTranslationsFromDocument =
  HydratedDocument<RankTranslationsFrom>;

@Schema({ _id: false })
export class RankTranslationsFrom {
  @Prop()
  region: string;

  @Prop()
  niceName: string;
}

export const RankTranslationsFromSchema =
  SchemaFactory.createForClass(RankTranslationsFrom);
//   {
//         region: { type: String, readonly: true },
//         niceName: { type: String, readonly: true },
//       },
