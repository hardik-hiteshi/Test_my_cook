import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export default class To {
  @Prop({ type: String, readonly: true, class: 'col-md-4' })
  public region: string;
  @Prop({ type: String, readonly: true, class: 'col-md-4' })
  public niceName: string;
  @Prop({ type: Date, readonly: true, class: 'col-md-4' })
  public lastUpdate: Date;
}
