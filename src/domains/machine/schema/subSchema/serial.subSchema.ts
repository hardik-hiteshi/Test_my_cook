import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MachineSerialDocument = HydratedDocument<MachineSerial>;

@Schema({ _id: false })
export class MachineSerial {
  @Prop()
  batch: string;

  @Prop()
  compatibility: string;

  @Prop()
  counter: string;

  @Prop()
  control: string;
}
