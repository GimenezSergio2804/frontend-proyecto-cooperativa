import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearNodosComponent } from './crear-nodos/crear-nodos/crear-nodos.component';
import { EditarNodosComponent } from './editar-nodos/editar-nodos/editar-nodos.component';
import { NodosMainComponent } from './nodos-main/nodos-main/nodos-main.component';

const routes: Routes = [
  { path: '', component: NodosMainComponent },
  { path: 'registro', component: CrearNodosComponent },
  { path: ':id', component: EditarNodosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NodosRoutingModule {}
