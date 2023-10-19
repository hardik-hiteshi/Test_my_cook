import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import logtypes from '../../../common/elements/logtypes';
import regions from 'src/common/enum/region.enum';

export type UserLogDocument = HydratedDocument<UserLog>;

@Schema()
export class UserLog {
  @Prop({ ref: 'User' })
  public user?: string;

  @Prop()
  public agent?: string;

  @Prop({ enum: logtypes })
  public type: string;

  @Prop()
  public legalType?: string;

  @Prop()
  public niceName?: string;

  @Prop()
  public ip?: string;

  @Prop()
  public machine?: string;

  @Prop()
  public date?: Date;

  @Prop()
  public rate?: number;

  @Prop()
  public commentId?: string;

  @Prop({ required: true, enum: regions })
  public region: string;
}
export const userLogSchema = SchemaFactory.createForClass(UserLog);
