import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagosService } from 'src/app/services/pagos.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-pagos',
  templateUrl: './editar-pagos.component.html',
  styleUrls: ['./editar-pagos.component.css'],
  providers: [DatePipe],
})
export class EditarPagosComponent implements OnInit {
  pago: any = {}; // Este objeto contendrá los datos del pago a editar
  load_data: boolean = false;

  constructor(
    private pagoService: PagosService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.obtenerPago();
  }

  // Función para obtener el pago que se está editando
  obtenerPago(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID del pago desde la URL
    if (id) {
      this.load_data = true;
      this.pagoService.obtenerPago(id).subscribe({
        next: (res) => {
          this.pago = res;
          // Formatear la fecha si es necesario
          this.pago.createdAtFormatted = this.datePipe.transform(
            this.pago.createdAt,
            'dd/MM/yyyy HH:mm'
          );
          this.load_data = false;
        },
        error: (err) => {
          console.error('Error al obtener el pago: ', err);
          this.load_data = false;
        },
      });
    }
  }

  // Función para guardar los cambios
  update(updateForm: any): void {
    this.load_data = true;
    this.pagoService.actualizarPago(this.pago).subscribe({
      next: () => {
        this.load_data = false;
        Swal.fire({
          icon: 'success',
          title: '¡Pago actualizado!',
          text: 'El pago se ha actualizado exitosamente.',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          this.router.navigate(['/dashboard/pagos']);
        });
      },
      error: (err) => {
        this.load_data = false;
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: err.error?.message || 'Hubo un problema al actualizar el pago.',
        });
      },
    });
  }
}
