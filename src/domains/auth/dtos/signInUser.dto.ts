import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignInUserDto {
  //   @IsNotEmpty()
  //   @IsEmail()
  //   email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  niceName: string;
}
