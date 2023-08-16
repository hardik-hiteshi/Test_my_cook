import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Suggestions {
  @Prop()
  title: String;
  @Prop()
  niceName: String;
}
