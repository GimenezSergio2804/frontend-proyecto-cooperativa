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

  crearAbonado(data: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, data);
  }

  getAbonados(): Observable<any> {
    return this._http.get(`${this.apiUrl}` + 'obtener-abonados');
  }

  deleteAbonado(id: string): Observable<any> {
    return this._http.delete(`${this.apiUrl}/${id}`);
  }

  eliminarAbonado(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerAbonados(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }

  actualizarAbonado(id: string, data: any): Observable<any> {
    return this._http.put(`${this.apiUrl}` + `actualizar-abonado/${id}`, data);
  }

  obtenerAbonadoPorId(id: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}` + `obtener-abonadoId/${id}`);
  }
  buscarAbonadoPorNombreApellido(
    nombre?: string,
    apellido?: string
  ): Observable<any> {
    let params = new HttpParams();
    if (nombre) params = params.set('nombre', nombre);
    if (apellido) params = params.set('apellido', apellido);

    return this._http.get(`${this.apiUrl}/buscar`, { params });
  }
}
