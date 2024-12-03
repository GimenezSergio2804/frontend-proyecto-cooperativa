import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuadrillasRoutingModule } from './cuadrillas-routing.module';
import { CrearCuadrillaComponent } from './crear-cuadrilla/crear-cuadrilla.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CrearCuadrillaComponent],
  imports: [
    CommonModule,
    CuadrillasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CuadrillasModule {}
