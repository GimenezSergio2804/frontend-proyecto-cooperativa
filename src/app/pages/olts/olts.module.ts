import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OltsRoutingModule } from './olts-routing.module';
import { OltsMainComponent } from './olts-main/olts-main/olts-main.component';
import { CrearOltsComponent } from './crear-olts/crear-olts/crear-olts.component';
import { EditarOltsComponent } from './editar-olts/editar-olts/editar-olts.component';


@NgModule({
  declarations: [
    OltsMainComponent,
    CrearOltsComponent,
    EditarOltsComponent
  ],
  imports: [
    CommonModule,
    OltsRoutingModule
  ]
})
export class OltsModule { }
