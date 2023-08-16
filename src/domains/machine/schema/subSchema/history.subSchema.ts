import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MachineHistoryDocument = HydratedDocument<MachineHistory>;

@Schema({ _id: false })
export class MachineHistory {
  @Prop([String])
  guests: string[];

  @Prop()
  owner: string;

  @Prop()
  registrationDate: Date;

  @Prop()
  region: string;
}
