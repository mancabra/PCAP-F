import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';

import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddComponent } from './Irregularidad/add/add.component';
import { DeleteComponent } from './Irregularidad/delete/delete.component';
import { EditComponent } from './Irregularidad/edit/edit.component';
import { ListarComponent } from './Irregularidad/listar/listar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EstatusTramiteComponent } from './components/windows/estatus-tramite/estatus-tramite.component';
import { GenerarComponent } from './components/windows/generar/generar.component';
import { GestionPrestadoresComponent } from './components/windows/gestion-prestadores/gestion-prestadores.component';
import { GestionPrioridadComponent } from './components/windows/gestion-prioridad/gestion-prioridad.component';
import { GestionTramitesComponent } from './components/windows/gestion-tramites/gestion-tramites.component';
import { FormGestoresComponent } from './components/windows/gestores/form-gestores/form-gestores.component';
import { GestoresComponent } from './components/windows/gestores/gestores.component';
import { ListaGestoresComponent } from './components/windows/gestores/lista-gestores/lista-gestores.component';
import { FormPrestadoresComponent } from './components/windows/prestadores/form-prestadores/form-prestadores.component';
import { ListaPrestadoresComponent } from './components/windows/prestadores/lista-prestadores/lista-prestadores.component';
import { PrestadoresComponent } from './components/windows/prestadores/prestadores.component';
import { PrincipalComponent } from './components/windows/principal/principal.component';
import { FormProyectosComponent } from './components/windows/proyectos/form-proyectos/form-proyectos.component';
import { ListaProyectosComponent } from './components/windows/proyectos/lista-proyectos/lista-proyectos.component';
import { ProyectosComponent } from './components/windows/proyectos/proyectos.component';
import { RegistroComponent } from './components/windows/registro/registro.component';
import { TramitesActivosComponent } from './components/windows/tramites-activos/tramites-activos.component';
import { authInterceptorProviders } from './interceptor/auth.interceptor';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PrincipalComponent,
    GenerarComponent,
    TramitesActivosComponent,
    EstatusTramiteComponent,
    GestionTramitesComponent,
    GestionPrestadoresComponent,
    GestionPrioridadComponent,
    ProyectosComponent,
    FormProyectosComponent,
    ListaProyectosComponent,
    PrestadoresComponent,
    FormPrestadoresComponent,
    ListaPrestadoresComponent,
    GestoresComponent,
    FormGestoresComponent,
    ListaGestoresComponent,
    RegistroComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    ListarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }, authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
