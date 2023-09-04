import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class NewsLetterMailChimp {
  @Prop({ required: true })
  public mailchimpID: string;

  @Prop({ required: true })
  public subscribeDate: Date;
}
