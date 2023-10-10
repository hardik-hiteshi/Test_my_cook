// BankDataDto.ts
import { IsBoolean } from 'class-validator';

export class BankDataDto {
  @IsBoolean()
  public sendData: boolean;
}
