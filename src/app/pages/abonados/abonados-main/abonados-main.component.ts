import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AbonadosService } from 'src/app/services/abonados.service';

@Component({
  selector: 'app-abonados-main',
  templateUrl: './abonados-main.component.html',
  styleUrls: ['./abonados-main.component.css'],
})
export class AbonadosMainComponent implements OnInit {
  abonados: any[] = []; // Lista de abonados
  load_data: boolean = true; // Para mostrar el loader mientras se cargan los datos
  page: number = 1; // Página actual
  pageSize: number = 10; // Número de items por página

  constructor(
    private _abonadosService: AbonadosService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadAbonados();
  }

  loadAbonados() {
    this._abonadosService.getAbonados().subscribe(
      (data) => {
        this.abonados = data; // Asigna los datos obtenidos
        this.load_data = false; // Deja de mostrar el loader
      },
      (error) => {
        console.error('Error al cargar abonados:', error);
        this.load_data = false; // Deja de mostrar el loader incluso si ocurre un error
      }
    );
  }

  eliminarAbonado(id: string) {
    if (confirm('¿Estás seguro de eliminar este abonado?')) {
      this._abonadosService.eliminarAbonado(id).subscribe(
        () => {
          this.abonados = this.abonados.filter((abonado) => abonado._id !== id); // Elimina el abonado de la lista
        },
        (error) => {
          console.error('Error al eliminar el abonado:', error);
        }
      );
    }
  }
}
