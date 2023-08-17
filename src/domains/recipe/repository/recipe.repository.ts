import { InjectModel } from '@nestjs/mongoose';
import { Recipe, RecipeDocument } from '../schema/subSchema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import QueryInterface from './interface/recipequery.interface';
import { UpdateRecipeDto } from '../dto/updateRecipe/updateRecipe.dto';
import { CreateRecipeDto } from '../dto/createRecipe/createRecipe.dto';

@Injectable()
export class RecipeRepository {
  constructor(@InjectModel(Recipe.name) private RecipeModel: Model<Recipe>) {}

  async findOne(
    region: string,
    body: CreateRecipeDto,
  ): Promise<RecipeDocument> {
    const recipe = await this.RecipeModel.findOne({
      niceName: body.niceName,
      region: region,
    });

    return recipe;
  }
  async create(body): Promise<RecipeDocument> {
    return await this.RecipeModel.create(body);
  }
  async findAll(region, search): Promise<Array<RecipeDocument>> {
    let query: QueryInterface = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { niceName: { $regex: search, $options: 'i' } },
        { 'categories.name': { $in: [search] } },
        { 'categories.niceName': { $in: [search] } },
        // { rate: { $regex: search, $options: "i" } },
        { course: { $in: [search] } },
        { 'user.displayName': { $regex: search, $options: 'i' } },
        { 'user.niceName': { $regex: search, $options: 'i' } },
        { 'user.rank': { $regex: search, $options: 'i' } },
        { 'user.role': { $regex: search, $options: 'i' } },
        { 'user.web': { $regex: search, $options: 'i' } },
        { 'user.webName': { $regex: search, $options: 'i' } },
        { 'user.instagram': { $regex: search, $options: 'i' } },
        { 'user.twitter': { $regex: search, $options: 'i' } },
        //{ "info.creationDate": { $regex: search, $options: "i" } },
        //creationDate { "info.modificationDate": { $regex: search, $options: "i" } },
        { 'info.creationSource': { $regex: search, $options: 'i' } },
        { 'info.modificationSource': { $regex: search, $options: 'i' } },
        //{ totalTime: { $regex: search, $options: "i" } },
        // { cookTime: { $regex: search, $options: "i" } },
        //{ difficulty: { $regex: search, $options: "i" } },
        //{ price: { $regex: search, $options: "i" } },
        { 'status.exportable': { $regex: search, $options: 'i' } },
        { 'status.verified': { $regex: search, $options: 'i' } },
        { 'status.idParent': { $regex: search, $options: 'i' } },
        { 'status.nutritional': { $regex: search, $options: 'i' } },
        { foodGroups: { $in: [search] } },
        { videos: { $in: [search] } },
        { tags: { $in: [search] } },
        // { "social.favorite": { $regex: search, $options: "i" } },
        // { "social.facebook": { $regex: search, $options: "i" } },
        // { "social.comments": { $regex: search, $options: "i" } },
        // { "social.ratings": { $regex: search, $options: "i" } },
        { 'source.url': { $regex: search, $options: 'i' } },
        { 'source.name': { $regex: search, $options: 'i' } },
        { 'grants.view': { $regex: search, $options: 'i' } },
        { 'grants.search': { $regex: search, $options: 'i' } },
        { rations: { $in: [search] } },
        { advice: { $regex: search, $options: 'i' } },
        { 'seo.title': { $regex: search, $options: 'i' } },
        { 'seo.description': { $regex: search, $options: 'i' } },
        { 'seo.canonical': { $regex: search, $options: 'i' } },
        //{ "seo.autopublishDate": { $regex: search, $options: "i" } },
        // { "seo.index": { $regex: search, $options: "i" } },
        // { "seo.follow": { $regex: search, $options: "i" } },
        { 'seo.extra.title': { $regex: search, $options: 'i' } },
        { 'seo.extra.text': { $regex: search, $options: 'i' } },
        { 'seo.keywords': { $regex: search, $options: 'i' } },
        //{ nutritionalForRation: { $regex: search, $options: "i" } },
      ];
    }
    const data = await this.RecipeModel.find(query);
    if (data.length > 0) {
      return data;
    }
    return [];
  }
  async fetchOne(region, niceName) {
    const recipe = await this.RecipeModel.findOne({
      niceName: niceName,
      region: region,
    });
    return recipe;
  }
  async updateOne(body: UpdateRecipeDto, niceName: string) {
    console.log(body);
    const recipe = await this.RecipeModel.findOneAndUpdate(
      { niceName: niceName },
      body,
      { new: true },
    );
    console.log(recipe);
    return recipe;
  }
}
