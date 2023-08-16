import { Injectable, BadRequestException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInUserDto } from './dtos';
import { UserRepository } from '../user/repository/user.repository';
import mongoose from 'mongoose';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userRepo: UserRepository,
  ) {}

  // need to change SignInUserDto and signJwt parameter type
  async signIn(body: SignInUserDto): Promise<{ token: string }> {
    const user = await this.userRepo.findOne({ niceName: body.niceName });
    if (!user) throw new BadRequestException('invalid user or password');

    const pwMatched = await bcrypt.compare(body.password, user.password);
    if (!pwMatched) throw new BadRequestException('invalid user or password');

    const token = await this.signJwt(user._id);
    return { token };
  }

  async signJwt(id: mongoose.Types.ObjectId): Promise<string> {
    const payload = {
      sub: id,
    };

    //secret key need to set in env
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '24h',
    });
    return token;
  }

  async resetPassword(body) {
    const user = await this.userRepo.findOne({});
  }
}
