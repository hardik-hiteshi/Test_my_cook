import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class DeleteMachineModelDto {
  @ValidateIf((o) => !o.code)
  @IsNotEmpty()
  @IsString()
  public uniqueId: string;

  @ValidateIf((o) => !o.uniqueId)
  @IsNotEmpty()
  @IsString()
  public code: string;
}
