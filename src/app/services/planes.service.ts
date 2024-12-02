import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private apiUrl = GLOBAL.url + 'plan';

  constructor(private http: HttpClient) {}

  // Obtener todos los planes
  obtenerPlanes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/obtener-planes`);
  }

  // Obtener un plan por ID
  obtenerPlanPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/obtener-planId/${id}`);
  }

  // Crear un nuevo plan
  crearPlan(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear-plan`, data);
  }

  // Actualizar un plan
  actualizarPlan(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/actualizar-plan/${id}`, data);
  }

  // Eliminar un plan
  eliminarPlan(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/eliminar-plan/${id}`);
  }
}
