import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import featureduser from './subSchema/enums/featured.enum';

export type FeaturedDocument = HydratedDocument<Featured>;

// featuredList type is not clear
@Schema({
  shardKey: {
    region: 1,
  },
})
export class Featured {
  @Prop({ required: true })
  region: string;

  @Prop([{ type: String, default: [] }])
  featuredList: string[];

  @Prop({ required: true, enum: featureduser })
  type: string;
}
export const FeaturedSchema = SchemaFactory.createForClass(Featured);
