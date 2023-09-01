import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import regions from 'src/common/enum/region.enum';

export type ContactDocument = HydratedDocument<Contact>;
@Schema({
  shardKey: {
    region: 1,
  },
})
export class Contact {
  @Prop({ required: true })
  public title: string;

  @Prop({ required: true })
  public niceName: string;

  @Prop({ type: mongoSchema.Types.Mixed })
  public image: mongoSchema.Types.Mixed;

  @Prop({ required: true })
  public contact1: string;

  @Prop()
  public contact2: string;

  @Prop()
  public description: string;

  @Prop({
    required: true,
    enum: regions,
  })
  public region: string;

  @Prop({ default: true })
  public isActive: boolean;
}

export const contactSchema = SchemaFactory.createForClass(Contact);

// {
//     title: { type: String, required: true },
//     niceName: {
//       type: String,
//       required: true,
//     },
//     image: { type: Schema.Types.Mixed },
//     contact_1: {
//       type: String,
//       required: true,
//     },
//     contact_2: {
//       type: String,
//     },
//     description: {
//       type: String,
//     },
//     region: {
//       type: String,
//       required: true,
//       enum: regions,
//     },
//   },
