import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class LHcommunityConditions {
  @Prop({ default: false, readOnly: true })
  public enabled: boolean;
  @Prop({ default: false, readOnly: true })
  public preChecked: boolean;
  @Prop({ default: false, readOnly: true })
  public forceValidation: boolean;
  @Prop({ readOnly: true })
  public introductionTitle: string;
  @Prop({ readOnly: true })
  public introductionText: string;
  @Prop({ readOnly: true })
  public validationText: string;
  @Prop({ readOnly: true })
  public legalText: string;
}
