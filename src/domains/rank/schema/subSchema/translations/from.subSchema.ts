import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RankTranslationsFromDocument =
  HydratedDocument<RankTranslationsFrom>;

@Schema({ _id: false })
export class RankTranslationsFrom {
  @Prop()
  public region: string;

  @Prop()
  public niceName: string;
}

export const rankTranslationsFromSchema =
  SchemaFactory.createForClass(RankTranslationsFrom);
