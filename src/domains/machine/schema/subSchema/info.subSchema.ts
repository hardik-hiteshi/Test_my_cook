import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MachineInfoDocument = HydratedDocument<MachineInfo>;

@Schema({ _id: false })
export class MachineInfo {
  @Prop([String])
  guests: string[];

  @Prop({ type: String, ref: 'User' })
  owner: string;

  @Prop()
  registrationDate: Date;

  @Prop()
  region: string;
}
