import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbonadosService } from 'src/app/services/abonados.service'; // Servicio para los abonados
import { CalleService } from 'src/app/services/calle.service'; // Servicio para las calles
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-abonado',
  templateUrl: './crear-abonado.component.html',
  styleUrls: ['./crear-abonado.component.css'],
})
export class CrearAbonadoComponent implements OnInit {
  abonado: any = {
    nombres: '',
    apellidos: '',
    dni: '',
    mail: '',
    contacto: '',
  };

  constructor(
    private router: Router,
    private abonadosService: AbonadosService, // Servicio para manejar abonados
    private callesService: CalleService // Servicio para manejar calles
  ) {}

  ngOnInit(): void {
    // Cargar calles al inicializar el componente
  }

  registro(registroForm: any) {
    if (registroForm.valid) {
      this.abonadosService.crearAbonado(this.abonado).subscribe(
        (response: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Abonado creado',
            text: 'El abonado se creó correctamente.',
          }).then(() => {
            this.router.navigate(['/dashboard/abonados']);
          });
        },
        (error) => {
          console.error('Error al crear el abonado:', error);
          Swal.fire({
            icon: 'error',
            text: 'Hubo un error al crear el abonado.',
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Todos los campos son obligatorios.',
      });
    }
  }
}
