import { Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id:false})
export class Categories {
  @Prop()
  name: string;
  @Prop()
  niceName: string;
}
