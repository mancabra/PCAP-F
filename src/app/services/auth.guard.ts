import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const general = inject(AuthService);
  const router = inject(Router);
  const bool = localStorage.getItem('logged');

  if (general.usuarioLogeado() && general.getRole() == 'GESTOR') {
    return true;
  }
  router.navigate(['start']);
  return false;
};
