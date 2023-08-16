import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Extra {
  @Prop()
  title: String;
  @Prop()
  text: String;
}
