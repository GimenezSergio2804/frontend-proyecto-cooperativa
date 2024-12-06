import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearServicioComponent } from './crear-servicio/crear-servicio.component';
import { EditarServicioComponent } from './editar-servicio/editar-servicio.component';
import { ServicioMainComponent } from './servicio-main/servicio-main.component';

const routes: Routes = [
  { path: '', component: ServicioMainComponent },
  { path: 'registro', component: CrearServicioComponent },
  { path: ':id', component: EditarServicioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosRoutingModule {}
