import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import { SignInUserDto } from './dtos';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class AuthService {
  public constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userRepo: UserRepository,
  ) {}

  // need to change SignInUserDto and signJwt parameter type
  public async signIn(body: SignInUserDto): Promise<{ token: string }> {
    const user = await this.userRepo.findOne({ niceName: body.niceName });
    if (!user) throw new BadRequestException('invalid user or password');

    const pwMatched = await bcrypt.compare(body.password, user.password);
    if (!pwMatched) throw new BadRequestException('invalid user or password');

    const token = await this.signJwt(user._id);

    return { token };
  }

  public async signJwt(
    id: mongoose.Types.ObjectId,
    expiresIn?: string,
  ): Promise<string> {
    const payload = {
      sub: id,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: expiresIn ?? '24h',
    });

    return token;
  }
}
