import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class LHinternationalConditions {
  @Prop({ default: false, readOnly: true })
  public enabled: boolean;
  @Prop({ default: false, readOnly: true })
  public preChecked: boolean;
  @Prop({ default: false, readOnly: true })
  public forceValidation: boolean;
  @Prop({ default: false, readOnly: true })
  public companiesOneByOne: boolean;
  @Prop({ default: false, readOnly: true })
  public shortText: string;
  @Prop({ default: false, readOnly: true })
  public introductionTitle: string;
  @Prop({ default: false, readOnly: true })
  public introductionText: string;
  @Prop({ default: false, readOnly: true })
  public legalText: string;
  @Prop({ default: false, readOnly: true })
  public validationText: string;
  @Prop({ type: [String], readOnly: true })
  public companyNames: string[];
}
