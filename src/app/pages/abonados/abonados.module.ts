import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AbonadosRoutingModule } from './abonados-routing.module';
import { AbonadosMainComponent } from './abonados-main/abonados-main.component';
import { EditarAbonadoComponent } from './editar-abonado/editar-abonado.component';
import { CrearAbonadoComponent } from './crear-abonado/crear-abonado.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AbonadosMainComponent,
    EditarAbonadoComponent,
    CrearAbonadoComponent,
  ],
  imports: [
    CommonModule,
    AbonadosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    RouterModule,
  ],
})
export class AbonadosModule {}
