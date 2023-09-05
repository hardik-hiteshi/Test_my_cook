import { Notes, notesSchema } from './schema/notes.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './notes.controller';
import { NotesRepository } from './repository/notes.repository';
import { NotesService } from './notes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notes.name, schema: notesSchema }]),
  ],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
})
export class NotesModule {}
