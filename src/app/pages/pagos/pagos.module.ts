import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { PagosRoutingModule } from './pagos-routing.module';
import { PagosMainComponent } from './pagos-main/pagos-main/pagos-main.component';
import { EditarPagosComponent } from './editar-pagos/editar-pagos/editar-pagos.component';
import { CrearPagosComponent } from './crear-pagos/crear-pagos/crear-pagos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PagosMainComponent, EditarPagosComponent, CrearPagosComponent],
  imports: [
    CommonModule,
    PagosRoutingModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PagosModule {}
