import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export default class To {
  @Prop({ type: String, readonly: true })
  public region: string;
  @Prop({ type: String, readonly: true })
  public niceName: string;
  @Prop({ type: Date, readonly: true })
  public lastUpdate: Date;
}
