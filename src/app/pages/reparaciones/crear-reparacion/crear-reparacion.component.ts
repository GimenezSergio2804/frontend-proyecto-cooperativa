import { Component, OnInit } from '@angular/core';
import { ReparacionesService } from 'src/app/services/reparaciones.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { CuadrillaService } from 'src/app/services/cuadrilla.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-reparacion',
  templateUrl: './crear-reparacion.component.html',
  styleUrls: ['./crear-reparacion.component.css'],
})
export class CrearReparacionComponent implements OnInit {
  reparacion = {
    servicio: '',
    descripcion: '',
    prioridad: 'baja', // Valor por defecto
    cuadrillaAsignada: '',
    comentarios: '',
  };

  servicios: any[] = [];
  cuadrillas: any[] = [];

  constructor(
    private reparacionService: ReparacionesService,
    private servicioService: ServiciosService,
    private cuadrillaService: CuadrillaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener lista de servicios
    this.servicioService.listarServicios().subscribe(
      (data: any[]) => {
        this.servicios = data;
        console.log(this.servicios);
      },
      (error) => {
        console.error('Error al obtener los servicios', error);
      }
    );

    // Obtener lista de cuadrillas
    this.cuadrillaService.obtenerCuadrillas().subscribe(
      (data: any[]) => {
        this.cuadrillas = data;
      },
      (error) => {
        console.error('Error al obtener las cuadrillas', error);
      }
    );
  }

  crearReparacion(createForm: any): void {
    this.reparacionService.crearReparacion(this.reparacion).subscribe(
      (response) => {
        console.log('Reparación creada con éxito:', response);
        // Redirigir o mostrar mensaje de éxito
        this.router.navigate(['/dashboard/reparaciones']);
      },
      (error) => {
        console.error('Error al crear reparación:', error);
        // Manejo de error
      }
    );
  }
}
