import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RankTranslationsFromDocument =
  HydratedDocument<RankTranslationsFrom>;

@Schema()
export class RankTranslationsFrom {
  @Prop()
  public region: string;

  @Prop()
  public niceName: string;
}

export const rankTranslationsFromSchema =
  SchemaFactory.createForClass(RankTranslationsFrom);
//   {
//         region: { type: String, readonly: true },
//         niceName: { type: String, readonly: true },
//       },
