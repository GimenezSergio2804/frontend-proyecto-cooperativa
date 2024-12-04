import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NodosService {
  private apiUrl = GLOBAL.url + 'nodo';

  constructor(private _http: HttpClient) {}

  // Obtener todos los pagos
  obtenerNodos(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl + '/obtener-nodos');
  }

  crearNodo(nombre: string): Observable<any> {
    const headers = { 'Content-Type': 'application/json' };
    return this._http.post(
      this.apiUrl + '/crear-nodo',
      { nombre },
      { headers }
    );
  }

  nodo_obtener(id: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get(this.apiUrl + '/obtener-nodoId/' + id, {
      headers: headers,
    });
  }

  nodo_actualizar(id: any, data: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.put(this.apiUrl + '/actualizar-nodo/' + id, data, {
      headers: headers,
    });
  }

  nodo_eliminar(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.delete(this.apiUrl + '/eliminar-nodo/' + id, {
      headers: headers,
    });
  }
}
