import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Request } from 'express';
import { SignInUserDto } from './dtos';

@Controller()
export class AuthController {
  public constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  private signIn(
    @Req() request: Request,
    @Body() body: SignInUserDto,
    @Headers('User-agent') agent: string,
    @Headers('region') region: string,
    @Ip() ip: string,
    @Headers('x-redirector-ip') redirect?: string,
    @Headers('x-forwarded-for') forwarded?: string,
    @Headers('date') date?: Date,
    @Headers('rate') rate?: number,
    @Headers('commentId') commentId?: string,
    @Headers('legalType') legalType?: string,
  ): Promise<object> {
    return this.authService.signIn(
      body,
      agent,
      region,
      request,
      ip,
      redirect,
      forwarded,
      date,
      rate,
      commentId,
      legalType,
    );
  }
}
