import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import regions from 'src/common/enum/region.enum';

export type TipDocument = HydratedDocument<Tip>;
@Schema({
  shardKey: {
    region: 1,
  },
})
export class Tip {
  @Prop()
  public uniqueId: string;

  @Prop({ type: String, required: true })
  public text: string;

  @Prop({
    type: String,
    required: true,
    enum: regions,
    title: 'Region',
  })
  public region: string;
}

export const tipSchema = SchemaFactory.createForClass(Tip);
