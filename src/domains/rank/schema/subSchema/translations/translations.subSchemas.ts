import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { RankTranslationsFrom } from './from.subSchema';
import { RankTranslationsTo } from './to.subSchema';

export type RankTranslationsDocument = HydratedDocument<RankTranslations>;

@Schema({ _id: false })
export class RankTranslations {
  @Prop(RankTranslationsFrom)
  from: RankTranslationsFrom;

  @Prop([RankTranslationsTo])
  to: RankTranslationsTo[];

  @Prop()
  preserve: boolean;
}

export const RankTranslationsSchema =
  SchemaFactory.createForClass(RankTranslations);
