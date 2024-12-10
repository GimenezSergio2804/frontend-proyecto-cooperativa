import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReparacionesMainComponent } from './reparaciones-main/reparaciones-main.component';
import { CrearReparacionComponent } from './crear-reparacion/crear-reparacion.component';
import { EditarReparacionComponent } from './editar-reparacion/editar-reparacion.component';

const routes: Routes = [
  { path: '', component: ReparacionesMainComponent },
  { path: 'registro', component: CrearReparacionComponent },
  { path: ':id', component: EditarReparacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReparacionesRoutingModule {}
