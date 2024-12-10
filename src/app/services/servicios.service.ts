import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  private apiUrl = GLOBAL.url + 'servicio/';

  constructor(private http: HttpClient) {}

  // Método para obtener el token del localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  crearServicio(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}crear-servicio`, data);
  }

  listarServicios(): Observable<any> {
    return this.http.get(`${this.apiUrl}obtener-servicios`);
  }

  eliminarServicio(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}eliminar-servicio/${id}`);
  }

  getServicio(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}obtener-servicioId/${id}`);
  }

  // Actualizar un servicio

  updateServicio(id: string, datos: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}actualizar-servicio/${id}`, datos);
  }
}
