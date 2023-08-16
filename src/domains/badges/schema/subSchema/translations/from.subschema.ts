import { Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id: false })
export default class From {
  @Prop({ type: String, readonly: true, class: 'col-md-6' })
  region: String;
  @Prop({ type: String, readonly: true, class: 'col-md-6' })
  niceName: String;
}
