import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullCalendarModule } from '@fullcalendar/angular';
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
import { FormPrestadoresComponent } from './components/windows/prestadores/form-prestadores/form-prestadores.component';
import { ListaPrestadoresComponent } from './components/windows/prestadores/lista-prestadores/lista-prestadores.component';
import { PrestadoresComponent } from './components/windows/prestadores/prestadores.component';
import { PrincipalComponent } from './components/windows/principal/principal.component';
import { FormProyectosComponent } from './components/windows/proyectos/form-proyectos/form-proyectos.component';
import { ListaProyectosComponent } from './components/windows/proyectos/lista-proyectos/lista-proyectos.component';
import { ProyectosComponent } from './components/windows/proyectos/proyectos.component';
import { RegistroComponent } from './components/windows/registro/registro.component';
import { FormTramiteComponent } from './components/windows/tramite/form-tramite/form-tramite.component';
import { ListTramiteComponent } from './components/windows/tramite/list-tramite/list-tramite.component';
import { TramiteComponent } from './components/windows/tramite/tramite.component';
import { TramitesActivosComponent } from './components/windows/tramites-activos/tramites-activos.component';
import { authInterceptorProviders } from './interceptor/auth.interceptor';
import { PrestadorPipe } from './pipes/prestador.pipe';
import { TramitePipe } from './pipes/tramite.pipe';
import { PerfilPrestadorComponent } from './components/windows/perfil-prestador/perfil-prestador.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PrincipalComponent,
    GenerarComponent,
    TramitesActivosComponent,
    EstatusTramiteComponent,
    GestionPrestadoresComponent,
    ProyectosComponent,
    FormProyectosComponent,
    ListaProyectosComponent,
    PrestadoresComponent,
    FormPrestadoresComponent,
    ListaPrestadoresComponent,
    RegistroComponent,
    AddComponent,
    DeleteComponent,
    EditComponent,
    ListarComponent,
    TramiteComponent,
    FormTramiteComponent,
    ListTramiteComponent,
    TramitePipe,
    PrestadorPipe,
    PerfilPrestadorComponent,
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
    FullCalendarModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
