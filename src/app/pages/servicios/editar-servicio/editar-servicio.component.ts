import { Component, OnInit } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css'],
})
export class EditarServicioComponent implements OnInit {
  // Variable para almacenar los datos del servicio a editar
  servicio: any = {
    tipo: '',
    pago: '',
    contactos: '',
    coordenadas: {
      latitud: null,
      longitud: null,
    },
    direccion: {
      calle: '',
      numeracion: '',
      entrecalle1: '',
      entrecalle2: '',
    },
    abonado: '',
    plan: '',
    activo: true,
    fecha_creacion: '',
    idGestar: 0,
    nodo: '',
  };

  constructor(
    private servicioService: ServiciosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.obtenerServicio(id);
  }

  obtenerServicio(id: any): void {
    this.servicioService.getServicio(id).subscribe(
      (data) => {
        this.servicio = data;

        console.log(this.servicio);
      },
      (error) => {
        console.error('Error al obtener el servicio:', error);
      }
    );
  }

  updateServicio(form: any): void {
    if (form.valid) {
      this.servicioService
        .updateServicio(this.servicio._id, this.servicio)
        .subscribe(
          (response) => {
            // Mostrar un SweetAlert de éxito
            Swal.fire({
              icon: 'success',
              title: '¡Actualización exitosa!',
              text: 'El servicio se actualizó correctamente.',
              confirmButtonText: 'Aceptar',
            }).then(() => {
              // Redirigir después de cerrar la alerta
              this.router.navigate(['/dashboard/servicios']);
            });
          },
          (error) => {
            // Mostrar un SweetAlert de error
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Hubo un error al actualizar el servicio. Intente nuevamente.',
              confirmButtonText: 'Aceptar',
            });
            console.error('Error al actualizar la instalación:', error);
          }
        );
    } else {
      // Mostrar un SweetAlert de advertencia si el formulario es inválido
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
