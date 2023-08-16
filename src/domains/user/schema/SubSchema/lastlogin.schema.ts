import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { GeoSchema } from './geo.schema';

export interface IlastLogin {
  date: Date;
  ip: string;
  geo: GeoSchema;
  userAgent: string;
}
@Schema({ _id: false })
export default class LastLogin {
  @Prop()
  date: Date;
  @Prop()
  ip: string;
  @Prop()
  geo: GeoSchema;
  @Prop()
  userAgent: string;
}
// export const LastLoginSchema = SchemaFactory.createForClass(LastLogin);
