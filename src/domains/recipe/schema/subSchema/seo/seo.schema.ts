import { Schema, Prop } from '@nestjs/mongoose';
import { Linkin } from './linkin.subschema';
import { Suggestions } from './suggestions.subschema';
import { Extra } from './extra.subschema';

@Schema({ _id: false })
export class Seo {
  @Prop()
  title: String;

  @Prop()
  description: String;

  @Prop()
  canonical: String;

  @Prop()
  url: String;

  @Prop()
  index: Boolean;

  @Prop()
  follow: Boolean;

  @Prop([Linkin])
  linkin: [Linkin];

  @Prop([Suggestions])
  suggestions: [Suggestions];

  @Prop(Extra)
  extra: Extra;

  @Prop([String])
  keywords: [String];

  @Prop([String])
  autopublishDate: [String];
}
