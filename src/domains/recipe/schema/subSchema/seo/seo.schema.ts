import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Extra } from './extra.subschema';
import { Linkin } from './linkin.subschema';
import { Suggestions } from './suggestions.subschema';
@Schema({ _id: false })
export class Seo {
  @Prop()
  public title: string;

  @Prop()
  public description: string;

  @Prop()
  public canonical: string;

  @Prop()
  public autopublishDate: Date;

  @Prop({ default: false })
  public index: boolean;

  @Prop({ default: true })
  public follow: boolean;
  @Prop()
  public url: string;

  @Prop([Linkin])
  public linkin: Linkin[];

  @Prop([Suggestions])
  public suggestions: Suggestions[];

  @Prop(Extra)
  public extra: Extra;

  @Prop([String])
  public keywords: string[];
}
export const seoSchema = SchemaFactory.createForClass(Seo);
