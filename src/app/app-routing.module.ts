import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PrincipalComponent } from './components/windows/principal/principal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GenerarComponent } from './components/windows/generar/generar.component';
import { TramitesActivosComponent } from './components/windows/tramites-activos/tramites-activos.component';
import { EstatusTramiteComponent } from './components/windows/estatus-tramite/estatus-tramite.component';
import {GestionTramitesComponent} from "./components/windows/gestion-tramites/gestion-tramites.component";
import { authGuard } from "./services/auth.guard";
import {GestionPrestadoresComponent} from "./components/windows/gestion-prestadores/gestion-prestadores.component";
import {GestionPrioridadComponent} from "./components/windows/gestion-prioridad/gestion-prioridad.component";
import {ProyectosComponent} from "./components/windows/proyectos/proyectos.component";
import {PrestadoresComponent} from "./components/windows/prestadores/prestadores.component";
import {GestoresComponent} from "./components/windows/gestores/gestores.component";
import {RegistroComponent} from "./components/windows/registro/registro.component";


const routes: Routes = [
  {path:"",redirectTo:'Principal/avisos',pathMatch:'full'},
  {path:'start',component:LoginComponent},
  {path:'Principal',
  canActivate:[authGuard] ,
  component: NavbarComponent,

    children: [
      { path: "avisos", component: PrincipalComponent },
      { path: "generar", component: RegistroComponent },
      { path: "tramites", component: TramitesActivosComponent  },
      { path: "proyectos", component: ProyectosComponent  },
      { path: "prestadores", component: PrestadoresComponent },
      { path: "gestores", component: GestoresComponent },
      { path: "calendario", component: GenerarComponent  },
      { path: "gestion/proyectos", component: GestionTramitesComponent },
      { path: "gestion/prestadores", component: GestionPrestadoresComponent },
      { path: "gestion/prioridad", component: GestionPrioridadComponent },
      //secundarias
      { path:'tramites/activos/proyecto/estatus',component:EstatusTramiteComponent},
  ],},
  {path:'**',redirectTo:'Principal/avisos',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
