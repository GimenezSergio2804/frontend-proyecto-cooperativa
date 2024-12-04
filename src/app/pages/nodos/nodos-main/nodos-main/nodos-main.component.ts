import { Component, OnInit } from '@angular/core';
import { NodosService } from 'src/app/services/nodos.service';
import Swal from 'sweetalert2';

declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-nodos-main',
  templateUrl: './nodos-main.component.html',
  styleUrls: ['./nodos-main.component.css'],
})
export class NodosMainComponent implements OnInit {
  nodos: any[] = []; // Todas las calles cargadas del backend
  load_data = true; // Bandera para mostrar el spinner de carga

  constructor(private nodoService: NodosService) {}

  ngOnInit(): void {
    this.obtenerNodos();
  }
  obtenerNodos(): void {
    this.load_data = true; // Mostrar el spinner mientras obtenemos los datos
    this.nodoService.obtenerNodos().subscribe(
      (response) => {
        this.nodos = response; // Aquí obtenemos las calles
        this.load_data = false; // Desactivamos el spinner
      },
      (error) => {
        console.error('Error al obtener las calles:', error);
        this.load_data = false; // Desactivamos el spinner en caso de error
      }
    );
  }

  eliminar(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este nodo será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.load_data = true; // Mostrar carga mientras se elimina el plan
        this.nodoService.nodo_eliminar(id).subscribe({
          next: () => {
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: 'success',
              title: '¡Nodo eliminado!',
              text: 'El nodo ha sido eliminado exitosamente.',
              timer: 1500, // Tiempo del mensaje
              showConfirmButton: false,
            }).then(() => {
              // Recargar los planes de nuevo después de la eliminación
              this.obtenerNodos();
            });
          },
          error: (err) => {
            // Mostrar error si falla la eliminación
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text:
                err.error?.message ||
                'No se pudo eliminar el nodo. Intenta nuevamente.',
            });
            this.load_data = false; // Desactivar carga si hay error
          },
        });
      }
    });
  }
}
