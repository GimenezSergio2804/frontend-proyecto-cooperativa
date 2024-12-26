import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private apiUrl = GLOBAL.url + 'pago';

  constructor(private http: HttpClient) {}

  // Obtener todos los pagos
  obtenerPagos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/obtener-pagos');
  }

  obtenerPagosEstadoFalsePaginado(
    page: number,
    pageSize: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/estado/falsepaginado`, {
      params,
    });
  }

  obtenerPagosEstadoTruePaginado(
    page: number,
    pageSize: number
  ): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<any>(`${this.apiUrl}/estado/true`, { params });
  }

  // Crear un nuevo pago
  crearPago(pago: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/crear-pago', pago);
  }

  // Actualizar un pago
  actualizarPago(pago: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/actualizar-pago/${pago._id}`,
      pago
    );
  }

  // Cambiar estado de pago a true
  cambiarEstadoPago(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/estado`, { estado: true });
  }

  // Eliminar un pago
  eliminarPago(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar-pago/${id}`);
  }

  // Obtener un pago específico
  obtenerPago(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtener-pagoId/${id}`);
  }

  obtenerPagosEstadoFalse(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtener-pagos-estado-false`);
  }
}
