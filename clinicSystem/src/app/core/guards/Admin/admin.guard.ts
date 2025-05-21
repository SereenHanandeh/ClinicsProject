import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/unauthorized']);
    return false;
  }
};
