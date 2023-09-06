import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public mail: string;
}
