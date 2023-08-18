import { IsOptional, IsString } from 'class-validator';
export class MachineSerialDto {
  @IsOptional()
  @IsString()
  @IsOptional()
  public batch?: string;

  @IsString()
  @IsOptional()
  public compatibility?: string;

  @IsString()
  @IsOptional()
  public counter?: string;

  @IsString()
  @IsOptional()
  public control?: string;
}
