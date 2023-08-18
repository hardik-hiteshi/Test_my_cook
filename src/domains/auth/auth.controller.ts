import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInUserDto } from './dtos';
import { GetUser } from './decorator';
import { UserDocument } from '../user/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sigin-in')
  signIn(@Body() body: SignInUserDto) {
    return this.authService.signIn(body);
  }
  @Post('reset-password')
  resetPassword(@Body() body) {}
}
