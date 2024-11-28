import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonadosService } from 'src/app/services/abonados.service';
import { CalleService } from 'src/app/services/calle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms'; // tener en cuenta para mas adelante, formularios reactivos
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs'; // con esto manejo multiples observables, los traigo al mismo tiempo
// import { NgForm } from '@angular/forms'; // no lo use, mas adelante con interfaces

@Component({
  selector: 'app-editar-abonado',
  templateUrl: './editar-abonado.component.html',
  styleUrls: ['./editar-abonado.component.css'],
})
export class EditarAbonadoComponent implements OnInit {
  abonado: any = {};
  abonadoId: string | null = null;
  calles: any[] = [];
  idAbonado!: string;

  page = 1;
  limit = 10;
  totalCalles = 0;

  constructor(
    public _router: Router,
    private _route: ActivatedRoute,
    private _calleService: CalleService,
    private _abonadoService: AbonadosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.idAbonado = this._route.snapshot.paramMap.get('id') || '';
    forkJoin([
      this._calleService.getCalles(this.page, this.limit),
      this._abonadoService.obtenerAbonadoPorId(this.idAbonado),
    ]).subscribe({
      next: ([callesData, abonadoData]) => {
        this.calles = callesData.calles; // Calles disponibles
        this.totalCalles = callesData.total; // Total de calles
        this.abonado = abonadoData; // Datos del abonado
        console.log('Abonado cargado:', this.abonado);
        console.log('Calles cargadas:', this.calles);
      },
      error: (err) => console.error('Error al cargar datos:', err),
    });
  }

  actualizar(updateForm: any) {
    if (updateForm.valid) {
      const updatedData = updateForm.value; // Obtener los datos del formulario
      const abonadoId = this.idAbonado; // Obtener el ID del abonado

      this._abonadoService.actualizarAbonado(abonadoId, updatedData).subscribe({
        next: (response) => {
          console.log('Abonado actualizado con éxito:', response);
          Swal.fire({
            title: '¡Éxito!',
            text: response.mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });

          this._router.navigate(['/dashboard/abonados']);
        },
        error: (err) => {
          console.error('Error al actualizar abonado:', err);
          Swal.fire({
            title: '¡Error!',
            text: err.mensajeError, // ver si me lo toma
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
    } else {
      console.error('El formulario no es válido');
      Swal.fire({
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  cargarCalles() {
    this._calleService.getCalles(this.page, this.limit).subscribe({
      next: (data) => {
        console.log('Calles obtenidas:', data);
        this.calles = data.calles; // Guardamos las calles obtenidas
        this.totalCalles = data.total; // Total de calles disponibles
      },
      error: (err) => console.error('Error al obtener calles:', err),
    });
  }

  obtenerAbonado() {
    this._abonadoService.obtenerAbonadoPorId(this.idAbonado).subscribe({
      next: (data) => {
        this.abonado = data;
      },
      error: (err) => console.error('Error al obtener el abonado:', err),
    });
  }
}
