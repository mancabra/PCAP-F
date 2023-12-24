import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  urlEndPoint: string = "http://localhost:8080/api";
  constructor(private _http: HttpClient) { }

  getProyectos(): Observable<any> {
    return this._http.get(this.urlEndPoint + "/listaDeProyectos");
  }

  getProyecto(id: number): Observable<any> {
    return this._http.get(this.urlEndPoint + "/buscarProyecto/" + id);
  }
}
