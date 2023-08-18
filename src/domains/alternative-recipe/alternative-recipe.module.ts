import { AlternativeRecipeController } from './alternative-recipe.controller';
import { AlternativeRecipeService } from './alternative-recipe.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AlternativeRecipeController],
  providers: [AlternativeRecipeService],
})
export class AlternativeRecipeModule {}
