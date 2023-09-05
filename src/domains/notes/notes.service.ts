import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotesDTO } from './dto/notes.create.dto';
import { NotesDocument } from './schema/notes.schema';
import { NotesRepository } from './repository/notes.repository';
import { UpdateNotesDTO } from './dto/notes.update.dto';

@Injectable()
export class NotesService {
  public constructor(public notesRepo: NotesRepository) {}

  public async createNote(
    region: string,
    body: CreateNotesDTO,
  ): Promise<NotesDocument> {
    const notes = await this.notesRepo.findOne(region, body);
    if (!notes) {
      const notes = await this.notesRepo.createNote(region, body);

      return notes;
    }
    throw new BadRequestException('Note already exists.');
  }

  public async fetchNote(
    region: string,
    uniqueId: string,
  ): Promise<NotesDocument> {
    const note = await this.notesRepo.fetchNote(region, uniqueId);
    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    return note;
  }

  public async updateNote(
    region: string,
    uniqueId: string,
    body: UpdateNotesDTO,
  ): Promise<NotesDocument> {
    const updatedNote = await this.notesRepo.updateNote(region, uniqueId, body);
    if (!updatedNote) {
      throw new NotFoundException('Note not updated.Note not found.');
    }

    return updatedNote;
  }

  public async deleteNote(
    region: string,
    uniqueId: string,
  ): Promise<NotesDocument> {
    const deletedNote = await this.notesRepo.deleteNote(region, uniqueId);
    if (!deletedNote) {
      throw new NotFoundException('Note not  deleted. object not found.');
    }

    return deletedNote;
  }

  public async fetchNotes(region: string): Promise<NotesDocument[]> {
    const notesList = await this.notesRepo.fetchNotes(region);
    if (notesList.length > 0) {
      return notesList;
    }
    throw new NotFoundException('Notes not found.');
  }
}
