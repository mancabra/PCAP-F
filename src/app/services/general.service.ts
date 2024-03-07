import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Window } from './entity/window';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  GeneralLink: string = "http://localhost:8090";

  private window$ = new Subject<Window>();
  window: Window = new Window;
  constructor(private _http: HttpClient,) { }


  logIn(UserDTO: any) {
    const ruta = this.GeneralLink + "/inicioDeSesion";
    console.log(UserDTO);
    return this._http.post(ruta, UserDTO).toPromise();
  }

  logSecurity(UserDTO: any){
    return this._http.get("http://localhost:8090/v1/LogIn?mail=" +UserDTO.correo  +"&pass=" + UserDTO.password).toPromise();
  }

  obtenerLista(){
    return this._http.get("http://localhost:8090/v1/obtenerLista").toPromise();
  }

  // OBSERVABLES GENERALES

  getWindow(): Observable<Window> {
    return this.window$.asObservable();
  }

  windowUpdate(window: Window) {
    setTimeout(() =>{
      this.window$.next(window);
    }, 200);

  }

  // funcion para cerrar una sesión despues de un tiempo
  closeSession(){
    setTimeout(() =>{
      localStorage.setItem('logged', 'false');
    }, 10000);
  }
}
