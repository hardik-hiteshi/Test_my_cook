import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class GeoSchema {
  @Prop()
  public lat: string;
  @Prop()
  public lng: string;
}
