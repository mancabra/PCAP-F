import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { PrestadorDto } from '../models/dto/prestador-dto';
import { PrestadorModel } from '../models/prestador.model';

@Injectable({
  providedIn: 'root',
})
export class PrestadorService {
  private urlEndPoint: string = 'http://localhost:8090/api';
  $prestadorSeleccionado: Subject<any> = new Subject<any>();
  constructor(private _http: HttpClient) {}

  getPrestadores(estado: string = 'CONTRATADO') {
    return this._http.get<PrestadorModel[]>(
      this.urlEndPoint + `/prestadores?estado=${estado}`
    );
  }

  getPrestador(id: number) {
    return this._http.get<PrestadorModel>(
      this.urlEndPoint + '/prestadores/' + id
    );
  }

  guardar(prestador: PrestadorDto) {
    return this._http.post<PrestadorModel>(
      this.urlEndPoint + '/prestadores',
      prestador
    );
  }

  actualizar(id: number, prestador: PrestadorDto) {
    return this._http.put<PrestadorModel>(
      this.urlEndPoint + `/prestadores/${id}`,
      prestador
    );
  }

  eliminar(id: number) {
    return this._http.delete(this.urlEndPoint + `/prestadores/${id}`);
  }

  seleccionar(prestador: any) {
    this.$prestadorSeleccionado.next(prestador);
  }

  getPrestadorSeleccionado() {
    return this.$prestadorSeleccionado.asObservable();
  }

  // Manejo de errores
  private handleError(error: any) {
    const status = error.status;
    switch (status) {
      case 0:
        Swal.fire({
          icon: 'error',
          title: '¡Oops!',
          text: 'Error de conexión con el servidor',
        });
        break;
      case 400:
        Swal.fire({
          icon: 'error',
          title: '¡Solicitud incorrecta!',
          text: 'Por favor, verifique e intente de nuevo',
        });
        break;
      case 404:
        Swal.fire({
          icon: 'error',
          title: '¡No encontrado!',
          text: 'El prestador no existe en la base de datos',
        });
        break;
      case 500:
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'El email ya se encuentra asignado a un prestador o no pertenece a infotec',
        });
        break;
    }

    return throwError(
      () => new Error('Ha ocurrido un problema; intente más tarde.')
    );
  }
}
