import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbonadosMainComponent } from './abonados-main/abonados-main.component';
import { CrearAbonadoComponent } from './crear-abonado/crear-abonado.component';
import { EditarAbonadoComponent } from './editar-abonado/editar-abonado.component';

const routes: Routes = [
  { path: '', component: AbonadosMainComponent },
  { path: 'registro', component: CrearAbonadoComponent },
  { path: ':id', component: EditarAbonadoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbonadosRoutingModule {}
