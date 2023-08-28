import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import advertisementRegions from './subSchema/enums/advertisementregion.enum';

export type AdvertisementDocument = HydratedDocument<Advertisement>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Advertisement {
  @Prop()
  public niceName: string;

  @Prop()
  public date: Date;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Category',
    denormalize: 'niceName',
  })
  public category: mongooseSchema.Types.Mixed;

  @Prop()
  public url: string;

  @Prop()
  public urlTitle: string;

  @Prop({ type: Number, class: 'col-md-6', readonly: true })
  public views: number;

  @Prop({ type: Number, class: 'col-md-6', readonly: true })
  public clicks: number;

  @Prop({ required: true, enum: advertisementRegions })
  public region: string;

  @Prop({ type: String, format: 'mycook-image' })
  public image: string;
  @Prop({ default: true })
  public isActive: boolean;
}
export const advertisementSchema = SchemaFactory.createForClass(Advertisement);
