import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RadiusRoutingModule } from './radius-routing.module';
import { CrearRadiusComponent } from './crear-radius/crear-radius/crear-radius.component';
import { EditarRadiusComponent } from './editar-radius/editar-radius/editar-radius.component';
import { RadiusMainComponent } from './radius-main/radius-main/radius-main.component';


@NgModule({
  declarations: [
    CrearRadiusComponent,
    EditarRadiusComponent,
    RadiusMainComponent
  ],
  imports: [
    CommonModule,
    RadiusRoutingModule
  ]
})
export class RadiusModule { }
