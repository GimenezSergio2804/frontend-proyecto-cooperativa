import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root',
})
export class CuadrillaService {
  private apiUrl = GLOBAL.url + 'cuadrilla';
  constructor(private http: HttpClient) {}

  // 1. Obtener todas las cuadrillas
  obtenerCuadrillas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener-cuadrillas`);
  }

  // 2. Crear una nueva cuadrilla
  crearCuadrilla(cuadrilla: {
    nombre: string;
    tipo: string;
    tecnicos: string[];
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-cuadrilla`, cuadrilla);
  }

  // 3. Eliminar una cuadrilla por ID
  eliminarCuadrilla(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar-cuadrilla/${id}`);
  }
}
