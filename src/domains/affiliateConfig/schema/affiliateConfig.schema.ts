import { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AffiliateConfigDocument = HydratedDocument<AffiliateConfig>;

@Schema({
  timestamps: true,
})
export class AffiliateConfig extends Document {
  @Prop({ required: true })
  public cookieTime: number;

  @Prop({ required: true, unique: true })
  public cookieName: string;

  @Prop({ default: true })
  public isActive: boolean;
}

export const affiliateConfigSchema =
  SchemaFactory.createForClass(AffiliateConfig);
