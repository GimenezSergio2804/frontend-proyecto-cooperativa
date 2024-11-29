import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { PagosMainComponent } from './pagos-main/pagos-main/pagos-main.component';
import { EditarPagosComponent } from './editar-pagos/editar-pagos/editar-pagos.component';
import { CrearPagosComponent } from './crear-pagos/crear-pagos/crear-pagos.component';


@NgModule({
  declarations: [
    PagosMainComponent,
    EditarPagosComponent,
    CrearPagosComponent
  ],
  imports: [
    CommonModule,
    PagosRoutingModule
  ]
})
export class PagosModule { }
