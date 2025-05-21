import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';

export const roleGuard: CanActivateChildFn = (
  childRoute: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUser;

  const allowedRoles: string[] = childRoute.data['roles'];

  if (currentUser && allowedRoles.includes(currentUser.userType)) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
