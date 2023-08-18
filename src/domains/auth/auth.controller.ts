import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInUserDto } from './dtos';

@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @Post('sign-in')
  public signIn(@Body() body: SignInUserDto): Promise<{ token: string }> {
    return this.authService.signIn(body);
  }
}
