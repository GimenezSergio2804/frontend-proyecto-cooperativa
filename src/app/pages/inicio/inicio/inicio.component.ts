import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  instalaciones: number = 0;
  reparaciones: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos(): void {
    this.http.get<any>(GLOBAL.url + 'servicio/fibra_datos').subscribe(
      (data) => {
        this.instalaciones = data.instalaciones;
        this.reparaciones = data.reparaciones;
      },
      (error) => {
        console.error('Error al obtener datos de fibra óptica:', error);
      }
    );
  }
}
