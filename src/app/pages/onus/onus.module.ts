import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnusRoutingModule } from './onus-routing.module';
import { OnusMainComponent } from './onus-main/onus-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearOnusComponent } from './crear-onus/crear-onus/crear-onus.component';
import { EditarOnusComponent } from './editar-onus/editar-onus/editar-onus.component';

@NgModule({
  declarations: [OnusMainComponent, CrearOnusComponent, EditarOnusComponent],
  imports: [CommonModule, OnusRoutingModule, SharedModule],
})
export class OnusModule {}
