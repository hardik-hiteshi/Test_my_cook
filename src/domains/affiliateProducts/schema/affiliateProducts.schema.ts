import { Document, HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AffiliateProductDocument = HydratedDocument<AffiliateProduct>;

@Schema({
  timestamps: true,
})
export class AffiliateProduct extends Document {
  @Prop()
  public uniqueId: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Product',
  })
  public affiliateProduct: mongooseSchema.Types.ObjectId;

  @Prop({ default: true })
  public isActive: boolean;
}

export const affiliateProductSchema =
  SchemaFactory.createForClass(AffiliateProduct);
