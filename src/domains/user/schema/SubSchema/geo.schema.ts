import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class GeoSchema {
  @Prop()
  lat: Number;
  @Prop()
  lng: Number;
}
