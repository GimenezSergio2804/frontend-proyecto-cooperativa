import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearPagosComponent } from './crear-pagos/crear-pagos/crear-pagos.component';
import { EditarPagosComponent } from './editar-pagos/editar-pagos/editar-pagos.component';
import { PagosMainComponent } from './pagos-main/pagos-main/pagos-main.component';

const routes: Routes = [
  { path: '', component: PagosMainComponent },
  { path: 'registro', component: CrearPagosComponent },
  { path: ':id', component: EditarPagosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosRoutingModule {}
