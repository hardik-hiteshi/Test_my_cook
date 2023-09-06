import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateNotesDTO } from './dto/notes.create.dto';
import { NotesDocument } from './schema/notes.schema';
import { NotesService } from './notes.service';
import { UpdateNotesDTO } from './dto/notes.update.dto';

@Controller('note')
export class NotesController {
  public constructor(public noteServices: NotesService) {}

  @Post()
  public async createNote(
    @Headers('region') region: string,
    @Body() body: CreateNotesDTO,
  ): Promise<NotesDocument> {
    return this.noteServices.createNote(region, body);
  }

  @Get(':uniqueId')
  public async fetchNote(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<NotesDocument> {
    return this.noteServices.fetchNote(region, uniqueId);
  }

  @Patch(':uniqueId')
  public async updateNote(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateNotesDTO,
  ): Promise<NotesDocument> {
    return this.noteServices.updateNote(region, uniqueId, body);
  }

  @Delete(':uniqueId')
  public async deleteNote(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<NotesDocument> {
    return this.noteServices.deleteNote(region, uniqueId);
  }

  @Get()
  public async fetchNotes(
    @Headers('region') region: string,
  ): Promise<NotesDocument[]> {
    return this.noteServices.fetchNotes(region);
  }
}
