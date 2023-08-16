import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ShopItem {
  @Prop()
  ingredient: String;
  @Prop()
  qty: String;
  @Prop()
  unit: String;
}
