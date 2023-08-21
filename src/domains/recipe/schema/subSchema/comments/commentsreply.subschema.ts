import { Prop, Schema } from '@nestjs/mongoose';
@Schema()
export class CommentsReply {
  @Prop()
  public date: Date;
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
  @Prop()
  public comments: CommentsReply[];
}
