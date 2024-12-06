import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { EditarServicioComponent } from './editar-servicio/editar-servicio.component';
import { ServicioMainComponent } from './servicio-main/servicio-main.component';
import { CrearServicioComponent } from './crear-servicio/crear-servicio.component';

@NgModule({
  declarations: [
    EditarServicioComponent,
    ServicioMainComponent,
    CrearServicioComponent,
  ],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ServiciosModule {}
