import { CanActivateFn, Router } from '@angular/router';
import {inject } from '@angular/core';
import { GeneralService } from './general.service';


export const authGuard: CanActivateFn = (route, state) => {
  const general = inject(GeneralService);
  const router = inject(Router);
  const bool = localStorage.getItem('logged')
  

  if(bool != "true"){
    router.navigate(["start"]);
    return false;
  }
  return true;
};
