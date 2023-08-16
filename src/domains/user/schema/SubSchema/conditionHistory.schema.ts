import { Schema, Prop } from '@nestjs/mongoose';
@Schema({ _id: false })
export class ConditionHistory {
  @Prop()
  dateAgreement: Date;
  @Prop()
  version: String;
}
