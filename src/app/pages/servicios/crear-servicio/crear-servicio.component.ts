import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'src/app/services/servicios.service';
import { AbonadosService } from 'src/app/services/abonados.service';
import { NodosService } from 'src/app/services/nodos.service';
import { PagosService } from 'src/app/services/pagos.service';
import { CalleService } from 'src/app/services/calle.service';
import { PlanService } from 'src/app/services/planes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.component.html',
  styleUrls: ['./crear-servicio.component.css'],
})
export class CrearServicioComponent implements OnInit {
  // Referencia al modal de abonado
  @ViewChild('modalAbonado') modalAbonado!: ElementRef;

  // Variables de estado y datos
  pagoSeleccionado: string | null = null;
  isGratuito: boolean = false;

  // Listas de datos
  planes: any[] = [];
  abonados: any[] = [];
  nodos: any[] = [];
  pagos: any[] = [];
  calles: any[] = [];

  // Datos del nuevo abonado
  nuevoAbonado = {
    nombres: '',
    apellidos: '',
    dni: null,
    mail: '',
    contacto: '',
  };

  // Datos del servicio
  servicio = {
    tipo: '',
    abonado: '',
    nodo: '',
    activo: false,
    plan: '',
    direccion: {
      calle: '',
      numeracion: '',
      entrecalle1: '',
      entrecalle2: '',
    },
    referencias: '',
  };

  // direccion temporal
  direccion = { calle: '', numeracion: '', entrecalle1: '', entrecalle2: '' };

  abonadoSeleccionado: string = '';

  constructor(
    private servicioService: ServiciosService,
    private router: Router,
    private abonadoService: AbonadosService,
    private nodoService: NodosService,
    private pagoService: PagosService,
    private callesService: CalleService,
    private planesService: PlanService
  ) {}

  ngOnInit(): void {
    this.obtenerPagosEstadoFalse();
    this.obtenerAbonados();
    this.obtenerNodos();
    this.cargarCalles();
    this.obtenerPlanes();
  }

  // Métodos para obtener datos
  obtenerPlanes() {
    this.planesService.obtenerPlanes().subscribe(
      (response: any) => {
        this.planes = response || [];
      },
      (error) => console.error('Error al obtener los planes:', error)
    );
  }

  obtenerPagosEstadoFalse() {
    this.pagoService.obtenerPagosEstadoFalse().subscribe(
      (response: any) => {
        this.pagos = response;
      },
      (error) => console.error('Error al obtener los pagos:', error)
    );
  }

  obtenerAbonados() {
    this.abonadoService.getAbonados().subscribe(
      (data) => {
        this.abonados = data;
        console.log(this.abonados);
      },
      (error) => console.error('Error al obtener los abonados:', error)
    );
  }

  obtenerNodos() {
    this.nodoService.obtenerNodos().subscribe(
      (data) => {
        this.nodos = data;
      },
      (error) => console.error('Error al obtener los nodos:', error)
    );
  }

  cargarCalles() {
    this.callesService.obtenerCallesSP().subscribe(
      (response: any) => {
        this.calles = response.calles || [];
      },
      (error) => console.error('Error al cargar las calles:', error)
    );
  }

  // Métodos relacionados con el abonado
  abrirModalAbonado() {
    const modal = this.modalAbonado.nativeElement;
    modal.style.display = 'block';
    modal.classList.add('show');
  }

  cerrarModalAbonado() {
    const modal = this.modalAbonado.nativeElement;
    modal.style.display = 'none';
    modal.classList.remove('show');

    // Resetear formulario del abonado
    this.nuevoAbonado = {
      nombres: '',
      apellidos: '',
      dni: null,
      mail: '',
      contacto: '',
    };
  }

  crearAbonado() {
    if (
      !this.nuevoAbonado.nombres ||
      !this.nuevoAbonado.apellidos ||
      !this.nuevoAbonado.dni ||
      !this.nuevoAbonado.contacto
    ) {
      console.error('Faltan datos para crear el abonado');
      return;
    }

    this.abonadoService.crearAbonado(this.nuevoAbonado).subscribe(
      (data) => {
        console.log('Abonado creado:', data);
        this.obtenerAbonados();
        this.cerrarModalAbonado();
      },
      (error) => console.error('Error al crear abonado:', error)
    );
  }

  // Métodos relacionados con el servicio
  crearServicio(form: any) {
    if (form.valid) {
      // Asignar el valor del abonado seleccionado
      this.servicio.abonado = this.abonadoSeleccionado;
      console.log(this.servicio);
      this.servicioService.crearServicio(this.servicio).subscribe(
        () => {
          Swal.fire({
            title: 'Éxito',
            text: 'Servicio creado exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.router.navigate(['/dashboard/servicios']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Error al crear servicio',
            icon: 'error',
            confirmButtonText: 'Cerrar',
          });
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

  trackById(index: number, item: any): string {
    return item._id; // Utiliza el _id como identificador único
  }
}
