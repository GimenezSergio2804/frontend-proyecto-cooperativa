import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css'],
})
export class EditarUsuariosComponent implements OnInit {
  public usuario: any = {};
  public id: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params['id'];

      this._usuarioService.obtener_usuario_id(this.id).subscribe(
        (response) => {
          if (response == undefined) {
            this.usuario = undefined;
            console.log(this.usuario);
          } else {
            this.usuario = response;
          }
        },
        (error) => {}
      );
    });
  }

  actualizar(updateForm: any) {}
}
