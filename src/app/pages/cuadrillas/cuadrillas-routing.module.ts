import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCuadrillaComponent } from './crear-cuadrilla/crear-cuadrilla.component';

const routes: Routes = [{ path: '', component: CrearCuadrillaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuadrillasRoutingModule {}
