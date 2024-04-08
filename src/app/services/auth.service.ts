import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioUrl = 'http://localhost:8090/api';

  loginStatus = new Subject<boolean>();

  constructor(private _http: HttpClient) {}

  //obtener el token
  authUsuario(loginData: any): Observable<Object> {
    return this._http.post(`${this.usuarioUrl}/login`, loginData);
  }

  //iniciar sesión y guardar el token
  loginUsuario(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  setUsuario(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUsuario(): any {
    let usuario = localStorage.getItem('user');
    if (usuario != null) {
      return JSON.parse(usuario);
    } else {
      this.cerrarSesion();
      return null;
    }
  }

  getRole() {
    let user = this.getUsuario();
    return user.perfil;
  }

  usuarioLogeado(): boolean {
    let authToken = localStorage.getItem('token');
    if (authToken == null || authToken == null || authToken == '') {
      return false;
    } else {
      return true;
    }
  }

  usuarioActual() {
    return this._http.get(`${this.usuarioUrl}/auth`);
  }

  //cerrar sesion
  cerrarSesion(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
}
