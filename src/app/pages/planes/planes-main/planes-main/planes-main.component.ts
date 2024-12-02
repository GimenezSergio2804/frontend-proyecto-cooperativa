import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlanService } from 'src/app/services/planes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planes-main',
  templateUrl: './planes-main.component.html',
  styleUrls: ['./planes-main.component.css'],
})
export class PlanesMainComponent implements OnInit {
  load_data: boolean = true;
  planes: any[] = [];
  page: number = 1; // Página actual
  pageSize: number = 10; // Tamaño de la página

  constructor(private _http: HttpClient, private planService: PlanService) {}

  ngOnInit(): void {
    this.obtenerPlanes(); // Cargar los planes al iniciar el componente
  }

  // Función para obtener los planes desde el servidor
  obtenerPlanes(): void {
    this.load_data = true; // Activar el estado de carga

    this.planService.obtenerPlanes().subscribe({
      next: (res) => {
        this.planes = res; // Actualizar la lista de planes
        this.load_data = false; // Desactivar el estado de carga
      },
      error: (err) => {
        console.error('Error al obtener planes: ', err);
        this.load_data = false; // Desactivar el estado de carga incluso si hay error
      },
    });
  }

  // Función para eliminar un plan
  eliminar(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este plan será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.load_data = true; // Mostrar carga mientras se elimina el plan
        this.planService.eliminarPlan(id).subscribe({
          next: () => {
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: 'success',
              title: '¡Plan eliminado!',
              text: 'El plan ha sido eliminado exitosamente.',
              timer: 1500, // Tiempo del mensaje
              showConfirmButton: false,
            }).then(() => {
              // Recargar los planes de nuevo después de la eliminación
              this.obtenerPlanes();
            });
          },
          error: (err) => {
            // Mostrar error si falla la eliminación
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text:
                err.error?.message ||
                'No se pudo eliminar el plan. Intenta nuevamente.',
            });
            this.load_data = false; // Desactivar carga si hay error
          },
        });
      }
    });
  }
}
