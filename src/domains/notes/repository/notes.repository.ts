import { Notes, NotesDocument } from '../schema/notes.schema';
import { CreateNotesDTO } from '../dto/notes.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateNotesDTO } from '../dto/notes.update.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class NotesRepository {
  public constructor(
    @InjectModel(Notes.name) public notesModel: Model<Notes>,
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
}
