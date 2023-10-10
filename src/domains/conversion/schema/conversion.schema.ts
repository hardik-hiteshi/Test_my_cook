import { Document, HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ConversionDocument = HydratedDocument<Conversion>;

@Schema({
  timestamps: true,
})
export class Conversion extends Document {
  @Prop()
  public uniqueId: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Affiliate',
  })
  public affiliate: mongooseSchema.Types.ObjectId;

  @Prop()
  public name: string;

  @Prop()
  public lastName: string;

  @Prop()
  public customerName: string;

  @Prop()
  public customerLastName: string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Order',
  })
  public order: mongooseSchema.Types.ObjectId;

  @Prop({ type: Date })
  public date: Date;

  @Prop()
  public total: number;

  @Prop()
  public income: number;

  @Prop({ default: 8 })
  public conversionTax: number;

  @Prop({ default: false })
  public invoiced: boolean;

  @Prop({ default: false })
  public returned: boolean;

  @Prop()
  public companyName: string;

  @Prop()
  public cif: string;

  @Prop({ default: true })
  public isActive: boolean;
}

export const conversionSchema = SchemaFactory.createForClass(Conversion);
