import { Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id: false })
export default class To {
  @Prop({ type: String, readonly: true, class: 'col-md-4' })
  region: String;
  @Prop({ type: String, readonly: true, class: 'col-md-4' })
  niceName: String;
  @Prop({ type: Date, readonly: true, class: 'col-md-4' })
  lastUpdate: Date;
}
