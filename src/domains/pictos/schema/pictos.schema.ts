import { HydratedDocument, Schema as mongoSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import regions from 'src/common/enum/region.enum';

export type PictosDocument = HydratedDocument<Pictos>;

@Schema({ shardKey: { region: 1 } })
export class Pictos {
  @Prop({ required: true })
  public niceName: string;

  @Prop({ type: mongoSchema.Types.Mixed })
  public image: mongoSchema.Types.Mixed;

  @Prop({ enum: regions, required: true })
  public region: string;

  @Prop({ default: false })
  public isDeleted: boolean;
}

export const pictosSchema = SchemaFactory.createForClass(Pictos);
