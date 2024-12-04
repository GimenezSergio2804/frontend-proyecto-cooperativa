import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Para redirigir después de crear la calle
import { NgForm } from '@angular/forms'; // Para usar el formulario en el template
import Swal from 'sweetalert2';
import { NodosService } from 'src/app/services/nodos.service';

@Component({
  selector: 'app-crear-nodos',
  templateUrl: './crear-nodos.component.html',
  styleUrls: ['./crear-nodos.component.css'],
})
export class CrearNodosComponent implements OnInit {
  nombre: string = '';
  constructor(private _nodoService: NodosService, private _router: Router) {}

  ngOnInit(): void {}

  registro(form: NgForm): void {
    if (form.valid) {
      this._nodoService.crearNodo(this.nombre).subscribe(
        (response) => {
          // SweetAlert para éxito con temporizador automático
          Swal.fire({
            icon: 'success',
            title: 'Nodo creado con éxito',
            text: `El nodo "${response.nodoNuevo.nombre}" ha sido creado correctamente.`,
            showConfirmButton: false, // Sin botón de confirmación
            timer: 1500, // Duración del SweetAlert
          });

          // Redirigir después de que el SweetAlert termine
          setTimeout(() => {
            this._router.navigate(['/dashboard/nodos']);
          }, 1500);
        },
        (error) => {
          console.error('Error al crear el nodo', error);
          // SweetAlert para error con temporizador automático
          Swal.fire({
            icon: 'error',
            title: 'Error al crear el nodo',
            text: 'Ocurrió un problema al intentar crear el nodo. Por favor, inténtelo de nuevo.',
            showConfirmButton: false, // Sin botón de confirmación
            timer: 1500, // Duración del SweetAlert
          });
        }
      );
    } else {
      // SweetAlert para formulario inválido con temporizador automático
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos obligatorios antes de enviar.',
        showConfirmButton: false, // Sin botón de confirmación
        timer: 1500, // Duración del SweetAlert
      });
    }
  }
}
