import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import regions from 'src/common/enum/region.enum';

export type PictosDocument = HydratedDocument<Pictos>;

@Schema({ shardKey: { region: 1 } })
export class Pictos {
  @Prop({ required: true })
  public niceName: string;

  @Prop([String])
  public image: string[];

  @Prop({ enum: regions, required: true })
  public region: string;

  @Prop({ default: false })
  public isDeleted: boolean;
}

export const pictosSchema = SchemaFactory.createForClass(Pictos);
