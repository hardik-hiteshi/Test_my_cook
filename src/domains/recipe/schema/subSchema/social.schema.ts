import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id: false })
export class Social {
  @Prop()
  favorite: Number;
  @Prop()
  facebook: Number;
  @Prop()
  comments: Number;
  @Prop()
  ratings: Number;
  @Prop()
  todo: Number;
}
