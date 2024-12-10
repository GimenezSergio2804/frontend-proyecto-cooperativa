import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { InstalacionesService } from 'src/app/services/instalaciones.service';
import { CalleService } from 'src/app/services/calle.service';
import { CuadrillaService } from 'src/app/services/cuadrilla.service';
import { NodosService } from 'src/app/services/nodos.service';
import { PlanService } from 'src/app/services/planes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-instalaciones',
  templateUrl: './editar-instalaciones.component.html',
  styleUrls: ['./editar-instalaciones.component.css'],
})
export class EditarInstalacionesComponent implements OnInit {
  instalacion: any;
  calles: any[] = [];
  cuadrillas: any[] = [];
  nodos: any[] = [];
  planes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instalacionesService: InstalacionesService,
    private callesService: CalleService,
    private cuadrillasService: CuadrillaService,
    private nodosService: NodosService,
    private planesService: PlanService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.obtenerInstalacion(id);
      this.obtenerCalles();
      this.obtenerCuadrillas();
      this.obtenerNodos();
      this.obtenerPlanes();
    }
  }

  obtenerInstalacion(id: string): void {
    this.instalacionesService.obtenerPorId(id).subscribe(
      (data) => {
        this.instalacion = data.instalacion;
        if (this.instalacion && this.instalacion.direccion) {
          // Asegurarse de que direccion esté inicializado
          this.instalacion.direccion = this.instalacion.direccion || {};
          this.instalacion.direccion.calle = this.instalacion.direccion.calle
            ? this.instalacion.direccion.calle._id
            : null;
          this.instalacion.direccion.entrecalle1 =
            this.instalacion.direccion.entrecalle1 || {};
          this.instalacion.direccion.entrecalle2 =
            this.instalacion.direccion.entrecalle2 || {};
        }
        console.log(this.instalacion);
      },
      (error) => {
        console.error('Error al obtener la instalación:', error);
      }
    );
  }

  obtenerCalles(): void {
    this.callesService.obtenerCallesSP().subscribe(
      (data) => {
        this.calles = data.calles;
        console.log(this.calles);
      },
      (error) => {
        console.error('Error al obtener las calles:', error);
      }
    );
  }

  obtenerCuadrillas(): void {
    this.cuadrillasService.obtenerCuadrillas().subscribe(
      (data) => {
        this.cuadrillas = data;
        console.log(this.cuadrillas);
      },
      (error) => {
        console.error('Error al obtener las cuadrillas:', error);
      }
    );
  }

  obtenerNodos(): void {
    this.nodosService.obtenerNodos().subscribe(
      (data: any) => {
        this.nodos = data;
        console.log(this.nodos);
      },
      (error) => {
        console.error('Error al obtener los nodos:', error);
      }
    );
  }

  obtenerPlanes(): void {
    this.planesService.obtenerPlanes().subscribe(
      (data: any) => {
        this.planes = data;
        console.log(this.planes);
      },
      (error) => {
        console.error('Error al obtener los planes:', error);
      }
    );
  }

  actualizar(form: any): void {
    if (form.valid) {
      this.instalacionesService
        .actualizar(this.instalacion._id, this.instalacion)
        .subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Instalación actualizada',
              text: 'Los datos se han guardado correctamente.',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              this.router.navigate(['/dashboard/instalaciones']);
            });
          },
          (error) => {
            console.error('Error al actualizar la instalación:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al actualizar la instalación. Intenta nuevamente.',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        );
    }
  }
}
