import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInUserDto } from './dtos';

@Controller()
export class AuthController {
  public constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  private signIn(@Body() body: SignInUserDto): Promise<{ token: string }> {
    return this.authService.signIn(body);
  }
}
