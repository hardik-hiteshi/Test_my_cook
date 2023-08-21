import { Prop, Schema } from '@nestjs/mongoose';
@Schema()
export class Replies {
  @Prop()
  public date: Date;
  @Prop()
  public modificationDate: Date;
  @Prop()
  public displayName: string;
  @Prop()
  public niceName: string;
  @Prop()
  public rank: string;
  @Prop()
  public text: string;
  @Prop()
  public haveImage: boolean;
}
