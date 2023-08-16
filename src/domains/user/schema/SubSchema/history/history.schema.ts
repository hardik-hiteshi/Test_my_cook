import { Schema, Prop } from '@nestjs/mongoose';
import { HistorySubSchema } from './history.subschema';
import LastLogin from '../lastlogin.schema';

@Schema({_id:false})
export class History {
  @Prop()
  registration: Date;
  @Prop()
  unregistration: Date;
  @Prop({ type: LastLogin, default: {} })
  lastLoginCMS: LastLogin;
  @Prop(HistorySubSchema)
  lastLoginWeb: HistorySubSchema;
  @Prop(HistorySubSchema)
  lastLoginApp: HistorySubSchema;
  @Prop(HistorySubSchema)
  lastLoginMachine: HistorySubSchema;
}
