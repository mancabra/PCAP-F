import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './components/windows/principal/principal.component';
import { GenerarComponent } from './components/windows/generar/generar.component';
import { TramitesActivosComponent } from './components/windows/tramites-activos/tramites-activos.component';
import { EstatusTramiteComponent } from './components/windows/estatus-tramite/estatus-tramite.component';
import { GestionTramitesComponent } from './components/windows/gestion-tramites/gestion-tramites.component';
import { GestionPrestadoresComponent } from './components/windows/gestion-prestadores/gestion-prestadores.component';
import { GestionPrioridadComponent } from './components/windows/gestion-prioridad/gestion-prioridad.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { NgxPaginationModule } from "ngx-pagination";
import { ProyectosComponent } from './components/windows/proyectos/proyectos.component';
import { FormProyectosComponent } from './components/windows/proyectos/form-proyectos/form-proyectos.component';
import { ListaProyectosComponent } from './components/windows/proyectos/lista-proyectos/lista-proyectos.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PrestadoresComponent } from './components/windows/prestadores/prestadores.component';
import { FormPrestadoresComponent } from './components/windows/prestadores/form-prestadores/form-prestadores.component';
import { ListaPrestadoresComponent } from './components/windows/prestadores/lista-prestadores/lista-prestadores.component';
import { GestoresComponent } from './components/windows/gestores/gestores.component';
import { FormGestoresComponent } from './components/windows/gestores/form-gestores/form-gestores.component';
import { ListaGestoresComponent } from './components/windows/gestores/lista-gestores/lista-gestores.component';
import { RegistroComponent } from './components/windows/registro/registro.component';
import { AddComponent } from './Irregularidad/add/add.component';
import { DeleteComponent } from './Irregularidad/delete/delete.component';
import { EditComponent } from './Irregularidad/edit/edit.component';
import { ListarComponent } from './Irregularidad/listar/listar.component';

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
    FormsModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
