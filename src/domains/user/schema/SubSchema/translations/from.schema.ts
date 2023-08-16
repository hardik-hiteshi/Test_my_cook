import { Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id: false })
export default class From {
  @Prop()
  region: String;
  @Prop()
  niceName: String;
}
