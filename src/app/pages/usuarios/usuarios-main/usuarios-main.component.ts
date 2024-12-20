import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare var JQuery: any;
declare var $: any;

@Component({
  selector: 'app-usuarios-main',
  templateUrl: './usuarios-main.component.html',
  styleUrls: ['./usuarios-main.component.css'],
})
export class UsuariosMainComponent implements OnInit {
  public usuarios: Array<any> = [];
  public page = 1;
  public pageSize = 5;
  public token: any;
  public load_data = true;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.init_data();
  }

  init_data() {
    this._usuarioService.obtener_usuarios().subscribe(
      (response) => {
        this.usuarios = response;

        this.load_data = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  eliminar(id: any) {
    this._usuarioService.eliminar_usuario(id).subscribe(
      (response) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.mensaje,
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'animate__animated animate__fadeInDown', // Animación
          },
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_data();
      },
      (error) => {}
    );
  }
}
