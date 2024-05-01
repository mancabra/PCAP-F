import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const general = inject(AuthService);
  const router = inject(Router);
  const bool = localStorage.getItem('logged');

  if (general.usuarioLogeado() && general.getRole() == 'ADMINISTRADOR') {
    return true;
  }
  router.navigate(['']);
  return false;
};
