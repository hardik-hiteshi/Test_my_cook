import { Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Recipe {
  @Prop()
  niceName: String;
  @Prop()
  title: String;
}
