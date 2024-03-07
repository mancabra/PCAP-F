import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Proyecto} from "../models/proyecto";
import {Prestador} from "../models/prestador";

@Injectable({
  providedIn: 'root'
})
export class GestionService {
  urlEndPoint: string = "http://localhost:8090/api";
  $idPrestador: number = 0;
  $idTramite: number = 0;
  constructor(private _http: HttpClient) { }

  getProyectos(): Observable<Proyecto[]> {
    return this._http.get<Proyecto[]>(this.urlEndPoint + "/listaDeProyectos");
  }

  getProyecto(id: number): Observable<any> {
    return this._http.get<any>(this.urlEndPoint + "/buscarProyecto/" + id);
  }

  getPrestadores(): Observable<Prestador[]> {
    return this._http.get<Prestador[]>(this.urlEndPoint + "/prestadores");
  }

  getPrestador(id: number): Observable<Prestador> {
    return this._http.get<Prestador>(this.urlEndPoint + "/prestadores/" + id);
  }

  setPrestadorID(id: number) {
    this.$idPrestador = id;
  }

  getPrestadorID() {
    return this.$idPrestador;
  }
  getTramiteID(){
    return this.$idTramite;
  }
  setTramiteID(id:number){
    this.$idTramite = id;
  }
}
