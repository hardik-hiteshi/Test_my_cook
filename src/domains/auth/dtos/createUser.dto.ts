// import {
//   IsString,
//   IsEmail,
//   IsNotEmpty,
//   MinLength,
//   IsPhoneNumber,
//   IsEnum,
//   IsOptional,
// } from 'class-validator';
// import { Role } from '../roles/permission.roles';

// export class CreateUserDto {
//   @IsNotEmpty()
//   @IsString()
//   id: string;

//   @MinLength(3)
//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   @MinLength(8)
//   @IsNotEmpty()
//   @IsString()
//   password: string;

//   @MinLength(3)
//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @IsPhoneNumber('IN')
//   @IsNotEmpty()
//   phone: string;

//   @IsOptional()
//   @IsString()
//   ProfileImage?: string;

//   @IsOptional()
//   @IsString()
//   bmi?: string;

//   @IsString()
//   @IsNotEmpty()
//   @IsEnum(Role)
//   role: string;

//   // id: { type: String, unique: true },
//   // email: { type: String, required: true },
//   // password: { type: String, required: true },
//   // name: { type: String, required: true },
//   // phone: { type: String, required: true },
//   // ProfileImage: { type: String, default: null },
//   // bmi: { type: String, default: null },
//   // role: { type: String, required: true },
// }
