import { Injectable } from '@angular/core';
import { GLOBAL } from './GLOBAL';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InstalacionesService {
  private apiUrl = GLOBAL.url + 'instalacion';

  constructor(private http: HttpClient) {}

  obtenerInstalaciones() {
    return this.http.get<any[]>(`${this.apiUrl}/obtener-instalacionesActivas`);
  }

  obtenerPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtener-instalacionId/${id}`);
  }

  eliminarInstalacion(id: string) {
    return this.http.delete(`${this.apiUrl}/eliminar-instalacion/${id}`);
  }

  actualizar(id: string, datos: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/actualizar-instalacion/${id}`,
      datos
    );
  }
}
