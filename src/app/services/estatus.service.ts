import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EstatusTramite} from "../models/estatus-tramite";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EstatusService {
  urlEndPoint: string = "http://localhost:8080/";

  constructor(private _http: HttpClient) { }

  getEstatus(): Observable<EstatusTramite> {
    return this._http.get<EstatusTramite>(this.urlEndPoint + "estatus/1");
  }
}
