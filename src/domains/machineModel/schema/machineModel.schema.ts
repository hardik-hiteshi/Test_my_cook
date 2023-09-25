import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import machineClodVersions from './subSchema/enums/machineClodVersion.enum';
export type MachineModelDocument = HydratedDocument<MachineModel>;

@Schema()
export class MachineModel {
  @Prop({ required: true, unique: true })
  public uniqueId: string;

  @Prop({ required: true })
  public code: string;

  @Prop({ required: true })
  public model: string;

  @Prop()
  public country: string;

  @Prop({ required: true })
  public distributor: string;

  @Prop({ required: true })
  public productPlatform: string;

  @Prop({ required: true, enum: machineClodVersions })
  public cloudVersion: string;

  @Prop({ default: true })
  public isActive: boolean;
}

export const machineModelSchema = SchemaFactory.createForClass(MachineModel);
