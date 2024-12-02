import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from 'src/app/services/planes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-planes',
  templateUrl: './editar-planes.component.html',
  styleUrls: ['./editar-planes.component.css'],
})
export class EditarPlanesComponent implements OnInit {
  plan = {
    nombre: '',
    velocidadBajada: '',
    velocidadSubida: '',
    valor: '',
  };
  cargando = false;
  planId!: string; // ID del plan a actualizar

  constructor(
    private planService: PlanService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del plan desde la ruta
    this.planId = this.route.snapshot.paramMap.get('id') || '';
    this.cargarPlan();
  }

  // Cargar datos del plan actual
  cargarPlan(): void {
    if (!this.planId) return;

    this.planService.obtenerPlanPorId(this.planId).subscribe({
      next: (plan) => {
        this.plan = plan; // Asignar los datos del plan
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar el plan',
          text:
            err.error?.message ||
            'No se pudo cargar el plan. Intenta nuevamente.',
        });
        this.router.navigate(['/dashboard/planes']); // Redirige si hay error
      },
    });
  }

  // Función para actualizar el plan
  actualizar(updateForm: any): void {
    if (updateForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.',
      });
      return;
    }

    this.cargando = true;

    this.planService.actualizarPlan(this.planId, this.plan).subscribe({
      next: () => {
        this.cargando = false;
        Swal.fire({
          icon: 'success',
          title: '¡Plan actualizado!',
          text: 'Los cambios se han guardado exitosamente.',
          timer: 1500, // Tiempo en milisegundos
          showConfirmButton: false,
        });
        setTimeout(() => {
          this.router.navigate(['/dashboard/planes']); // Redirige automáticamente
        }, 1500); // Mismo tiempo que el SweetAlert
      },
      error: (err) => {
        this.cargando = false;
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el plan',
          text:
            err.error?.message ||
            'Hubo un problema al procesar tu solicitud. Intenta nuevamente.',
        });
      },
    });
  }
}
