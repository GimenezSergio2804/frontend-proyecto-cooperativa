import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PagosService } from 'src/app/services/pagos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-pago',
  templateUrl: './crear-pagos.component.html',
  styleUrls: ['./crear-pagos.component.css'],
})
export class CrearPagosComponent implements OnInit {
  cargando = false;
  pago = {
    nombre: '',
    dni: '',
    contacto: '',
    codigo_de_transaccion: '',
    email: '',
    medio_de_pago: 'Efectivo',
    monto: '20000',
    estado: false,
    fecha: '', // Esta será la fecha automática
  };

  constructor(private pagoService: PagosService, private router: Router) {}

  ngOnInit(): void {
    // Establecemos la fecha automática al momento de iniciar el componente
    this.pago.fecha = this.todayDate();
  }

  // Método para obtener la fecha actual en formato yyyy-mm-dd
  todayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Ejemplo: "2024-12-03"
  }

  registro(registroForm: NgForm): void {
    if (registroForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.',
      });
      return;
    }

    this.cargando = true;
    this.pagoService.crearPago(this.pago).subscribe({
      next: () => {
        this.cargando = false;
        Swal.fire({
          icon: 'success',
          title: '¡Pago creado!',
          text: 'El pago se ha creado exitosamente.',
          timer: 1500,
          showConfirmButton: false, // Oculta el botón de "OK"
          willClose: () => {
            // Redirige a la página de pagos una vez se cierre el Swal
            this.router.navigate(['/dashboard/pagos']);
          },
        });
      },
      error: (err) => {
        this.cargando = false;
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el pago',
          text:
            err.error?.message ||
            'Hubo un problema al procesar tu solicitud. Intenta nuevamente.',
          confirmButtonColor: '#d33',
        });
      },
    });
  }
}
