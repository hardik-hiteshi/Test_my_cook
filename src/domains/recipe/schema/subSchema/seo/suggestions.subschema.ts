import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Suggestions {
  @Prop()
  public title: string;
  @Prop()
  public niceName: string;
}
