import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { InstalacionesRoutingModule } from './instalaciones-routing.module';
import { InstalacionesMainComponent } from './instalaciones-main/instalaciones-main.component';
import { EditarInstalacionesComponent } from './editar-instalaciones/editar-instalaciones.component';

@NgModule({
  declarations: [InstalacionesMainComponent, EditarInstalacionesComponent],
  imports: [
    CommonModule,
    InstalacionesRoutingModule,
    FormsModule,
    NgbPaginationModule,
  ],
})
export class InstalacionesModule {}
