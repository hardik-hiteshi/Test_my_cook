import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import TipRegions from './subSchema/enums/tipregion.enum';

export type TipDocument = HydratedDocument<Tip>;
@Schema({
  shardKey: {
    region: 1,
  },
})
export class Tip {
  @Prop({ type: String, required: true })
  public text: string;

  @Prop({
    type: String,
    required: true,
    enum: TipRegions,
    title: 'Region',
  })
  public region: string;
}

export const tipSchema = SchemaFactory.createForClass(Tip);
