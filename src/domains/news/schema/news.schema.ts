import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NewsMedia } from './subSchema/newsMedia.subSchema';
import regions from 'src/common/enum/region.enum';

export type NewsDocument = HydratedDocument<News>;
@Schema({
  shardKey: { region: 1 },
})
export class News {
  @Prop({ required: true, default: new Date().getTime() })
  public niceName: string;
  @Prop({ default: new Date().toISOString() })
  public date: Date;

  @Prop({ required: true, enum: regions })
  public region: string;

  @Prop()
  public scheduleStart: Date;

  @Prop()
  public scheduleEnd: Date;

  @Prop({ maxlength: 50 })
  public textSkill1: string;

  @Prop({ maxlength: 50 })
  public textSkill2: string;

  @Prop({ maxlength: 50 })
  public text1: string;

  @Prop({ maxlength: 500 })
  public text2: string;

  @Prop({ maxlength: 150 })
  public text3: string;

  @Prop()
  public video: string;

  @Prop([String])
  public image: string[];

  @Prop({ default: true })
  public enabled: boolean;

  @Prop(NewsMedia)
  public media: NewsMedia;

  @Prop({ enum: ['none', 'url', 'video', 'recipes'] })
  public type: string;

  @Prop({ type: [mongoSchema.Types.ObjectId], ref: 'Recipe' })
  public recipes: mongoSchema.Types.ObjectId[];
}

export const newsSchema = SchemaFactory.createForClass(News);
