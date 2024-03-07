import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Irregularidad } from '../models/irregularidad';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  Url='http://localhost:8090/obtenerIrregularidades';

  obtenerIrregularidades(){
    return this.http.get<Irregularidad[]>('http://localhost:8090/api/obtenerIrregularidades');
  }

  crearIrregularidad(irregularidad:Irregularidad){
    return this.http.post<Irregularidad>('http://localhost:8090/api/crearIrregularidad',irregularidad)
  }

  editar(irregularidad:Irregularidad){
    return this.http.put<Irregularidad>('http://localhost:8090/api/modificarIrregularidad',irregularidad)
  }

  eliminar(id:number){
    return this.http.get<any>('http://localhost:8090/api/eliminarIrregularidadPorId/'+id)
  }
  obtenerPorTramite(id:number){
    return this.http.get<Irregularidad[]>('http://localhost:8090/api/obtenerIrregularidadesPorTramite/'+id);
  }
  obtenerTamitesPorIdProyecto(id:number){
return this.http.get<any[]>('http://localhost:8090/api/obtenerTramitesPorIdProyecto/'+id);
  }

}

