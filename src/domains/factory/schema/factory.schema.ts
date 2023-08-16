import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import factorymachinetypes from './subSchema/enums/factorymachinetype.enum';

export type FactoryDocument = HydratedDocument<Factory>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class Factory {
  @Prop({ required: true, enum: factorymachinetypes })
  machineType: string;

  @Prop()
  validBatch: string;

  @Prop()
  validCompatCode: string;

  @Prop()
  validSerialRange: string;

  @Prop()
  validSecretRange: string;

  @Prop()
  validCdRange: string;

  @Prop()
  ip: string;

  @Prop()
  enabled: boolean;

  @Prop({
    required: true,
    default: 'MACHINE',
  })
  region: string;
}

export const FactorySchema = SchemaFactory.createForClass(Factory);
