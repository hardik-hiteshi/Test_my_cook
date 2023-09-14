import { Category, categorySchema } from './schema/category.schema';
import { CategoriesController } from './controller/categories.controller';
import { CategoryController } from './controller/category.controller';
import { CategoryRepository } from './repository/category.repository';
import { CategoryService } from './category.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: categorySchema,
      },
    ]),
  ],
  controllers: [CategoryController, CategoriesController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryRepository, MongooseModule],
})
export class CategoryModule {}
