import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Suggestions {
  @Prop()
  public _id: Types.ObjectId;
  @Prop()
  public title: string;
  @Prop()
  public niceName: string;
}
