import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MachineHistory, MachineInfo, MachineSerial } from './subSchema';
import machinestatus from './subSchema/enums/machinestatus.enum';

export type MachineDocument = HydratedDocument<Machine>;

@Schema()
export class Machine {
  @Prop()
  unique_id: string;

  @Prop(MachineInfo)
  info: MachineInfo;

  @Prop([MachineHistory])
  history: MachineHistory[];

  @Prop()
  mac: string;

  @Prop()
  manufactureDate: Date;

  @Prop()
  model: string;

  @Prop()
  purchaseDate: Date;

  @Prop()
  region: string;

  @Prop()
  secret: string;

  @Prop()
  lastLogin: Date;

  @Prop()
  lastIP: string;

  @Prop()
  lastUser: string;

  @Prop()
  lastUserAgent: string;

  @Prop({ type: Object })
  lastGeo: {};

  @Prop()
  lastLoginFail: Date;

  @Prop()
  lastIPFail: string;

  @Prop()
  lastUserAgentFail: string;

  @Prop({ type: Object })
  lastGeoFail: {};

  @Prop(MachineSerial)
  serial: MachineSerial;

  @Prop({
    type: String,
    default: 'enabled',
    enum: machinestatus,
  })
  status: string;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
