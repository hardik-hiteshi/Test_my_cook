import { Prop, Schema } from '@nestjs/mongoose';
import { ConditionHistory } from './conditionHistory.schema';
@Schema({ _id: false })
export class MemberConditions {
  @Prop()
  public dateAgreement: Date;
  @Prop()
  public agree: boolean;
  @Prop([ConditionHistory])
  public history: ConditionHistory[];
}
