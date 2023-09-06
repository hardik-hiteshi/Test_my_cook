import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MachineLogDocument = HydratedDocument<MachineLog>;

@Schema()
export class MachineLog {
  @Prop({ unique: true })
  public uniqueId: string;

  @Prop()
  public type: string;

  @Prop()
  public date: Date;

  @Prop()
  public t: number;

  @Prop()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public T: string;

  @Prop()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public S: string;

  @Prop()
  public scale: number;

  @Prop()
  public error: string;

  @Prop()
  public serial: string;

  @Prop()
  public wifiStatus: string;

  @Prop()
  public wifiRssi: string;

  @Prop()
  public wifiSignalStrength: string;
  @Prop()
  public wifiLinkSpeed: string;

  @Prop()
  public wifiBand: number;

  @Prop()
  public wifiType: string;

  @Prop()
  public wifiDbm: string;

  @Prop()
  public wifiProtocol: string;

  @Prop()
  public knobLayoutSelected: string;

  @Prop()
  public themeSelected: string;

  @Prop()
  public tabletBoot: string;
  @Prop()
  public tabletTime: string;
  @Prop()
  public loginIP: string;
  @Prop()
  public loginRegion: string;

  @Prop({ default: 'MACHINE' })
  public region: string;

  @Prop({ default: true })
  public isActive: boolean;
}

export const machineLogSchema = SchemaFactory.createForClass(MachineLog);
