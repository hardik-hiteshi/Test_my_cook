import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import featureduser from './subSchema/enums/featured.enum';
import { HydratedDocument } from 'mongoose';

export type FeaturedDocument = HydratedDocument<Featured>;

// featuredList type is not clear
@Schema({
  shardKey: {
    region: 1,
  },
})
export class Featured {
  @Prop({ required: true })
  public region: string;

  @Prop([{ type: String, default: [] }])
  public featuredList: string[];

  @Prop({ required: true, enum: featureduser })
  public type: string;
  @Prop({ default: true })
  public isActive: boolean;
}
export const featuredSchema = SchemaFactory.createForClass(Featured);
