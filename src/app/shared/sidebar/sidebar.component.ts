import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  usuario: any; // Almacenar la información del usuario
  sector: string = ''; // Sector para condicionar el contenido
  public menuItems: any = [];
  imageUrl: string = '';

  constructor(
    private _sidebarService: SidebarService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.menuItems = this._sidebarService.menu;
  }

  ngOnInit(): void {
    // Obtener la URL de la imagen desde el localStorage
    const storedImage = localStorage.getItem('perfil');
    if (storedImage) {
      this.imageUrl = storedImage;
    } else {
      // Imagen por defecto si no hay nada en el localStorage
      this.imageUrl = 'assets/dist/img/avatar.png';
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
