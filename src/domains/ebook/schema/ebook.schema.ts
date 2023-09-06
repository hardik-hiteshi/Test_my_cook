import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import regions from 'src/common/enum/region.enum';

export type EbookDocument = HydratedDocument<Ebook>;
@Schema({
  shardKey: { region: 1 },
})
export class Ebook {
  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public publishDate: Date;

  @Prop({ required: true })
  public niceName: string;

  @Prop({ required: true })
  public url: string;

  @Prop({ required: true })
  public description: string;

  @Prop({ type: [String] })
  public recipes: string;

  @Prop({ required: true, enum: regions })
  public region: string;

  @Prop()
  public mauticFormId: number;

  @Prop({ type: mongoSchema.Types.Mixed })
  public image: mongoSchema.Types.Mixed;

  @Prop({ type: mongoSchema.Types.Mixed })
  public pdf: mongoSchema.Types.Mixed;

  @Prop({ default: true })
  public isActive: boolean;
}

export const ebookSchema = SchemaFactory.createForClass(Ebook);
