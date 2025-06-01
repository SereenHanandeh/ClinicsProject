import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
