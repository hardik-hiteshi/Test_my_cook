import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './domains/user/user.module';
import { MachineModule } from './domains/machine/machine.module';
import { MachineModelModule } from './domains/machineModel/machineModel.module';
import { FactoryModule } from './domains/factory/factory.module';
import { FeaturedModule } from './domains/featured/featured.module';
import { RankModule } from './domains/rank/rank.module';
import { ConfigModule } from '@nestjs/config';
import { config } from 'process';
import { RecipeModule } from './domains/recipe/recipe.module';
import { AdvertisementModule } from './domains/advertisement/advertisement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UserModule,
    MachineModule,
    MachineModelModule,
    FactoryModule,
    FeaturedModule,
    RankModule,
    RecipeModule,
    AdvertisementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
