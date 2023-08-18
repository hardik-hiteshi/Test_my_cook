import { IsDateString, IsOptional, ValidateNested } from 'class-validator';
import { LastLoginDto } from './lastLogin.dto';
import { Type } from 'class-transformer';
export class HistoryDto {
  @IsOptional()
  @IsDateString()
  public registration?: Date;

  @IsDateString()
  public unregistration?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => LastLoginDto)
  public lastLoginCMS?: LastLoginDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LastLoginDto)
  public lastLoginWeb?: LastLoginDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LastLoginDto)
  public lastLoginApp?: LastLoginDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => LastLoginDto)
  public lastLoginMachine?: LastLoginDto;
}

// @Prop({ type: LastLogin, default: {} })
// lastLoginCMS: LastLogin;
// @Prop(HistorySubSchema)
// lastLoginWeb: HistorySubSchema;
// @Prop(HistorySubSchema)
// lastLoginApp: HistorySubSchema;
// @Prop(HistorySubSchema)
// lastLoginMachine: HistorySubSchema;
