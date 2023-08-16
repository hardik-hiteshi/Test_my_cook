import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import machineClodVersions from './subSchema/enums/machineClodVersion.enum';
export type MachineModelDocument = HydratedDocument<MachineModel>;

@Schema()
export class MachineModel {
  @Prop({ required: true })
  unique_id: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  model: string;

  @Prop()
  country: string;

  @Prop({ required: true })
  distributor: string;

  @Prop({ required: true })
  product_platform: string;

  @Prop({ required: true, enum: machineClodVersions })
  clodVersion: string;
}

export const MachineModelSchema = SchemaFactory.createForClass(MachineModel);

// unique_id: { type: String, required: true },
// code: { type: String, required: true, unique: true },
// model: { type: String, required: true },
// country: String,
// distributor: { type: String, required: true },
// product_platform: { type: String, required: true },
// cloudVersion: {
//   type: String,
//   required: true,
//   enum: ["S1", "S1.1", "S2"],
// },
