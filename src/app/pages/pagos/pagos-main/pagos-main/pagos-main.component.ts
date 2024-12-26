import { Component, OnInit } from '@angular/core';
import { PagosService } from 'src/app/services/pagos.service';
import { DatePipe } from '@angular/common'; // Importa DatePipe
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagos-main',
  templateUrl: './pagos-main.component.html',
  styleUrls: ['./pagos-main.component.css'],
  providers: [DatePipe], // Añade DatePipe en los proveedores
})
export class PagosMainComponent implements OnInit {
  load_data: boolean = true;
  pagos: any[] = [];
  page: number = 1; // Página actual
  pageSize: number = 8; // Tamaño de la página
  totalPagos = 0;

  constructor(
    private pagoService: PagosService,
    private datePipe: DatePipe,
    private http: HttpClient
  ) {} // Inyectamos DatePipe

  ngOnInit(): void {
    this.obtenerPagos(); // Cargar los pagos al iniciar el componente
  }

  // Función para obtener los pagos desde el servidor
  obtenerPagos(): void {
    this.load_data = true; // Activar el estado de carga

    this.pagoService
      .obtenerPagosEstadoFalsePaginado(this.page, this.pageSize)
      .subscribe({
        next: (res) => {
          // Filtrar los pagos donde el estado es false y formatear la fecha
          this.pagos = res.pagos.map((pago: any) => ({
            ...pago,
            formattedDate: new Date(pago.createdAt).toLocaleString('es-AR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
          }));
          console.log('Respuesta del servidor:', res); // Verifica la respuesta
          this.totalPagos = res.totalPagos; // Asignar el total de pagos
          this.load_data = false; // Desactivar el estado de carga
        },
        error: (err) => {
          console.error('Error al obtener pagos: ', err);
          this.load_data = false; // Desactivar el estado de carga incluso si hay error
        },
      });
  }

  // Función para eliminar un pago
  eliminar(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este pago será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.load_data = true; // Mostrar carga mientras se elimina el pago
        this.pagoService.eliminarPago(id).subscribe({
          next: () => {
            // Mostrar mensaje de éxito
            Swal.fire({
              icon: 'success',
              title: '¡Pago eliminado!',
              text: 'El pago ha sido eliminado exitosamente.',
              timer: 1500, // Tiempo del mensaje
              showConfirmButton: false,
            }).then(() => {
              // Recargar los pagos de nuevo después de la eliminación
              this.obtenerPagos();
            });
          },
          error: (err) => {
            // Mostrar error si falla la eliminación
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar',
              text:
                err.error?.message ||
                'No se pudo eliminar el pago. Intenta nuevamente.',
            });
            this.load_data = false; // Desactivar carga si hay error
          },
        });
      }
    });
  }

  descargarComprobante(pago: any): void {
    // API para obtener el comprobante como PDF
    const url = `http://localhost:3000/api/pago/comprobante/${pago._id}`;
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = `comprobante-${pago.nombre}-${pago.dni}.pdf`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }

  // Cambiar la página cuando se navega
  onPageChange(newPage: number): void {
    this.page = newPage;
    this.obtenerPagos();
  }
}
