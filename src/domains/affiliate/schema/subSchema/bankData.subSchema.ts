import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BankData {
  @Prop({ type: Boolean, default: false })
  public sendData: boolean;
}
