import { Schema, Prop } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Status {
  @Prop()
  promo: Boolean;
  @Prop()
  advertisement: Boolean;
  @Prop()
  taurusInfo: Boolean;
  @Prop()
  commercials: Boolean;
  @Prop()
  newsletter: Boolean;
  @Prop()
  publicProfile: Boolean;
  @Prop()
  feedback: Boolean;
  @Prop()
  privacy: Boolean;
}
