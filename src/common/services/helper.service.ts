import { HydratedDocument } from 'mongoose';

export class HelperService {
  public updateNestedFields<T>(
    obj: HydratedDocument<T>,
    updateData: object,
  ): void {
    for (const key in updateData) {
      if (obj[key] && typeof obj[key] === 'object') {
        this.updateNestedFields(obj[key], updateData[key]);
      } else {
        obj[key] = updateData[key];
      }
    }
  }
}
