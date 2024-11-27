import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root',
})
export class AbonadosService {
  private apiUrl = GLOBAL.url + 'abonado/';
  constructor(private _http: HttpClient) {}

  getAbonados(): Observable<any> {
    return this._http.get(`${this.apiUrl}` + 'obtener-abonados');
  }

  deleteAbonado(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

  eliminarAbonado(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
