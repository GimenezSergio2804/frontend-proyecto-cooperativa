import { Component, OnInit } from '@angular/core';
import { CuadrillaService } from 'src/app/services/cuadrilla.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-cuadrilla',
  templateUrl: './crear-cuadrilla.component.html',
  styleUrls: ['./crear-cuadrilla.component.css'],
})
export class CrearCuadrillaComponent implements OnInit {
  nombre: string = '';
  tipo: string = '';
  tiposCuadrilla: string[] = ['Instalacion', 'Reparacion', 'Plantel'];
  tecnicosDisponibles: any[] = [];
  tecnicosSeleccionados: any[] = [];
  cuadrillas: any[] = [];

  constructor(
    private cuadrillaService: CuadrillaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerTecnicosDisponibles();
    this.obtenerCuadrillas();
  }

  obtenerTecnicosDisponibles(): void {
    this.usuarioService.obtenerTecnicos().subscribe((data) => {
      this.tecnicosDisponibles = data;
    });
  }

  obtenerCuadrillas(): void {
    this.cuadrillaService.obtenerCuadrillas().subscribe((data) => {
      this.cuadrillas = data;
    });
  }

  asignarTecnico(tecnicoId: string): void {
    const tecnico = this.tecnicosDisponibles.find((t) => t._id === tecnicoId);
    if (tecnico) {
      this.tecnicosSeleccionados.push(tecnico);
      this.tecnicosDisponibles = this.tecnicosDisponibles.filter(
        (t) => t._id !== tecnicoId
      );
    }
  }

  eliminarTecnico(tecnicoId: string): void {
    const tecnico = this.tecnicosSeleccionados.find((t) => t._id === tecnicoId);
    if (tecnico) {
      this.tecnicosDisponibles.push(tecnico);
      this.tecnicosSeleccionados = this.tecnicosSeleccionados.filter(
        (t) => t._id !== tecnicoId
      );
    }
  }

  crearCuadrilla(event: Event): void {
    event.preventDefault();
    const cuadrilla = {
      nombre: this.nombre,
      tipo: this.tipo,
      tecnicos: this.tecnicosSeleccionados.map((t) => t._id),
    };
    console.log('Cuadrilla a crear:', cuadrilla);

    this.cuadrillaService.crearCuadrilla(cuadrilla).subscribe(() => {
      this.obtenerCuadrillas();
      this.nombre = '';
      this.tipo = '';
      this.tecnicosSeleccionados = [];
    });
  }
}
