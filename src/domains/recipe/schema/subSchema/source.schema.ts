import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Source {
  @Prop()
  url: String;
  @Prop()
  name: String;
}
