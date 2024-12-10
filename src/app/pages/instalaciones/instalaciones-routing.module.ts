import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstalacionesMainComponent } from './instalaciones-main/instalaciones-main.component';
import { EditarInstalacionesComponent } from './editar-instalaciones/editar-instalaciones.component';

const routes: Routes = [
  { path: '', component: InstalacionesMainComponent },
  { path: ':id', component: EditarInstalacionesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstalacionesRoutingModule {}
