import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReparacionesService {
  apiUrl = GLOBAL.url + 'reparacion';
  constructor(private http: HttpClient) {}

  getReparaciones(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/obtener-reparaciones');
  }

  eliminarReparacion(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar-reparacion/${id}`);
  }

  getReparacionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/obtener-reparacionId/${id}`);
  }

  updateReparacion(reparacion: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/actualizar-reparacion/${reparacion._id}`,
      reparacion
    );
  }

  crearReparacion(reparacion: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}` + '/crear-reparacion',
      reparacion
    );
  }
}
