import { CanActivateChildFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const unifiedRoleGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const userData = localStorage.getItem('user');

  if (!userData) {
    router.navigate(['/login']);
    return false;
  }

  const user = JSON.parse(userData);
  const requiredRole = route.data['role'];

  if (!requiredRole || user.userType === requiredRole) {
    return true;
  }

  const redirectMap: Record<string, string> = {
    admin: '/admin',
    doctor: '/doctor',
    patient: '/patient',
  };

  router.navigate([redirectMap[user.userType] || '/login']);
  return false;
};
