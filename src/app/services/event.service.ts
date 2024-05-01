import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:8090/api/calendario';

  constructor(private _http: HttpClient) {}

  public saveEvent(event: any, id: number): Observable<any> {
    return this._http.post<any>(`${this.baseUrl}/${id}`, event);
  }

  public getEvents(id: number): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/${id}`);
  }

  public updateEvent(event: any, id: number): Observable<any> {
    return this._http.put<any>(`${this.baseUrl}/${id}`, event);
  }

  public deleteEvent(id: number): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
