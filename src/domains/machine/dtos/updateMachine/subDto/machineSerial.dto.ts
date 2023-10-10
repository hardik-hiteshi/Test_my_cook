import { IsOptional, IsString } from 'class-validator';
export class MachineSerialDto {
  @IsOptional()
  @IsString()
  @IsOptional()
  public batch?: string;

  @IsString()
  @IsOptional()
  public compatibilityCode?: string;

  @IsString()
  @IsOptional()
  public counter?: string;

  @IsString()
  @IsOptional()
  public control?: string;
}
