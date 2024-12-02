import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanService } from 'src/app/services/planes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-planes',
  templateUrl: './crear-planes.component.html',
  styleUrls: ['./crear-planes.component.css'],
})
export class CrearPlanesComponent implements OnInit {
  cargando = false;
  plan = {
    nombre: '',
    velocidadBajada: '',
    velocidadSubida: '',
    valor: '',
  };
  constructor(private planService: PlanService, private router: Router) {}

  ngOnInit(): void {}

  registro(registroForm: NgForm): void {
    if (registroForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.',
      });
      return;
    }

    Swal.fire({
      title: '¿Crear este plan?',
      text: 'Una vez creado, no podrás modificarlo fácilmente.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargando = true;
        this.planService.crearPlan(this.plan).subscribe({
          next: () => {
            this.cargando = false;
            Swal.fire({
              icon: 'success',
              title: '¡Plan creado!',
              text: 'El plan se ha creado exitosamente.',
              confirmButtonColor: '#3085d6',
            }).then(() => {
              // Redirige a la página de planes
              this.router.navigate(['/dashboard/planes']);
            });
          },
          error: (err) => {
            this.cargando = false;
            Swal.fire({
              icon: 'error',
              title: 'Error al crear el plan',
              text:
                err.error?.message ||
                'Hubo un problema al procesar tu solicitud. Intenta nuevamente.',
              confirmButtonColor: '#d33',
            });
          },
        });
      }
    });
  }
}
