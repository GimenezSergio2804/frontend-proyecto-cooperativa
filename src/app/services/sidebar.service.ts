import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      titulo: ' FTTH',
      icono: 'nav-icon fas fa-tachometer-alt',
      submenu: [
        { titulo: 'Instalaciones', url: 'instalaciones', icono: 'fa fa-users' },
        {
          titulo: 'Reparaciones',
          url: 'reparaciones',
          icono: 'fas fa-house-damage',
        },
        // { titulo: 'Calles', url: 'calles', icono: 'fas fa-directions' },
        // {
        //   titulo: 'Configuraciones',
        //   url: 'configuraciones',
        //   icono: 'fas fa-cog',
        // },
      ],
    },
    {
      titulo: ' Personas',
      icono: 'fas fa-users',
      submenu: [
        { titulo: 'Abonados', url: 'abonados', icono: '	fas fa-user-tag' },
        { titulo: 'Usuarios', url: 'usuarios', icono: '	fas fa-user-tag' },
      ],
    },
    {
      titulo: ' Config',
      icono: 'fas fa-laptop-house',
      submenu: [
        { titulo: 'Calles', url: 'calles', icono: 'fas fa-directions' },
        // { titulo: 'Ctos', url: 'cto-ftth', icono: 'fas	fa-archive' },
        // { titulo: 'Onus', url: 'onus', icono: 'fab fa-intercom' },
      ],
    },
  ];
}
