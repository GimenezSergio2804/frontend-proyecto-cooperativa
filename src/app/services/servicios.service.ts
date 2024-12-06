import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private apiUrl = GLOBAL.url + 'servicio/';

  constructor(private http: HttpClient) {}

  crearServicio(servicio: any) {
    return this.http.post(`${this.apiUrl}crear-servicio`, servicio);
  }
}
