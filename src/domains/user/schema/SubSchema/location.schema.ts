import { Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Location {
  @Prop()
  address: string;
  @Prop()
  zip: string;
  @Prop()
  town: string;
  @Prop()
  state: string;
  @Prop()
  country: string;
}
