import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { AbonadosService } from 'src/app/services/abonados.service';
import { NodosService } from 'src/app/services/nodos.service';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css'],
})
export class CrearServicioComponent implements OnInit {
  pagoSeleccionado: string | null = null;
  servicio = {
    abonado: '',
    tipo: '',
    nodo: '',
    activo: false,
  };
  abonados: any[] = [];
  nodos: any[] = [];
  pagos: any[] = [];
  isGratuito: boolean = false;

  constructor(
    private servicioService: ServiciosService,
    private router: Router,
    private abonadoService: AbonadosService,
    private nodoService: NodosService,
    private pagoService: PagosService
  ) {}

  ngOnInit(): void {
    this.obtenerPagosEstadoFalse();
    this.obtenerAbonados();
    this.obtenerNodos();
  }

  obtenerPagosEstadoFalse() {
    this.pagoService.obtenerPagosEstadoFalse().subscribe(
      (response: any) => {
        this.pagos = response;
      },
      (error) => {
        console.error('Error al obtener los pagos:', error);
      }
    );
  }

  obtenerAbonados() {
    // Llamada al servicio para obtener abonados
    this.abonadoService.getAbonados().subscribe((data) => {
      this.abonados = data;
      console.log(this.abonados);
    });
  }

  obtenerNodos() {
    // Llamada al servicio para obtener nodos
    this.nodoService.obtenerNodos().subscribe((data) => {
      this.nodos = data;
    });
  }

  crearServicio(form: any) {
    if (form.valid) {
      this.servicioService.crearServicio(this.servicio).subscribe(
        () => {
          alert('Servicio creado exitosamente');
          this.router.navigate(['/dashboard/servicios']);
        },
        (error) => {
          alert('Error al crear servicio');
          console.error(error);
        }
      );
    }
  }

  toggleGratuito() {
    if (this.isGratuito) {
      this.pagoSeleccionado = null; // Resetear el pago cuando es gratuito
    }
  }
}
