import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReparacionesRoutingModule } from './reparaciones-routing.module';
import { ReparacionesMainComponent } from './reparaciones-main/reparaciones-main.component';
import { EditarReparacionComponent } from './editar-reparacion/editar-reparacion.component';
import { CrearReparacionComponent } from './crear-reparacion/crear-reparacion.component';

@NgModule({
  declarations: [
    ReparacionesMainComponent,
    EditarReparacionComponent,
    CrearReparacionComponent,
  ],
  imports: [CommonModule, ReparacionesRoutingModule, FormsModule],
})
export class ReparacionesModule {}
