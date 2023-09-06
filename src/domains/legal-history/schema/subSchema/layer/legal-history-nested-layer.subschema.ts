import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class LHLayerNested {
  @Prop({ readonly: true })
  public title: string;
  @Prop({ readonly: true })
  public shortText: string;
  @Prop({ readonly: true })
  public legalText: string;
}
