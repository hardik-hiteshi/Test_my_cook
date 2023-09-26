import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PostTagUrl } from './subSchema/url.subSchema';
export type PostTagDocument = HydratedDocument<PostTag>;

@Schema({
  shardKey: {
    region: 1,
  },
})
export class PostTag {
  @Prop()
  public uniqueId: string;

  @Prop({ required: true })
  public text: string;

  @Prop()
  public description: string;

  @Prop(PostTagUrl)
  public cms: PostTagUrl;

  @Prop({ required: true })
  public region: string;

  @Prop({ default: true })
  public isActive: boolean;
}

export const postTagSchema = SchemaFactory.createForClass(PostTag);
