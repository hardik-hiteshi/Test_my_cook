import { Schema, Prop } from '@nestjs/mongoose';
import { Schema as mongooseSchema } from 'mongoose';
@Schema({ _id: false })
export default class To {
  @Prop()
  region: String;
  @Prop()
  niceName: String;
  @Prop({ type: mongooseSchema.Types.ObjectId })
  _id: mongooseSchema.Types.ObjectId;
}
