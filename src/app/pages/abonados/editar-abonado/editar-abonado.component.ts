import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-abonado',
  templateUrl: './editar-abonado.component.html',
  styleUrls: ['./editar-abonado.component.css'],
})
export class EditarAbonadoComponent implements OnInit {
  abonado: any = {};
  abonadoId: string | null = null;

  constructor(private _route: Router) {}

  ngOnInit(): void {
    // this.abonadoId = this._route.snapshot.paramMap.get('id');
    // if (this.abonadoId) {
    //   // Si el ID existe, significa que estamos editando
    //   this.abonadoService.getAbonado(this.abonadoId).subscribe((data) => {
    //     this.abonado = data;
    //   });
    // }
  }

  onSubmit() {}
}
