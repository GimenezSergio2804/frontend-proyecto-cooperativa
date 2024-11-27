import { Component, OnInit } from '@angular/core';
import { CalleService } from 'src/app/services/calle.service';
import { Router } from '@angular/router'; // Para redirigir después de crear la calle
import { NgForm } from '@angular/forms'; // Para usar el formulario en el template
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-calle',
  templateUrl: './crear-calle.component.html',
  styleUrls: ['./crear-calle.component.css'],
})
export class CrearCalleComponent implements OnInit {
  nombre: string = '';

  constructor(private _callesService: CalleService, private _router: Router) {}

  ngOnInit(): void {}

  registro(form: NgForm): void {
    if (form.valid) {
      this._callesService.crearCalle(this.nombre).subscribe(
        (response) => {
          console.log('Calle creada con éxito', response);
          this._router.navigate(['/dashboard/calles']);
        },
        (error) => {
          console.error('Error al crear la calle', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
