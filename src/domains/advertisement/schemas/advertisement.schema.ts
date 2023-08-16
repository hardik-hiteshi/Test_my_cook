import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema as mongooseSchema } from 'mongoose';
import AdvertisementRegions from './subSchema/enums/advertisementregion.enum';
import { HydratedDocument } from 'mongoose';

export type FeaturedDocument = HydratedDocument<Advertisement>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Advertisement {
  @Prop()
  niceName: String;

  @Prop()
  date: Date;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Category',
    denormalize: 'niceName',
  })
  category: mongooseSchema.Types.ObjectId;

  @Prop()
  url: String;

  @Prop()
  urlTitle: String;

  @Prop({ type: Number, class: 'col-md-6', readonly: true })
  views: Number;

  @Prop({ type: Number, class: 'col-md-6', readonly: true })
  clicks: Number;

  @Prop({ required: true, enum: AdvertisementRegions })
  region: String;

  @Prop({ type: String, format: 'mycook-image' })
  image: String;
}
export const AdvertisementSchema = SchemaFactory.createForClass(Advertisement);
