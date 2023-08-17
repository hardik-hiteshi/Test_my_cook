import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import TipRegions from './subSchema/enums/tipregion.enum';

export type TipDocument = HydratedDocument<Tip>;
@Schema({
  shardKey: {
    region: 1,
  },
})
export class Tip {
  @Prop({ type: String, required: true })
  text: String;

  @Prop({
    type: String,
    required: true,
    enum: TipRegions,
    title: 'Region',
  })
  region: String;
}

export const TipSchema = SchemaFactory.createForClass(Tip);
