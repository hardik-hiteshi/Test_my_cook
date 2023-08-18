import { Prop, Schema } from '@nestjs/mongoose';
@Schema({ _id: false })
export class ConditionHistory {
  @Prop()
  public dateAgreement: Date;
  @Prop()
  public version: string;
}
