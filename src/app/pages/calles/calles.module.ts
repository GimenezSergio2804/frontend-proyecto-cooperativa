import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CallesRoutingModule } from './calles-routing.module';
import { CallesComponent } from './calles-main/calles.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CrearCalleComponent } from './crear-calle/crear-calle.component';
import { EditarCalleComponent } from './editar-calle/editar-calle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CallesComponent, CrearCalleComponent, EditarCalleComponent],
  imports: [
    CommonModule,
    CallesRoutingModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class CallesModule {}
