import { AdvertisementModule } from './domains/advertisement/advertisement.module';
import { AliasModule } from './domains/alias/alias.module';
import { AlternativeRecipeModule } from './domains/alternative-recipe/alternative-recipe.module';
import { AuthorModule } from './domains/author/author.module';
import { BadgesModule } from './domains/badges/badges.module';
import { CategoryModule } from './domains/category/category.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { ContactModule } from './domains/contact/contact.module';
import { DietsModule } from './domains/diets/diets.module';
import { EbookModule } from './domains/ebook/ebook.module';
import { FactoryModule } from './domains/factory/factory.module';
import { FeaturedModule } from './domains/featured/featured.module';
import { FoodGroupModule } from './domains/food-group/food-group.module';
import { LegalHistoryModule } from './domains/legal-history/legal-history.module';
import { LegalRegistryModule } from './domains/legal-registry/legal-registry.module';
import { LegalTermsModule } from './domains/legal-terms/legal-terms.module';
import { MachineLogModule } from './domains/machine-log/machine-log.module';
import { MachineModelModule } from './domains/machineModel/machineModel.module';
import { MachineModule } from './domains/machine/machine.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsLetterMailModule } from './domains/news-letter-mail/news-letter-mail.module';
import { NewsModule } from './domains/news/news.module';
import { NotesModule } from './domains/notes/notes.module';
import { NutritionalDisclaimerModule } from './domains/nutritional-disclaimer/nutritional-disclaimer.module';
import { PictosModule } from './domains/pictos/pictos.module';
import { ProductModule } from './domains/product/product.module';
import { RankModule } from './domains/rank/rank.module';
import { RecipeModule } from './domains/recipe/recipe.module';
import { ReportAbuseModule } from './domains/report-abuse/report-abuse.module';
import { TipModule } from './domains/tip/tip.module';
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
    TipModule,
    ProductModule,
    PictosModule,
    ReportAbuseModule,
    AliasModule,
    ContactModule,
    NewsLetterMailModule,
    LegalHistoryModule,
    NewsModule,
    DietsModule,
    LegalHistoryModule,
    LegalTermsModule,
    NotesModule,
    LegalRegistryModule,
    AuthorModule,
    EbookModule,
    NutritionalDisclaimerModule,
    FoodGroupModule,
    MachineLogModule,
  ],
})
export class AppModule {}
