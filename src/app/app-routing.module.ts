import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './Irregularidad/add/add.component';
import { DeleteComponent } from './Irregularidad/delete/delete.component';
import { EditComponent } from './Irregularidad/edit/edit.component';
import { ListarComponent } from './Irregularidad/listar/listar.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EstatusTramiteComponent } from './components/windows/estatus-tramite/estatus-tramite.component';
import { GenerarComponent } from './components/windows/generar/generar.component';
import { GestionPrestadoresComponent } from './components/windows/gestion-prestadores/gestion-prestadores.component';
import { GestionPrioridadComponent } from './components/windows/gestion-prioridad/gestion-prioridad.component';
import { GestionTramitesComponent } from './components/windows/gestion-tramites/gestion-tramites.component';
import { PrestadoresComponent } from './components/windows/prestadores/prestadores.component';
import { PrincipalComponent } from './components/windows/principal/principal.component';
import { ProyectosComponent } from './components/windows/proyectos/proyectos.component';
import { RegistroComponent } from './components/windows/registro/registro.component';
import { TramiteComponent } from './components/windows/tramite/tramite.component';
import { adminGuard } from './services/admin.guard';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'Principal/avisos', pathMatch: 'full' },
  { path: 'start', component: LoginComponent },
  {
    path: 'Principal',
    canActivate: [authGuard],
    component: NavbarComponent,

    children: [
      { path: 'listar', component: ListarComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit', component: EditComponent },
      { path: 'delete', component: DeleteComponent },
      { path: 'avisos', component: PrincipalComponent },
      { path: 'generar', component: RegistroComponent },
      { path: 'tramites', component: GestionPrestadoresComponent },
      { path: 'proyectos', component: ProyectosComponent },
      { path: 'prestadores', component: PrestadoresComponent },
      { path: 'calendario', component: GenerarComponent },
      { path: 'gestion/proyectos', component: GestionTramitesComponent },
      { path: 'gestion/prestadores', component: GestionPrestadoresComponent },
      { path: 'gestion/prioridad', component: GestionPrioridadComponent },
      //secundarias
      {
        path: 'tramites/activos/proyecto/estatus',
        component: EstatusTramiteComponent,
      },
      { path: 'tramites/gestion', component: TramiteComponent },
    ],
  },
  {
    path: 'administrador',
    loadChildren: () =>
      import('./components/windows/admin/admin.module').then(
        (m) => m.AdminModule
      ),
    canActivate: [adminGuard],
  },
  { path: '**', redirectTo: 'Principal/avisos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
