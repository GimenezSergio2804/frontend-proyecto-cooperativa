import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CtosRoutingModule } from './ctos-routing.module';
import { EditarCtosComponent } from './editar-ctos/editar-ctos/editar-ctos.component';
import { CrearCtosComponent } from './crear-ctos/crear-ctos/crear-ctos.component';
import { CtosMainComponent } from './ctos-main/ctos-main/ctos-main.component';


@NgModule({
  declarations: [
    EditarCtosComponent,
    CrearCtosComponent,
    CtosMainComponent
  ],
  imports: [
    CommonModule,
    CtosRoutingModule
  ]
})
export class CtosModule { }
