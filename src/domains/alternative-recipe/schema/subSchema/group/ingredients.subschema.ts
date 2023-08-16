import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Ingredient {
  @Prop()
  name: String;
  @Prop()
  qty: String;
  @Prop()
  prep: String;
  @Prop()
  unit: String;
  @Prop()
  extra: String;
}
