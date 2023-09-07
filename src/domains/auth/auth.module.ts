import { forwardRef, Global, Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserLogModule } from '../user-log/user-log.module';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({}),
    UserLogModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
