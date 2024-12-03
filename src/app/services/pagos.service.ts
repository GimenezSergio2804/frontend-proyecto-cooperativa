import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
