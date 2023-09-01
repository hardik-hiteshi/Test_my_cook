import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import regions from 'src/common/enum/region.enum';
export type ReportAbuseDocument = HydratedDocument<ReportAbuse>;

@Schema({ shardKey: { region: 1 } })
export class ReportAbuse {
  @Prop({ required: true, enum: ['recipe', 'comment', 'rating'] })
  public type: string;

  @Prop()
  public reportingUserNiceName: string;

  @Prop()
  public reportedRecipeNiceName: string;

  @Prop({ required: true })
  public reportedUserNiceName: string;

  @Prop()
  public reportedText: string;

  @Prop()
  public reportAdditionalDescription: string;

  @Prop()
  public reportDate: Date;

  @Prop({ enum: ['Yes', 'No'] })
  public managerDone: string;

  @Prop()
  public managerComment: string;

  @Prop({ type: mongoSchema.Types.ObjectId })
  public elementId: mongoSchema.Types.ObjectId;

  @Prop({
    required: true,
    enum: regions,
  })
  public region: string;
}

export const reportAbuseSchema = SchemaFactory.createForClass(ReportAbuse);
