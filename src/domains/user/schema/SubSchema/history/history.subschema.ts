import { Schema, Prop } from '@nestjs/mongoose';
import { GeoSchema } from '../geo.schema';
@Schema({ _id: false })
export class HistorySubSchema {
  @Prop()
  date: Date;
  @Prop()
  ip: String;
  @Prop(GeoSchema)
  geo: GeoSchema;
  @Prop()
  userAgent: String;
}
