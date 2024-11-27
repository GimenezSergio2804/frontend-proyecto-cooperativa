import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosMainComponent } from './usuarios-main/usuarios-main.component';
import { UsuariosRegistroComponent } from './usuarios-registro/usuarios-registro.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';

const routes: Routes = [
  { path: '', component: UsuariosMainComponent },
  { path: 'registro', component: UsuariosRegistroComponent },
  { path: ':id', component: EditarUsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
