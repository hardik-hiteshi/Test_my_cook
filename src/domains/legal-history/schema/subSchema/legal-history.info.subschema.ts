import { Prop, Schema } from '@nestjs/mongoose';
@Schema()
export class LHInfo {
  @Prop({ readOnly: true })
  public modificationDate: Date;
  @Prop({ readOnly: true })
  public modificationSource: string;
}
