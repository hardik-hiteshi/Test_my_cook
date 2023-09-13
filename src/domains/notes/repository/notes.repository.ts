import { Model, Types } from 'mongoose';
import { Notes, NotesDocument } from '../schema/notes.schema';
import { CreateNotesDTO } from '../dto/notes.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateNotesDTO } from '../dto/notes.update.dto';
import { User } from 'src/domains/user/schema/user.schema';
import { v4 as uuid } from 'uuid';

@Injectable()
export class NotesRepository {
  public constructor(
    @InjectModel(Notes.name) public notesModel: Model<Notes>,
    // @InjectModel(Recipe.name) public recipeModel: Model<Recipe>,
    @InjectModel(User.name) public userModel: Model<User>,
  ) {}

  public async findOne(
    region: string,
    body: CreateNotesDTO,
  ): Promise<NotesDocument> {
    const notes = await this.notesModel.findOne({
      region,
      ...body,
      isActive: true,
    });

    return notes;
  }

  public async createNote(
    region: string,
    body: CreateNotesDTO,
  ): Promise<NotesDocument> {
    const notes = await this.notesModel.create({
      region,
      ...body,
      uniqueId: uuid(),
      isActive: true,
    });

    return notes;
  }

  public async fetchNote(
    region: string,
    uniqueId: string,
  ): Promise<NotesDocument> {
    const note = await this.notesModel.findOne({
      region,
      uniqueId,
      isActive: true,
    });

    return note;
  }

  public async updateNote(
    region: string,
    uniqueId: string,
    body: UpdateNotesDTO,
  ): Promise<NotesDocument> {
    const updatedNote = await this.notesModel.findOneAndUpdate(
      { region, uniqueId, isActive: true },
      body,
      { new: true },
    );

    return updatedNote;
  }

  public async deleteNote(
    region: string,
    uniqueId: string,
  ): Promise<NotesDocument> {
    const deletedNote = await this.notesModel.findOneAndUpdate(
      { region, uniqueId, isActive: true },
      { isActive: false },
      { new: true },
    );

    return deletedNote;
  }

  public async fetchNotes(region: string): Promise<NotesDocument[]> {
    const notesList = await this.notesModel.find({ region, isActive: true });

    return notesList;
  }

  public async fetchNoteRecipe(
    region: string,
    recipe: string,
  ): Promise<NotesDocument> {
    const notes = (await this.notesModel
      .find({
        region,
        isActive: true,
      })
      .populate('recipe niceName -_id')) as Array<
      NotesDocument & {
        recipe: { niceName: string };
      }
    >;

    const result = notes.find((note) => note?.recipe?.niceName === recipe);

    return result;
  }

  public async fetchRecipeNotesRecipe(
    user: Types.ObjectId,
    region: string,
    recipe: Types.ObjectId,
  ): Promise<NotesDocument> {
    const notes = await this.notesModel.findOne({
      region,
      user,
      recipe,
      isActive: true,
    });

    return notes;
  }
}
