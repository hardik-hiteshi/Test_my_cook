import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Linkin {
  @Prop()
  url: String;
  @Prop()
  text: String;
}
