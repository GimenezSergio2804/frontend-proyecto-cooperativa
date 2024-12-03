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

  // Crear cuadrilla
  crearCuadrilla(cuadrilla: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear-cuadrilla`, cuadrilla);
  }

  obtenerCuadrillas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/obtener-cuadrillas');
  }

  eliminarTecnicoDeCuadrilla(
    tecnicoId: string,
    cuadrillaId: string
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/cuadrilla/${cuadrillaId}/tecnicos/${tecnicoId}`
    );
  }

  eliminarCuadrilla(id: any) {}
}
