import { SerialDto } from '../dtos/createManyMachine/subDto/serial.dto';

export interface IItemsToInsert extends Partial<SerialDto> {
  uniqueId: string;
  region: string;
}
