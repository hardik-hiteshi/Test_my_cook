import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as path from 'path';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoriesDTO } from './dto/createRecipe/subDto';
import { CreateRecipeDto } from './dto/createRecipe/createRecipe.dto';
import { promisify } from 'util';
import { RecipeDocument } from './schema/subSchema';
import { RecipeRepository } from './repository/recipe.repository';
import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';
// import { UpdateRecipeDto } from './dto/updateRecipe/updateRecipe.dto';

@Injectable()
export class RecipeService {
  public constructor(private recipeRepo: RecipeRepository) {}

  public async createRecipe(
    region: string,
    body: CreateRecipeDto,
  ): Promise<RecipeDocument> {
    if (body.categories && !body.category && !body.categoryNiceName) {
      if (body.categories.length > 0) {
        body.category = body.categories[0].name;
        body.categoryNiceName = body.categories[0].niceName;
      }
    }
    if (body.category && body.categoryNiceName) {
      if (!body.categories && body.category && body.categoryNiceName) {
        body.categories = [];
        const obj = {
          id: body.catId,
          name: `${body.category}`,
          niceName: `${body.categoryNiceName}`,
        };
        const data = body.categories.find((item: CategoriesDTO) => {
          item.id === body.catId;
        });
        if (!data) {
          body.categories.push(obj);
        }
      }
    }

    const recipe = await this.recipeRepo.findOne(region, body);
    if (!recipe) {
      const recipe = await this.recipeRepo.createRecipe(region, body);

      return recipe;
    }
    if (recipe) throw new BadRequestException('Recipe already exists.');
  }

  public async fetchAllRecipes(
    region: string,
    search: string,
  ): Promise<Array<RecipeDocument>> {
    const recipeList = await this.recipeRepo.fetchRecipes(region, search);
    if (recipeList.length <= 0) throw new NotFoundException('No recipe found');
    else {
      return recipeList;
    }
  }

  public async fetchRecipe(
    region: string,
    niceName: string,
  ): Promise<RecipeDocument> {
    const recipe = await this.recipeRepo.fetchOne(region, niceName);
    if (!recipe) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    return recipe;
  }

  public async updateRecipe(
    region: string,
    body: UpdateRecipeDto,
    niceName: string,
  ): Promise<RecipeDocument> {
    //if (body.categories && !body.category && !body.categoryNiceName) {
    if (body.categories.length > 0) {
      body.category = body.categories[0].name;
      body.categoryNiceName = body.categories[0].niceName;
    } else {
      body.category = '';
      body.categoryNiceName = '';
    }
    //}
    if (body.category && body.categoryNiceName) {
      if (!body.categories && body.category && body.categoryNiceName) {
        body.categories = [];
        const obj = {
          id: body.catId,
          name: `${body.category}`,
          niceName: `${body.categoryNiceName}`,
        };
        const data = body.categories.find((item: CategoriesDTO) => {
          item.id === body.catId;
        });
        if (!data) {
          body.categories.push(obj);
        }
      }
    }

    const recipe = await this.recipeRepo.updateRecipe(region, body, niceName);
    if (!recipe) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    return recipe;
  }

  public async deleteRecipe(
    region: string,
    niceName: string,
  ): Promise<RecipeDocument> {
    const recipe = await this.recipeRepo.deleteRecipe(region, niceName);
    if (recipe == null) {
      throw new NotFoundException('Recipe Does not exist.');
    }

    return recipe;
  }

  public async cloneToNewTouch(
    region: string,
    identifier: string,
    body: RecipeDocument,
  ): Promise<Partial<RecipeDocument>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    const { _id, __v, ...actualRecipe } = body;
    const originalNiceName = actualRecipe['recipe']['niceName'];
    const doc = actualRecipe;
    if (doc) {
      if (
        doc['recipe']['compatibility'] &&
        doc['recipe']['compatibility'][identifier]
      ) {
        return { compatibility: doc['recipe']['compatibility'][identifier] };
      }

      doc['recipe']['comments'] = [];
      doc['recipe']['ratings'] = [];
      if (!doc['recipe']['social']) {
        doc['recipe']['social'] = {
          favorite: 0,
          facebook: 0,
          comments: 0,
          ratings: 0,
          todo: 0,
        };
      }
      doc['recipe']['status']['nutritional'] = 'Auto (Good)';

      if (!doc['recipe']['compatibility']) doc['recipe']['compatibility'] = {};

      doc['recipe']['compatibility']['current'] = [identifier];

      doc['recipe']['status'] = '';

      //NiceName to recognize recipes
      const regex = /^(.*)(-s\d+)$/;
      const matches = doc['recipe']['niceName'].match(regex);
      if (matches != null) {
        doc['recipe']['niceName'] = matches[1];
      }

      doc['recipe']['niceName'] += '-' + identifier;
      if (!doc['recipe']['grants']) {
        doc['recipe']['grants'] = { _: '', search: [], view: [] };
      }

      doc['recipe']['grants']['search'] = doc['recipe']['grants']['search']
        ? doc['recipe']['grants']['search'].filter((grant) => grant != 'main')
        : ['public'];
      doc['recipe']['normalizeNiceName'] = true;
      //find an alternative for this.
      // await doc['recipe'].save();
      // const docs = doc['recipe'];
      // await docs.save();

      const oldSize = { ...doc['recipe']['size'] };

      doc['recipe']['size'] = {};
      doc['recipe']['size']['current'] = oldSize['current'];
      doc['recipe']['size'][doc['recipe']['size']['current']] =
        doc['recipe']['niceName'];
      const sizesToCheck = Object.keys(oldSize).filter(
        (k) => k != 'current' && k != oldSize['current'],
      );

      /* Vinculamos las recetas para los sizes que esten adaptados al nuevo sistema */
      const sizesToUpdate = [];
      for (const k of sizesToCheck) {
        const sizedRecipeNiceName = oldSize[k];
        const existsForNewCompat = await this.recipeRepo.findOneforCompat(
          {
            niceName: sizedRecipeNiceName,
            ['compatibility.' + identifier]: { $exists: true },
            region,
          },
          { _id: 0, ['compatibility.' + identifier]: 1 },
        );

        if (existsForNewCompat) {
          sizesToUpdate.push(existsForNewCompat['compatibility'][identifier]);

          doc.size[k] = existsForNewCompat['compatibility'][identifier];
          await this.recipeRepo.updateOneNewCompat(
            region,
            existsForNewCompat['compatibility'][identifier],
            doc['recipe']['niceName'],
            oldSize['current'],
          );
        }
      }

      if (
        sizesToUpdate.length &&
        !doc['recipe']['grants']['search'].includes('multisize')
      ) {
        doc['recipe']['grants']['search'].push('multisize');
      } else if (
        !sizesToUpdate.length &&
        doc['recipe']['grants']['search'].includes('multisize')
      ) {
        doc['recipe']['grants']['search'] = doc['recipe']['grants'][
          'search'
        ].filter((g) => g != 'multisize');
      }

      doc['recipe']['compatibility'][identifier] = doc['recipe']['niceName'];

      // doc.markModified('size');
      // doc.markModified('compatibility');
      // doc.markModified('grants');

      // await doc.save();

      let niceNamesToUpdate = Object.values(
        doc['recipe']['compatibility'],
      ).filter((val) => {
        !Array.isArray(val) && val != doc['recipe']['niceName'];
      });
      niceNamesToUpdate = niceNamesToUpdate.filter((r, idx, arr) => {
        arr.indexOf(r) === idx;
      });

      const newFormat = {};
      newFormat['compatibility.' + identifier] = doc['recipe']['niceName'];

      /* Set formats for all recipes: Pax, original and new: */
      await this.recipeRepo.updateniceNames(
        { niceName: { $in: niceNamesToUpdate }, region },
        { $set: newFormat },
      );

      //Will work on this later when we will add elastic search feature.
      // let elastic_idx =
      //   config.regions[region] && config.regions[region].elastic_index
      //     ? config.regions[req.region].elastic_index
      //     : common.getDefaultElasticIndex(req.region);

      // if (elastic_idx) {
      //   await Elastic.getClient().updateByQuery({
      //     index: elastic_idx,
      //     conflicts: 'proceed',
      //     body: {
      //       script: {
      //         source:
      //           'ctx._source.compatibility.' +
      //           req.params.identifier +
      //           " = '" +
      //           doc.niceName +
      //           "';",
      //         lang: 'painless',
      //       },
      //       query: {
      //         bool: {
      //           must: [
      //             {
      //               terms: {
      //                 'niceName.keyword': niceNamesToUpdate,
      //               },
      //             },
      //           ],
      //           filter: [
      //             {
      //               term: {
      //                 'region.keyword': req.region,
      //               },
      //             },
      //           ],
      //         },
      //       },
      //     },
      //   });

      //   if (sizesToUpdate.length) {
      //     await Elastic.getClient().updateByQuery({
      //       index: elastic_idx,
      //       conflicts: 'proceed',
      //       body: {
      //         script: {
      //           source: `ctx._source.size.${oldSize['current']} = '${doc.niceName}'`,
      //           lang: 'painless',
      //         },
      //         query: {
      //           bool: {
      //             must: [
      //               {
      //                 terms: {
      //                   'niceName.keyword': sizesToUpdate,
      //                 },
      //               },
      //             ],
      //             filter: [
      //               {
      //                 term: {
      //                   'region.keyword': region,
      //                 },
      //               },
      //             ],
      //           },
      //         },
      //       },
      //     });
      //   }
      // }

      if (body['copyImage']) {
        // console.log(path.join(__dirname, 'cd ../../../../'));
        //C:\Users\gautam.atre\Desktop\mycook-api-nest\uploads

        // return;
        const imagePath = path.join(__dirname, '..', '..', '..', '/uploads');
        let fromPath;
        let found = false;

        for (const ext of ['.jpg', '.png', '.webp']) {
          fromPath = path.join(
            imagePath,
            region,
            'recipe',
            originalNiceName + '$0' + ext,
          );

          if (await fs.exists(fromPath)) {
            found = true;
            break;
          }
        }
        // console.log('eror');
        if (found) {
          let cacheFiles = [];
          cacheFiles = glob.sync(
            imagePath +
              '/.cache/' +
              region +
              '/recipe/**/' +
              doc['recipe']['niceName'] +
              '$0.*',
          );
          for (const cacheFile of cacheFiles)
            await promisify(fs.unlink)(cacheFile);

          const oldFiles = await promisify(glob)(
            imagePath +
              '/' +
              region +
              '/recipe/' +
              doc['recipe']['niceName'] +
              '$0.*',
          );

          for (const oldFile of oldFiles) await promisify(fs.unlink)(oldFile);

          const toPath = path.join(
            imagePath,
            region,
            'recipe',
            doc['recipe']['niceName'] + '$0' + path.extname(fromPath),
          );

          fs.copyFileSync(fromPath, toPath);
        } else {
          const imagePath = path.join(__dirname, '..', '..', '..', '/uploads');
          const oldFiles = await promisify(glob)(
            imagePath +
              '/' +
              region +
              '/recipe/' +
              doc['recipe']['niceName'] +
              '$0.*',
          );

          for (const oldFile of oldFiles) await promisify(fs.unlink)(oldFile);

          return { niceName: doc['recipe']['niceName'] };
        }
      }
    }
  }
}
