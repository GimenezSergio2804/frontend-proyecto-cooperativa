import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root',
})
export class CalleService {
  private apiUrl = GLOBAL.url + 'calle/';

  constructor(private _http: HttpClient) {}

  getCalles(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this._http.get<any>(this.apiUrl + 'obtener-calles/', { params });
  }

  crearCalle(nombre: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this._http.post(
      this.apiUrl + 'crear-calle',
      { nombre },
      { headers }
    );
  }
}
