import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPlanesComponent } from './crear-planes/crear-planes/crear-planes.component';
import { EditarPlanesComponent } from './editar-planes/editar-planes/editar-planes.component';
import { PlanesMainComponent } from './planes-main/planes-main/planes-main.component';

const routes: Routes = [
  { path: '', component: PlanesMainComponent },
  { path: 'registro', component: CrearPlanesComponent },
  { path: ':id', component: EditarPlanesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanesRoutingModule {}
