import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NodosRoutingModule } from './nodos-routing.module';
import { NodosMainComponent } from './nodos-main/nodos-main/nodos-main.component';
import { EditarNodosComponent } from './editar-nodos/editar-nodos/editar-nodos.component';
import { CrearNodosComponent } from './crear-nodos/crear-nodos/crear-nodos.component';


@NgModule({
  declarations: [
    NodosMainComponent,
    EditarNodosComponent,
    CrearNodosComponent
  ],
  imports: [
    CommonModule,
    NodosRoutingModule
  ]
})
export class NodosModule { }
