import { AdvertisementModule } from './domains/advertisement/advertisement.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { FactoryModule } from './domains/factory/factory.module';
import { FeaturedModule } from './domains/featured/featured.module';
import { MachineModelModule } from './domains/machineModel/machineModel.module';
import { MachineModule } from './domains/machine/machine.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RankModule } from './domains/rank/rank.module';
import { RecipeModule } from './domains/recipe/recipe.module';
import { UserModule } from './domains/user/user.module';

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
    CommonModule,
  ],
})
export class AppModule {}
