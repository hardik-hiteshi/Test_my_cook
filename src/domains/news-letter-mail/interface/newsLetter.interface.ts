import { CreateNewsLetterDto } from '../dtos';

export interface INewsLetter extends CreateNewsLetterDto {
  uniqueId: string;
  region: string;
}
