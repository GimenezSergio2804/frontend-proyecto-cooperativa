import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-abonado',
  templateUrl: './crear-abonado.component.html',
  styleUrls: ['./crear-abonado.component.css'],
})
export class CrearAbonadoComponent implements OnInit {
  abonado: any = {};
  calles: any = [];
  constructor() {}

  ngOnInit(): void {}

  registro(registroForm: any) {
    if (registroForm.valid) {
    } else {
      // Manejo de formulario inválido
      Swal.fire({
        icon: 'error',
        text: 'Todos los campos son obligatorios',
      });
    }
  }
}
