import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  public password: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  public niceName: string;
}
