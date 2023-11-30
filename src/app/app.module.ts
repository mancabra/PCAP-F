import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PrincipalComponent,
    GenerarComponent,
    TramitesActivosComponent,
    EstatusTramiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
