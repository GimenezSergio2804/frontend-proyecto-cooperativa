import { Component, OnInit } from '@angular/core';
import { ReparacionesService } from 'src/app/services/reparaciones.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reparaciones-main',
  templateUrl: './reparaciones-main.component.html',
  styleUrls: ['./reparaciones-main.component.css'],
})
export class ReparacionesMainComponent implements OnInit {
  reparaciones: any[] = [];
  load_data: boolean = true;

  constructor(
    private reparacionesService: ReparacionesService, // Servicio para obtener reparaciones
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarReparaciones();
  }

  cargarReparaciones() {
    this.reparacionesService.getReparaciones().subscribe(
      (data: any) => {
        this.reparaciones = data;
        console.log(this.reparaciones);
        this.load_data = false;
      },
      (error) => {
        console.error('Error al cargar las reparaciones', error);
        this.load_data = false;
      }
    );
  }

  eliminar(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta reparación será eliminada permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.reparacionesService.eliminarReparacion(id).subscribe(
          () => {
            // Filtra la reparación eliminada de la lista
            this.reparaciones = this.reparaciones.filter(
              (reparacion) => reparacion._id !== id
            );
            Swal.fire(
              'Eliminado!',
              'La reparación ha sido eliminada.',
              'success'
            );
          },
          (error) => {
            console.error('Error al eliminar la reparación', error);
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar la reparación.',
              'error'
            );
          }
        );
      }
    });
  }

  estaRetrasada(fechaSolicitud: Date): boolean {
    const fechaActual = new Date();

    // Normalizamos la fecha actual (ponemos la hora a las 00:00:00)
    fechaActual.setHours(0, 0, 0, 0);

    const fechaSolicitudDate = new Date(fechaSolicitud);

    // Normalizamos la fecha de solicitud (ponemos la hora a las 00:00:00)
    fechaSolicitudDate.setHours(0, 0, 0, 0);

    // Verificamos si la fecha de solicitud es válida
    if (isNaN(fechaSolicitudDate.getTime())) {
      console.log('Fecha inválida');
      return false; // Si la fecha es inválida, no aplicamos el estilo
    }

    // Calculamos la diferencia en días
    const diferenciaEnMilisegundos =
      fechaActual.getTime() - fechaSolicitudDate.getTime();
    const diferenciaEnDias = diferenciaEnMilisegundos / (1000 * 3600 * 24); // Convierte milisegundos a días
    console.log('Diferencia en días:', diferenciaEnDias);

    // Si la diferencia es mayor a 3 días, la reparación está retrasada
    return diferenciaEnDias > 3;
  }
}
