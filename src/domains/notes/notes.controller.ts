import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AUTH } from '../auth/decorator/auth.decorator';
import { CreateNotesDTO } from './dto/notes.create.dto';
import { GET_USER } from '../auth/decorator';
import { NotesDocument } from './schema/notes.schema';
import { NotesService } from './notes.service';
import { Role } from '../auth/roles/permission.roles';
import { UpdateNotesDTO } from './dto/notes.update.dto';
import { UserDocument } from '../user/schema/user.schema';

@AUTH(Role.admin)
@Controller()
export class NotesController {
  public constructor(public noteServices: NotesService) {}

  @Post('note')
  public async createNote(
    @Headers('region') region: string,
    @Body() body: CreateNotesDTO,
  ): Promise<NotesDocument> {
    return this.noteServices.createNote(region, body);
  }

  @Get('note/:uniqueId')
  public async fetchNote(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<NotesDocument> {
    return this.noteServices.fetchNote(region, uniqueId);
  }

  @Put('note/:uniqueId')
  public async updateNote(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
    @Body() body: UpdateNotesDTO,
  ): Promise<NotesDocument> {
    return this.noteServices.updateNote(region, uniqueId, body);
  }

  @Delete('note/:uniqueId')
  public async deleteNote(
    @Headers('region') region: string,
    @Param('uniqueId') uniqueId: string,
  ): Promise<NotesDocument> {
    return this.noteServices.deleteNote(region, uniqueId);
  }

  @Get('notes')
  public async fetchNotes(
    @Headers('region') region: string,
  ): Promise<NotesDocument[]> {
    return this.noteServices.fetchNotes(region);
  }

  @Get('note/:recipe/recipe')
  public async fetchNoteRecipe(
    @Headers('region') region: string,
    @Param('recipe') recipe: string,
  ): Promise<NotesDocument> {
    return this.noteServices.fetchNoteRecipe(region, recipe);
  }

  @Get('recipeNotes/:recipe')
  public async fetchRecipeNotesRecipe(
    @GET_USER() user: UserDocument,
    @Headers('region') region: string,
    @Param('recipe') recipe: string,
  ): Promise<NotesDocument> {
    return this.noteServices.fetchRecipeNotesRecipe(user, region, recipe);
  }

  // @Post('recipeNotes/:recipe')
  // public async insertRecipeNotesRecipe(
  //   @GET_USER() user: UserDocument,
  //   @Headers('region') region: string,
  //   @Param('recipe') recipe: string,
  //   @Body() body: UpdateNotesDTO,
  // ): Promise<NotesDocument> {
  //   return this.noteServices.insertRecipeNotesRecipe(
  //     user,
  //     region,
  //     recipe,
  //     body,
  //   );
  // }
}
