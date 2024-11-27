import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-registro',
  templateUrl: './usuarios-registro.component.html',
  styleUrls: ['./usuarios-registro.component.css'],
})
export class UsuariosRegistroComponent implements OnInit {
  public usuario: any = {
    sector: '',
    role: '',
  };

  constructor(
    private _router: Router,
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {}

  registro(registroForm: any) {
    if (registroForm.valid) {
      this._usuarioService.crear_usuario(this.usuario).subscribe(
        (response) => {
          // Muestra el mensaje de éxito
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.mensaje,
            showConfirmButton: false,
            timer: 1200,
          });

          // Reinicia el objeto usuario
          this.usuario = {
            legajo: '',
            nombres: '',
            apellidos: '',
            sector: '',
            email: '',
            password: '',
            perfil: '',
            telefono: '',
            role: '',
          };

          // Navega a la página de usuarios
          this._router.navigate(['/dashboard/usuarios']);
        },
        (error) => {
          // Manejo de errores desde el backend
          const errorMessage =
            error.error?.mensajeError || 'Ocurrió un error inesperado';
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: errorMessage,
            showConfirmButton: false,
            timer: 1200,
          });
        }
      );
    } else {
      // Manejo de formulario inválido
      Swal.fire({
        icon: 'error',
        text: 'Todos los campos son obligatorios',
      });
    }
  }
}
