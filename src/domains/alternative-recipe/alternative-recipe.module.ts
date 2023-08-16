import { Module } from '@nestjs/common';
import { AlternativeRecipeController } from './alternative-recipe.controller';
import { AlternativeRecipeService } from './alternative-recipe.service';

@Module({
  controllers: [AlternativeRecipeController],
  providers: [AlternativeRecipeService],
})
export class AlternativeRecipeModule {}
