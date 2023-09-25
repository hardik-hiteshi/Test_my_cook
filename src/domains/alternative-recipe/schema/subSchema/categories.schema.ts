import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as mongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class Categories {
  @Prop()
  public id: mongooseSchema.Types.ObjectId;
  @Prop()
  public name: string;
  @Prop()
  public niceName: string;
}
