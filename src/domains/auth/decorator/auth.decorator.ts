import { Role } from '../roles/permission.roles';
import { AuthenticationGuard, AuthorizationGuard } from '../guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
export function Auth(...roles: Role[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthenticationGuard, AuthorizationGuard),
  );
}
