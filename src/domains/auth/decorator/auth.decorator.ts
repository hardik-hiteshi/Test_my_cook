import { Role } from '../roles/permission.roles';
import { AuthenticationGuard, AuthorizationGuard } from '../guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { Roles } from './roles.decorator';
export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthenticationGuard, AuthorizationGuard),
  );
}
