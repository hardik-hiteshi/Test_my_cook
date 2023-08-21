import { Prop, Schema } from '@nestjs/mongoose';
import { Replies } from './replies.subschema';
import { Votes } from './votes.subschema';
@Schema()
export class Ratings {
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
  public rate: number;
  @Prop()
  public votes: Votes;
  @Prop()
  public haveImage: boolean;
  @Prop(Replies)
  public replies: Replies[];
}
