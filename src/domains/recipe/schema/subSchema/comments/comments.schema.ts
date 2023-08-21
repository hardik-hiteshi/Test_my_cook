import { Prop, Schema } from '@nestjs/mongoose';
import { CommentsReply } from './commentsreply.subschema';
@Schema()
export class Comments {
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
