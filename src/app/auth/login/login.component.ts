import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: any = { email: '', password: '' };
  public usuario: any = {};
  public token: any = '';

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.token = this._usuarioService.getToken();
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/dashboard']);
    } else {
      // Mantener en el componente
    }
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      const data = {
        email: this.user.email,
        password: this.user.password,
      };

      this._usuarioService.login_usuario(data).subscribe(
        (response) => {
          // Verificar si se recibe token y datos de usuario
          if (response.token && response.usuario) {
            this.usuario = response.usuario;

            // Guardar token e id del usuario en localStorage, tambien la imagen de perfil
            localStorage.setItem('token', response.token);
            localStorage.setItem('_id', response.usuario.id);
            localStorage.setItem('perfil', response.usuario.perfil);

            // Navegar al dashboard
            this._router.navigate(['/dashboard']);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `¡Que bueno verte de nuevo, ${this.usuario.nombres} ${this.usuario.apellidos}!`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            // Mostrar mensaje de error recibido del backend
            Swal.fire({
              icon: 'error',
              text:
                response.mensajeError ||
                'Error desconocido. Intenta nuevamente.',
            });
          }
        },
        (error) => {
          // Manejo de errores de servidor
          if (error.error && error.error.mensajeError) {
            Swal.fire({
              icon: 'error',
              text: error.error.mensajeError,
            });
          } else {
            Swal.fire({
              icon: 'error',
              text: 'Error al procesar la solicitud. Por favor, intenta nuevamente.',
            });
          }
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Todos los campos son obligatorios',
      });
    }
  }
}
