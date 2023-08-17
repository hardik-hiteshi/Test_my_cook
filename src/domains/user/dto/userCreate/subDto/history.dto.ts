import {
  IsDate,
  ValidateNested,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LastLoginDto } from './lastLogin.dto';
export class HistoryDto {
  @IsOptional()
  @IsDateString()
  registration?: Date;

  @IsDateString()
  unregistration?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => LastLoginDto)
  lastLoginCMS?: LastLoginDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LastLoginDto)
  lastLoginWeb?: LastLoginDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LastLoginDto)
  lastLoginApp?: LastLoginDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LastLoginDto)
  lastLoginMachine?: LastLoginDto;
}

// @Prop({ type: LastLogin, default: {} })
// lastLoginCMS: LastLogin;
// @Prop(HistorySubSchema)
// lastLoginWeb: HistorySubSchema;
// @Prop(HistorySubSchema)
// lastLoginApp: HistorySubSchema;
// @Prop(HistorySubSchema)
// lastLoginMachine: HistorySubSchema;
