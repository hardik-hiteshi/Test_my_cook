import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import logtypes from 'src/common/elements/logtypes';
export class CreateUserLogDTO {
  @IsOptional()
  @IsString()
  public user: string;
  @IsOptional()
  @IsString()
  public agent: string;
  @IsOptional()
  @IsString()
  @IsEnum(logtypes)
  public type: string;
  //  {
  //   type: String,
  //   map: require("./../elements/logtypes.json"),
  //   readonly: true,
  // }
  @IsOptional()
  @IsString()
  public legalType: string;
  @IsOptional()
  @IsString()
  public niceName: string;
  @IsOptional()
  @IsString()
  public ip: string;
  @IsOptional()
  @IsString()
  public machine: string;
  @IsOptional()
  @IsDateString()
  public date: Date;
  @IsOptional()
  @IsNumber()
  public rate: number;
  @IsOptional()
  @IsString()
  public commentId: string;
}
