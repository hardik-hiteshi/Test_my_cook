/* eslint-disable @typescript-eslint/naming-convention */
import { Prop, Schema } from '@nestjs/mongoose';
import { EnergyScale } from './scales/energyScale.subschema';
import { GramsScale } from './scales/gramsScale..subschema';
import { IUscale } from './scales/IUscale.subschema';
import { RAEscale } from './scales/RAEscale.subschema';
@Schema({ _id: false })
export class NutritionalKeys {
  @Prop(GramsScale)
  public Water: GramsScale;
  @Prop(EnergyScale)
  public Energy: EnergyScale;
  @Prop(GramsScale)
  public Protein: GramsScale;

  @Prop(GramsScale)
  public LipidTot: GramsScale;
  @Prop(GramsScale)
  public Ash: GramsScale;
  @Prop(GramsScale)
  public Carbohydrt: GramsScale;
  @Prop(GramsScale)
  public FiberTD: GramsScale;
  @Prop(GramsScale)
  public SugarTot: GramsScale;
  @Prop(GramsScale)
  public Calcium: GramsScale;
  @Prop(GramsScale)
  public Iron: GramsScale;
  @Prop(GramsScale)
  public Magnesium: GramsScale;
  @Prop(GramsScale)
  public Phosphorus: GramsScale;
  @Prop(GramsScale)
  public Potassium: GramsScale;
  @Prop(GramsScale)
  public Sodium: GramsScale;
  @Prop(GramsScale)
  public Zinc: GramsScale;
  @Prop(GramsScale)
  public Copper: GramsScale;
  @Prop(GramsScale)
  public Manganese: GramsScale;
  @Prop(GramsScale)
  public Selenium: GramsScale;
  @Prop(GramsScale)
  public VitC: GramsScale;
  @Prop(GramsScale)
  public Thiamin: GramsScale;

  @Prop(GramsScale)
  public Riboflavin: GramsScale;
  @Prop(GramsScale)
  public Niacin: GramsScale;
  @Prop(GramsScale)
  public PantoAcid: GramsScale;
  @Prop(GramsScale)
  public VitB6: GramsScale;
  @Prop(GramsScale)
  public FolateTot: GramsScale;
  @Prop(GramsScale)
  public FolicAcid: GramsScale;
  @Prop(GramsScale)
  public FoodFolate: GramsScale;
  @Prop(GramsScale)
  public FolateDFE: GramsScale;
  @Prop(GramsScale)
  public CholineTot: GramsScale;
  @Prop(GramsScale)
  public VitB12: GramsScale;
  @Prop(IUscale)
  public VitAIU: IUscale;
  @Prop(RAEscale)
  public VitARAE: RAEscale;
  @Prop(GramsScale)
  public Retinol: GramsScale;
  @Prop(GramsScale)
  public AlphaCarot: GramsScale;
  @Prop(GramsScale)
  public BetaCarot: GramsScale;
  @Prop(GramsScale)
  public BetaCrypt: GramsScale;
  @Prop(GramsScale)
  public Lycopene: GramsScale;
  @Prop(GramsScale)
  public LutplusZea: GramsScale;
  @Prop(GramsScale)
  public VitE: GramsScale;
  @Prop(GramsScale)
  public VitD: GramsScale;
  @Prop(IUscale)
  public VitDIU: IUscale;
  @Prop(GramsScale)
  public VitK: GramsScale;
  @Prop(GramsScale)
  public FASat: GramsScale;
  @Prop(GramsScale)
  public FAMono: GramsScale;
  @Prop(GramsScale)
  public FAPoly: GramsScale;
  @Prop(GramsScale)
  public Cholestrl: GramsScale;
}
