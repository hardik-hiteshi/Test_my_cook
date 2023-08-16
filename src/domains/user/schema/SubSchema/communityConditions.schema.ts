import { Schema, Prop } from '@nestjs/mongoose';
import { ConditionHistory } from './conditionHistory.schema';

@Schema({ _id: false })
export class CommunityConditions {
  @Prop()
  dateAgreement: Date;
  @Prop()
  version: String;
  @Prop(ConditionHistory)
  history: ConditionHistory[];
}
