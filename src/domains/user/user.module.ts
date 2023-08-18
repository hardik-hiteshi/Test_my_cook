import { forwardRef, Module } from '@nestjs/common';
import { User, UserSchema } from './schema/user.schema';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository, MongooseModule],
})
export class UserModule {}
