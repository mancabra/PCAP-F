import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TramiteDto } from '../models/dto/tramiteDto';
import { TipoPrioridad } from '../models/tipoPrioridad';
import { TramiteRegistro } from '../models/tramiteRegistro';

@Injectable({
  providedIn: 'root',
})
export class TramiteService {
  private urlEndPoint: string = 'http://localhost:8090/api';
  $tramiteSeleccionado: Subject<any> = new Subject<any>();

  constructor(private _http: HttpClient) {}

  getTramites(id_gestor: any): Observable<TramiteDto[]> {
    return this._http.get<TramiteDto[]>(this.urlEndPoint + '/tramites/'+id_gestor);
  }

  seleccionar(tramite: any) {
    this.$tramiteSeleccionado.next(tramite);
  }

  getPrestadorSeleccionado() {
    return this.$tramiteSeleccionado.asObservable();
  }

  guardar(tramite: TramiteRegistro) {
    return this._http.post<TramiteDto>(this.urlEndPoint + '/tramites', tramite);
  }

  actualizar(id: number, tramite: TramiteRegistro) {
    return this._http.put<TramiteDto>(
      this.urlEndPoint + `/tramites/${id}`,
      tramite
    );
  }

  eliminar(id: number) {
    return this._http.delete(this.urlEndPoint + `/tramites/${id}`);
  }

  getPrioridades(): Observable<any> {
    return this._http.get<TipoPrioridad>(this.urlEndPoint + '/prioridades');
  }
}
