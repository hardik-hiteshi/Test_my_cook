import { Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Contact {
  @Prop()
  phone: string;
  @Prop({ require: [true, 'Please provide a email'] })
  mail: string;
}
