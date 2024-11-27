import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallesComponent } from './calles.component';
import { CrearCalleComponent } from './crear-calle/crear-calle.component';
import { EditarCalleComponent } from './editar-calle/editar-calle.component';

const routes: Routes = [
  { path: '', component: CallesComponent },
  { path: 'registro', component: CrearCalleComponent },
  { path: ':id', component: EditarCalleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallesRoutingModule {}
