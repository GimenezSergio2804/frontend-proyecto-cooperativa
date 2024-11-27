import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbonadosService } from 'src/app/services/abonados.service';
import { CalleService } from 'src/app/services/calle.service';

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
    private _abonadoService: AbonadosService
  ) {
    this._router = _router;
  }

  ngOnInit(): void {
    this.idAbonado = this._route.snapshot.paramMap.get('id') || '';
    this.obtenerAbonado();
    this.cargarCalles();
  }

  cargarCalles() {
    this._calleService.getCalles(this.page, this.limit).subscribe({
      next: (data) => {
        console.log('Calles obtenidas:', data); // Puedes verificar que se reciben correctamente
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

  guardarCambios() {
    this._abonadoService
      .actualizarAbonado(this.idAbonado, this.abonado)
      .subscribe({
        next: () => {
          alert('Abonado actualizado con éxito');
          this._router.navigate(['dashboard/abonados']);
        },
        error: (err) => console.error('Error al actualizar abonado:', err),
      });
  }

  onSubmit() {}
}
