import { Controller, Post, Body } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}
  @Post('create')
  async createRecipe(@Body() body: CreateRecipeDto) {
    return await this.recipeService.createRecipe(body);
  }
}
