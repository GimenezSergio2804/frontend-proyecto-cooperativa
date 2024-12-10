import { Component, OnInit } from '@angular/core';
import { ReparacionesService } from 'src/app/services/reparaciones.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CalleService } from 'src/app/services/calle.service';
import { CuadrillaService } from 'src/app/services/cuadrilla.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-reparacion',
  templateUrl: './editar-reparacion.component.html',
  styleUrls: ['./editar-reparacion.component.css'],
})
export class EditarReparacionComponent implements OnInit {
  reparacion: any;
  calles: any[] = [];
  cuadrillas: any[] = [];

  constructor(
    private cuadrillaService: CuadrillaService,
    private calleServica: CalleService,
    private reparacionesService: ReparacionesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerReparacion(id);
    }
    this.obtenerCalles();
    this.obtenerCuadrillas();
  }

  obtenerCuadrillas(): void {
    this.cuadrillaService.obtenerCuadrillas().subscribe({
      next: (data) => {
        console.log('Cuadrillas obtenidas:', data);
        this.cuadrillas = data; // Suponiendo que el servicio devuelve un objeto con un array de cuadrillas
        console.log(this.cuadrillas);
      },
      error: (err) => {
        console.error('Error al obtener cuadrillas:', err);
      },
    });
  }
  /**
   * Obtiene la reparación por ID.
   */
  obtenerReparacion(id: string): void {
    this.reparacionesService.getReparacionById(id).subscribe({
      next: (data) => {
        this.reparacion = data;
        console.log('Reparación:', this.reparacion);
      },
      error: (err) => {
        console.error('Error al obtener reparación:', err);
        this.reparacion = undefined;
      },
    });
  }

  /**
   * Obtiene las calles disponibles.
   */
  obtenerCalles(): void {
    this.calleServica.obtenerCallesSP().subscribe({
      next: (data) => {
        console.log('Calles obtenidas:', data);
        this.calles = data.calles;
        console.log(this.calles);
      },
      error: (err) => {
        console.error('Error al obtener calles:', err);
      },
    });
  }

  /**
   * Actualiza la reparación.
   */
  actualizar(form: any): void {
    if (form.valid) {
      this.reparacionesService.updateReparacion(this.reparacion).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Reparación actualizada!',
            text: 'La reparación se ha actualizado correctamente.',
          });
          this.router.navigate(['/dashboard/reparaciones']);
        },
        error: (err) => {
          console.error('Error al actualizar reparación:', err);
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Ocurrió un error al actualizar la reparación.',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¡Atención!',
        text: 'Por favor, completa todos los campos requeridos.',
      });
    }
  }
}
