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
      titulo: ' Servicios',
      icono: 'fas fa-users',
      submenu: [
        { titulo: 'Servicios', url: 'servicios', icono: '	fas fa-user-tag' },
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
      titulo: ' Pagos',
      // roles: ['tecnico'],
      icono: 'fas fa-users',
      submenu: [{ titulo: 'Pagos', url: 'pagos', icono: '	fas fa-user-tag' }],
    },
    {
      titulo: ' Plantel',
      icono: 'fas fa-laptop-house',
      submenu: [
        { titulo: 'Cto', url: 'ctos', icono: 'fas fa-directions' },
        { titulo: 'Fibra', url: 'fibras', icono: 'fas	fa-archive' },
        { titulo: 'Nodo', url: 'nodos', icono: 'fas fa-directions' },
        // { titulo: 'Onus', url: 'onus', icono: 'fab fa-intercom' },
      ],
    },
    {
      titulo: ' Config',
      icono: 'fas fa-laptop-house',
      submenu: [
        { titulo: 'Calles', url: 'calles', icono: 'fas fa-directions' },
        { titulo: 'Planes', url: 'planes', icono: 'fas	fa-archive' },
        { titulo: 'Cuadrillas', url: 'cuadrillas', icono: 'fab fa-intercom' },
      ],
    },
  ];

  private userSector: string = '';

  setUserSector(sector: string): void {
    this.userSector = sector;
  }
  getMenuItems(): any[] {
    return this.menu.filter((item) => item.roles.includes(this.userSector));
  }
}
