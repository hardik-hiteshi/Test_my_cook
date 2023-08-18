import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Categories {
  @Prop()
  public name: string;
  @Prop()
  public niceName: string;
}
