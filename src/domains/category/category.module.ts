import { Category, categorySchema } from './schema/category.schema';
import { CategoryController } from './category.controller';
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
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryRepository, MongooseModule],
})
export class CategoryModule {}
