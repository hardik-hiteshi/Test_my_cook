import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MachineHistoryDto, MachineInfoDto, MachineSerialDto } from './subDto/';
import { Type } from 'class-transformer';

enum Status {
  enabled = 'enabled',
  disabled = 'disabled',
  lostFound = 'lost+found',
}
export class CreateMachineDto {
  @IsOptional()
  @IsString()
  public uniqueId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => MachineInfoDto)
  public info?: MachineInfoDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MachineHistoryDto)
  public history?: MachineHistoryDto[];

  @IsNotEmpty()
  @IsString()
  public mac: string;

  @IsNotEmpty()
  @IsDateString()
  public manufactureDate: Date;

  @IsNotEmpty()
  @IsString()
  public model: string;

  @IsNotEmpty()
  @IsDateString()
  public purchaseDate: Date;

  @IsNotEmpty()
  @IsString()
  public region: string;

  @IsOptional()
  @IsString()
  public secret?: string;

  @IsOptional()
  @IsDateString()
  public lastLogin?: Date;

  @IsOptional()
  @IsString()
  public lastIP?: string;

  @IsOptional()
  @IsString()
  public lastUser?: string;

  @IsOptional()
  @IsString()
  public lastUserAgent?: string;

  @IsOptional()
  @IsObject()
  public lastGeo?: object;

  @IsOptional()
  @IsDateString()
  public lastLoginFail?: Date;

  @IsOptional()
  @IsString()
  public lastIPFail?: string;

  @IsOptional()
  @IsString()
  public lastUserAgentFail?: string;

  @IsOptional()
  @IsObject()
  public lastGeoFail?: object;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => MachineSerialDto)
  public serial: MachineSerialDto;

  @IsOptional()
  @IsEnum(Status)
  public status?: string;
}
