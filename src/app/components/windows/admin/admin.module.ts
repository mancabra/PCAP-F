import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdministradorComponent } from './administrador/administrador.component';
import { FormGestorComponent } from './gestor/form-gestor/form-gestor.component';
import { GestorComponent } from './gestor/gestor.component';
import { NavComponent } from './nav/nav.component';
import { PrestadorComponent } from './prestador/prestador.component';
import { FormPrestadorComponent } from './prestador/form-prestador/form-prestador.component';

@NgModule({
  declarations: [
    NavComponent,
    AdministradorComponent,
    GestorComponent,
    FormGestorComponent,
    PrestadorComponent,
    FormPrestadorComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule],
})
export class AdminModule {}
