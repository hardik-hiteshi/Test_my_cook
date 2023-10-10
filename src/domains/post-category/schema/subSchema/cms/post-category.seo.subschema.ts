import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  shardKey: {
    region: 1,
  },
})
export class PostCategorySEO {
  @Prop()
  public title: string;

  @Prop()
  public description: string;
}
