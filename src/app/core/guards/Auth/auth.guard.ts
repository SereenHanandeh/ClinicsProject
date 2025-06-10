import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard = (
  role: 'admin' | 'doctor' | 'patient'
): CanActivateFn => {
  return (route, state) => {
    const router = inject(Router);
    const userData = localStorage.getItem('user');

    if (!userData) {
      router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userData);

    if (user.userType === role) {
      return true;
    }

    // إعادة توجيه حسب نوع المستخدم
    const redirectMap: Record<string, string> = {
      admin: '/admin/dashboard',
      doctor: '/doctor',
      patient: '/patient',
    };

    router.navigate([redirectMap[user.userType] || '/login']);
    return false;
  };
};
