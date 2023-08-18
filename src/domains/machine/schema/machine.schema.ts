import { MachineHistory, MachineInfo, MachineSerial } from './subSchema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import machinestatus from './subSchema/enums/machinestatus.enum';

export type MachineDocument = HydratedDocument<Machine>;

@Schema()
export class Machine {
  @Prop({ unique: true, required: true })
  public uniqueId: string;

  @Prop(MachineInfo)
  public info: MachineInfo;

  @Prop([MachineHistory])
  public history: MachineHistory[];

  @Prop()
  public mac: string;

  @Prop()
  public manufactureDate: Date;

  @Prop()
  public model: string;

  @Prop()
  public purchaseDate: Date;

  @Prop({ default: 'machine' })
  public region: string;

  @Prop()
  public secret: string;

  @Prop()
  public lastLogin: Date;

  @Prop()
  public lastIP: string;

  @Prop()
  public lastUser: string;

  @Prop()
  public lastUserAgent: string;

  @Prop({ type: Object })
  public lastGeo: object;

  @Prop()
  public lastLoginFail: Date;

  @Prop()
  public lastIPFail: string;

  @Prop()
  public lastUserAgentFail: string;

  @Prop({ type: Object })
  public lastGeoFail: object;

  @Prop({ type: MachineSerial, required: true })
  public serial: MachineSerial;

  @Prop({
    type: String,
    default: 'enabled',
    enum: machinestatus,
  })
  public status: string;

  @Prop({ default: true })
  public isActive: boolean;
}

export const machineSchema = SchemaFactory.createForClass(Machine);
