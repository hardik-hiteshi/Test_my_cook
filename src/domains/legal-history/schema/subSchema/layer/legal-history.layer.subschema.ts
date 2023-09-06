import { Prop, Schema } from '@nestjs/mongoose';
import { LHLayerNested } from './legal-history-nested-layer.subschema';

@Schema({ _id: false })
export class LHLayer {
  @Prop({ default: false, readonly: true })
  public enabled: boolean;
  @Prop({ default: false, readonly: true })
  public preChecked: boolean;
  @Prop({ default: false, readonly: true })
  public forceValidation: boolean;
  @Prop({ readOnly: true })
  public introductionTitle: string;
  @Prop({ readOnly: true })
  public introductionText: string;
  @Prop({ readOnly: true })
  public validationText: string;
  @Prop({ readOnly: true })
  public validationNewsletter: string;
  @Prop([LHLayerNested])
  public layer: LHLayerNested[];
}
