import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as mongooseSchema } from 'mongoose';
@Schema({ _id: false })
export default class To {
  @Prop()
  public region: string;
  @Prop()
  public niceName: string;
  @Prop({ type: mongooseSchema.Types.ObjectId })
  public _id: mongooseSchema.Types.ObjectId;
}
