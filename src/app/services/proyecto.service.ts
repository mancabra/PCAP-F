import { Injectable } from '@angular/core';
import {Proyecto} from "../models/proyecto";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, Subject, throwError} from "rxjs";
import {ProyectoDto} from "../models/dto/proyecto-dto";
import {Gestor} from "../models/gestor";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private urlEndPoint: string = "http://localhost:8090/api";
  private $proyectoSeleccionado = new Subject<any>();

  constructor(private _http: HttpClient) {
  }

  // Consultar gestores
    public getGestores(): Observable<Gestor[]> {
        return this._http.get<Gestor[]>(this.urlEndPoint + "/gestores")
        .pipe(catchError(this.handleError));
    }

  // Consultar proyectos
  public getProyectos(): Observable<Proyecto[]> {
    return this._http.get<Proyecto[]>(this.urlEndPoint + "/proyectos")
      .pipe(catchError(this.handleError));
  }

  // Buscar proyecto por ID
  public getProyecto(id: number): Observable<Proyecto> {
    return this._http.get<Proyecto>(this.urlEndPoint + "/proyecto/" + id)
      .pipe(catchError(this.handleError));
  }

  // Guardar proyecto
  public guardar(proyecto: ProyectoDto): Observable<ProyectoDto> {
    return this._http.post<ProyectoDto>(this.urlEndPoint + "/proyecto", proyecto)
      .pipe(catchError(this.handleError));
  }

  // Actualizar proyecto
  public actualizar(id: number, proyecto: ProyectoDto): Observable<ProyectoDto> {
    return this._http.put<ProyectoDto>(this.urlEndPoint + "/proyecto/" + id, proyecto)
      .pipe(catchError(this.handleError));
  }

  // Eliminar proyecto
  public eliminar(id: number): Observable<Proyecto> {
    return this._http.delete<Proyecto>(this.urlEndPoint + "/proyecto/" + id)
      .pipe(catchError(this.handleError));
  }

  // Seleccionar proyecto
  public seleccionar(proyecto: any): void {
    this.$proyectoSeleccionado.next(proyecto);
  }

  // Obtener proyecto seleccionado
  public getProyectoSeleccionado(): Observable<any> {
    return this.$proyectoSeleccionado.asObservable();
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
        })
        break;
      case 400:
        Swal.fire({
          icon: 'error',
          title: '¡Solicitud incorrecta!',
          text: 'Por favor, verifique e intente de nuevo',
        })
        break;
      case 404:
        Swal.fire({
          icon: 'error',
          title: '¡No encontrado!',
          text: 'El proyecto no existe en la base de datos',
        })
        break;
      case 500:
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'El gestor ya está asignado o el proyecto ya existe en la base de datos'
        })
        break;
    }

    return throwError(() => new Error("Ha ocurrido un problema; intente más tarde."));
  }
}
