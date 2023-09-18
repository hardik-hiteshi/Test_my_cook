import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import mongoose from 'mongoose';
import { SignInUserDto } from './dtos';
import { UserLogService } from '../user-log/user-log.service';
import { UserRepository } from '../user/repository/user.repository';

@Injectable()
export class AuthService {
  public constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userRepo: UserRepository,
    private ulServices: UserLogService,
  ) {}

  public async signIn(
    body: SignInUserDto,
    agent: string,
    region: string,
    ip?: string,
    redirect?: string,
    forwarded?: string,
    date?: Date,
    rate?: number,
    commentId?: string,
    legalType?: string,
    type?: string,
  ): Promise<object> {
    const user = await this.userRepo.findOne({
      /* eslint-disable @typescript-eslint/naming-convention */
      'contact.mail': body.mail,
    });

    // await this.ulServices.createIncomingUserLog(
    //   user,
    //   agent,
    //   region,
    //   ip,
    //   redirect,
    //   forwarded,
    //   date,
    //   rate,
    //   commentId,
    //   legalType,
    //   type,
    // );
    // await this.ulServices.createIncomingUserLog()

    if (!user) throw new BadRequestException('invalid user or password');

    const pwMatched = await bcrypt.compare(body.password, user.password);
    if (!pwMatched) throw new BadRequestException('invalid user or password');

    const token = await this.signJwt(user._id);
    const data = {
      niceName: user.niceName,
      displayName: user.name.displayName,
      email: user.contact.mail,
      role: user.role,
      rank: user.rank,
      // eslint-disable-next-line object-shorthand
      ip: ip,
      allowedRegions: user.allowedRegions,
      token,
    };

    return data;
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
