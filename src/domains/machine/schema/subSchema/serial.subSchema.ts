import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MachineSerialDocument = HydratedDocument<MachineSerial>;

@Schema({ _id: false })
export class MachineSerial {
  @Prop({ required: true })
  public batch: string;

  @Prop({ required: true })
  public compatibilityCode: string;

  @Prop({ required: true, unique: true })
  public counter: string;

  @Prop({ required: true })
  public control: string;
}
