import { Component, OnInit } from '@angular/core';
import { CuadrillaService } from 'src/app/services/cuadrilla.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cuadrilla',
  templateUrl: './crear-cuadrilla.component.html',
  styleUrls: ['./crear-cuadrilla.component.css'],
})
export class CrearCuadrillaComponent implements OnInit {
  cuadrillas: any[] = [];
  tecnicos: any[] = [];
  nuevaCuadrilla = {
    nombre: '',
    tipo: '',
    tecnicos: [],
  };

  constructor(
    private cuadrillaService: CuadrillaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.cargarCuadrillas();
    this.cargarTecnicosActivos();
  }

  cargarCuadrillas() {
    this.cuadrillaService.obtenerCuadrillas().subscribe(
      (data) => {
        this.cuadrillas = data;
      },
      (error) => {
        console.error('Error al cargar cuadrillas:', error);
      }
    );
  }

  cargarTecnicosActivos() {
    this.usuarioService.obtenerTecnicosActivos().subscribe(
      (data) => {
        if (data.length === 0) {
          console.log('No hay técnicos activos disponibles');
          this.tecnicos = []; // O manejar el caso según sea necesario (mostrar un mensaje en la UI, etc.)
        } else {
          this.tecnicos = data;
        }
      },
      (error) => {
        // Verificar si el error es un 404 (No hay técnicos activos)
        if (error.status === 404) {
          console.log('No hay técnicos activos disponibles');
          this.tecnicos = []; // O manejar el caso según sea necesario
        } else {
          console.error('Error al cargar técnicos activos:', error);
        }
      }
    );
  }

  crearCuadrilla() {
    if (
      !this.nuevaCuadrilla.nombre ||
      !this.nuevaCuadrilla.tipo ||
      !this.nuevaCuadrilla.tecnicos.length
    ) {
      Swal.fire(
        'Advertencia',
        'Por favor, completa todos los campos.',
        'warning'
      );
      return;
    }

    this.cuadrillaService.crearCuadrilla(this.nuevaCuadrilla).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Cuadrilla creada correctamente.', 'success');
        this.cargarCuadrillas(); // Recargar cuadrillas
        this.cargarTecnicosActivos(); // Recargar la lista de técnicos disponibles
        this.nuevaCuadrilla = { nombre: '', tipo: '', tecnicos: [] }; // Resetear el formulario
      },
      (error) => {
        Swal.fire('Error', 'No se pudo crear la cuadrilla.', 'error');
        console.error('Error al crear cuadrilla:', error);
      }
    );
  }

  eliminarCuadrilla(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuadrillaService.eliminarCuadrilla(id).subscribe(
          () => {
            Swal.fire(
              'Eliminada',
              'La cuadrilla fue eliminada con éxito.',
              'success'
            );
            // Recargar las cuadrillas y los técnicos disponibles después de eliminar
            this.cargarCuadrillas();
            this.cargarTecnicosActivos(); // Recargar la lista de técnicos
            if (this.cuadrillas.length === 1) {
              this.cuadrillas = []; // Si era la última, limpiar la tabla
            }
          },
          (error) => {
            Swal.fire('Error', 'No se pudo eliminar la cuadrilla.', 'error');
            console.error('Error al eliminar cuadrilla:', error);
          }
        );
      }
    });
  }
}
