import { Schema, Prop, raw } from '@nestjs/mongoose';
import { ConditionHistory } from './conditionHistory.schema';

@Schema({ _id: false })
export class OtherConditions {
  @Prop()
  dateAgreement: Date;
  @Prop([ConditionHistory])
  history: ConditionHistory[];
}
