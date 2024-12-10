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

  getCalles(page: number = 1, limit: number = 10): Observable<any> {
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

  calle_obtener(id: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get(this.apiUrl + 'obtener-calleId/' + id, {
      headers: headers,
    });
  }

  calle_actualizar(id: any, data: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.put(this.apiUrl + 'actualizar-calle/' + id, data, {
      headers: headers,
    });
  }

  calle_eliminar(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.delete(this.apiUrl + 'eliminar-calle/' + id, {
      headers: headers,
    });
  }

  obtenerCallesSP(): Observable<any> {
    return this._http.get<any>(this.apiUrl + 'obtenerCallesSP');
  }
}
