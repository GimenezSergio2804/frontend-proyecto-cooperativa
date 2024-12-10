import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-main',
  templateUrl: './servicio-main.component.html',
  styleUrls: ['./servicio-main.component.css'],
})
export class ServicioMainComponent implements OnInit {
  servicios: any[] = []; // Array para almacenar los servicios
  load_data: boolean = true; // Control de carga de datos

  constructor(
    private servicioService: ServiciosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerServicios();
  }

  // Método para obtener los servicios
  obtenerServicios(): void {
    this.servicioService.listarServicios().subscribe(
      (response: any) => {
        console.log(response);
        this.servicios = response; // Asigna los datos obtenidos
        this.load_data = false; // Desactiva el estado de carga
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar servicios',
          text: 'No se pudieron cargar los servicios. Inténtalo de nuevo más tarde.',
        });
        console.error(error);
        this.load_data = false;
      }
    );
  }

  // Método para eliminar un servicio
  eliminar(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioService.eliminarServicio(id).subscribe(
          () => {
            // Actualiza la lista local eliminando el elemento con el id proporcionado
            this.servicios = this.servicios.filter(
              (servicio) => servicio._id !== id
            );

            // Muestra un mensaje de éxito
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'El servicio ha sido eliminado exitosamente.',
            });
          },
          (error) => {
            // Muestra un mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text: 'No se pudo eliminar el servicio. Inténtalo de nuevo.',
            });
            console.error(error);
          }
        );
      }
    });
  }
}
