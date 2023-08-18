import { IsNotEmpty, IsString } from 'class-validator';
export class MachineSerialDto {
  @IsString()
  @IsNotEmpty()
  public batch: string;

  @IsString()
  @IsNotEmpty()
  public compatibility: string;

  @IsString()
  @IsNotEmpty()
  public counter: string;

  @IsString()
  @IsNotEmpty()
  public control: string;
}
