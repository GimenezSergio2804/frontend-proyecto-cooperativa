import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalleService } from 'src/app/services/calle.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-calles',
  templateUrl: './calles.component.html',
  styleUrls: ['./calles.component.css'],
})
export class CallesComponent implements OnInit {
  calles: any[] = []; // Todas las calles cargadas del backend
  load_data = true; // Bandera para mostrar el spinner de carga
  page = 1; // Pagina actual
  pageSize = 5; // Número de elementos por página
  totalItems = 0; // Total de elementos de calles

  constructor(
    private _calleService: CalleService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCalles();
  }

  getCalles(): void {
    this.load_data = true; // Mostrar el spinner mientras obtenemos los datos
    this._calleService.getCalles(this.page, this.pageSize).subscribe(
      (response) => {
        this.calles = response.calles; // Aquí obtenemos las calles
        this.totalItems = response.totalItems; // Total de calles
        this.load_data = false; // Desactivamos el spinner
      },
      (error) => {
        console.error('Error al obtener las calles:', error);
        this.load_data = false; // Desactivamos el spinner en caso de error
      }
    );
  }

  // Método para manejar el cambio de página
  onPageChange(page: number): void {
    this.page = page;
    this.getCalles(); // Obtener las calles de la nueva página
  }

  eliminar(id: any) {
    this._calleService.calle_eliminar(id).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.mensaje,
          showConfirmButton: false,
          timer: 1500,
        });

        // Cerrar el modal
        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        // Recargar la lista de calles
        this.getCalles();
      },
      (error) => {
        console.error('Error al eliminar la calle:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar la calle. Por favor, inténtelo de nuevo.',
        });
      }
    );
  }
}
