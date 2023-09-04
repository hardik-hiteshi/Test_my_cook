import { AdvertisementModule } from './domains/advertisement/advertisement.module';
import { AlternativeRecipeModule } from './domains/alternative-recipe/alternative-recipe.module';
import { BadgesModule } from './domains/badges/badges.module';
import { CategoryModule } from './domains/category/category.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { FactoryModule } from './domains/factory/factory.module';
import { FeaturedModule } from './domains/featured/featured.module';
import { LegalRegistryModule } from './domains/legal-registry/legal-registry.module';
import { LegalTermsModule } from './domains/legal-terms/legal-terms.module';
import { MachineModelModule } from './domains/machineModel/machineModel.module';
import { MachineModule } from './domains/machine/machine.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './domains/notes/notes.module';
import { RankModule } from './domains/rank/rank.module';
import { RecipeModule } from './domains/recipe/recipe.module';
import { UserModule } from './domains/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdvertisementModule,
    AlternativeRecipeModule,
    BadgesModule,
    CategoryModule,
    FactoryModule,
    FeaturedModule,
    MachineModule,
    MachineModelModule,
    RankModule,
    RecipeModule,
    UserModule,
    CommonModule,
    LegalTermsModule,
    NotesModule,
    LegalRegistryModule,
  ],
})
export class AppModule {}
