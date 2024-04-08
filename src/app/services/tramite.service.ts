import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TramiteDto } from '../models/dto/tramiteDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TramiteService {
  private urlEndPoint: string = 'http://localhost:8090/api';

  constructor(private _http: HttpClient) {}

  getTramites(): Observable<TramiteDto[]> {
    return this._http.get<TramiteDto[]>(this.urlEndPoint + '/tramites');
  }
}
