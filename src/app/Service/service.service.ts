import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Irregularidad } from '../models/irregularidad';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  Url='http://localhost:8090/api/';

  obtenerIrregularidades(){
    return this.http.get<Irregularidad[]>(this.Url+'obtenerIrregularidades');
  }

  crearIrregularidad(irregularidad:Irregularidad){
    return this.http.post<Irregularidad>(this.Url+'crearIrregularidad',irregularidad)
  }

  editar(irregularidad:Irregularidad){
    return this.http.put<Irregularidad>(this.Url+'modificarIrregularidad',irregularidad)
  }

  eliminar(id:number){
    return this.http.get<any>(this.Url+'eliminarIrregularidadPorId/'+id)
  }
  obtenerPorTramite(id:number){
    return this.http.get<Irregularidad[]>(this.Url+'obtenerIrregularidadesPorTramite/'+id);
  }
  obtenerTamitesPorIdProyecto(id:number){
return this.http.get<any[]>(this.Url+'obtenerTramitesPorIdProyecto/'+id);
  }

}

