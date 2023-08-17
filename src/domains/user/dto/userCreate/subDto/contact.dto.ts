import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class ContactnDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsNotEmpty()
  @IsString()
  mail: string;
}
