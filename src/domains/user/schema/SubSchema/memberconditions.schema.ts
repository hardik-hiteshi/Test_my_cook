import { Schema, Prop } from '@nestjs/mongoose';
import { ConditionHistory } from './conditionHistory.schema';
@Schema({ _id: false })
export class MemberConditions {
  @Prop()
  dateAgreement: Date;
  @Prop()
  agree: Boolean;
  @Prop([ConditionHistory])
  history: ConditionHistory[];
}
