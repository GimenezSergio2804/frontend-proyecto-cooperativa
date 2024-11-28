import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosMainComponent } from './usuarios-main/usuarios-main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsuariosRegistroComponent } from './usuarios-registro/usuarios-registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';

@NgModule({
  declarations: [
    UsuariosMainComponent,
    UsuariosRegistroComponent,
    EditarUsuariosComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsuariosModule {}
