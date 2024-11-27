import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url + 'usuario/';
  }

  login_usuario(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', data, {
      headers: headers,
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  obtener_usuarios(): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get(this.url + 'obtener-usuarios', {
      headers: headers,
    });
  }

  crear_usuario(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + 'crear-usuario', data, {
      headers: headers,
    });
  }

  obtener_usuario_id(id: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get(this.url + 'obtener-usuario/' + id, {
      headers: headers,
    });
  }

  actualizar_usuario(id: any, data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.put(this.url + 'actualizar-usuario/' + id, data, {
      headers: headers,
    });
  }

  eliminar_usuario(id: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.delete(this.url + 'eliminar-usuario/' + id, {
      headers: headers,
    });
  }
}
