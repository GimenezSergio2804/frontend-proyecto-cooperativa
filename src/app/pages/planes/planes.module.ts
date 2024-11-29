import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlanesRoutingModule } from './planes-routing.module';
import { PlanesMainComponent } from './planes-main/planes-main/planes-main.component';
import { EditarPlanesComponent } from './editar-planes/editar-planes/editar-planes.component';
import { CrearPlanesComponent } from './crear-planes/crear-planes/crear-planes.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PlanesMainComponent,
    EditarPlanesComponent,
    CrearPlanesComponent,
  ],
  imports: [
    CommonModule,
    PlanesRoutingModule,
    NgbPaginationModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class PlanesModule {}
