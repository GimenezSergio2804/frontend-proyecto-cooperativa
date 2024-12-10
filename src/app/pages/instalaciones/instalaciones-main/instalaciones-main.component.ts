import { Component, OnInit } from '@angular/core';
import { InstalacionesService } from 'src/app/services/instalaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instalaciones-main',
  templateUrl: './instalaciones-main.component.html',
  styleUrls: ['./instalaciones-main.component.css'],
})
export class InstalacionesMainComponent implements OnInit {
  instalaciones: any[] = [];
  loading: boolean = true;
  page: number = 1;
  pageSize: number = 10;

  constructor(private instalacionService: InstalacionesService) {}

  ngOnInit(): void {
    this.obtenerInstalaciones();
  }

  obtenerInstalaciones() {
    this.instalacionService.obtenerInstalaciones().subscribe(
      (data: any) => {
        console.log(data);
        this.instalaciones = data.instalaciones;
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar instalaciones:', error);
        this.loading = false;
      }
    );
  }

  eliminarInstalacion(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.instalacionService.eliminarInstalacion(id).subscribe(
          () => {
            Swal.fire(
              'Eliminado',
              'La instalación ha sido eliminada.',
              'success'
            );
            this.instalaciones = this.instalaciones.filter(
              (inst) => inst._id !== id
            );
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar la instalación.', 'error');
          }
        );
      }
    });
  }
}
