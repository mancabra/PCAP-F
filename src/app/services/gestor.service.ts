import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { GestorDto } from '../models/dto/gestor-dto';
import { Gestor } from '../models/gestor';

@Injectable({
  providedIn: 'root',
})
export class GestorService {
  private urlEndPoint: string = 'http://localhost:8090/api';
  $gestorSeleccionado: Subject<any> = new Subject<any>();

  constructor(private _http: HttpClient) {}

  getGestores() {
    return this._http
      .get<Gestor[]>(this.urlEndPoint + '/gestores')
      .pipe(catchError(this.handleError));
  }

  getGestor(id: number) {
    return this._http
      .get<Gestor>(this.urlEndPoint + `/gestores/${id}`)
      .pipe(catchError(this.handleError));
  }

  guardar(gestor: GestorDto) {
    return this._http
      .post<GestorDto>(this.urlEndPoint + '/gestores', gestor)
      .pipe(catchError(this.handleError));
  }

  actualizar(id: number, gestor: GestorDto) {
    return this._http
      .put<GestorDto>(this.urlEndPoint + `/gestores/${id}`, gestor)
      .pipe(catchError(this.handleError));
  }

  eliminar(id: number) {
    return this._http
      .delete(this.urlEndPoint + `/gestores/${id}`)
      .pipe(catchError(this.handleError));
  }

  seleccionar(gestor: any) {
    this.$gestorSeleccionado.next(gestor);
  }

  getGestorSeleccionado() {
    return this.$gestorSeleccionado.asObservable();
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
          text: 'El gestor no existe en la base de datos',
        });
        break;
      case 500:
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'El email ya se encuentra asignado a un gestor o no pertenece a infotec',
        });
        break;
    }

    return throwError(
      () => new Error('Ha ocurrido un problema; intente más tarde.')
    );
  }
}
