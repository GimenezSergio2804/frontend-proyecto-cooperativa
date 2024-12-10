import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: 'onus',
        loadChildren: () =>
          import('./onus/onus.module').then((m) => m.OnusModule),
      },
      {
        path: 'calles',
        loadChildren: () =>
          import('./calles/calles.module').then((m) => m.CallesModule),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'abonados',
        loadChildren: () =>
          import('./abonados/abonados.module').then((m) => m.AbonadosModule),
      },
      {
        path: 'planes',
        loadChildren: () =>
          import('./planes/planes.module').then((m) => m.PlanesModule),
      },
      {
        path: 'pagos',
        loadChildren: () =>
          import('./pagos/pagos.module').then((m) => m.PagosModule),
      },
      {
        path: 'cuadrillas',
        loadChildren: () =>
          import('./cuadrillas/cuadrillas.module').then(
            (m) => m.CuadrillasModule
          ),
      },
      {
        path: 'nodos',
        loadChildren: () =>
          import('./nodos/nodos.module').then((m) => m.NodosModule),
      },
      {
        path: 'servicios',
        loadChildren: () =>
          import('./servicios/servicios.module').then((m) => m.ServiciosModule),
      },
      {
        path: 'instalaciones',
        loadChildren: () =>
          import('./instalaciones/instalaciones.module').then(
            (m) => m.InstalacionesModule
          ),
      },
      {
        path: 'reparaciones',
        loadChildren: () =>
          import('./reparaciones/reparaciones.module').then(
            (m) => m.ReparacionesModule
          ),
      },
      {
        path: 'inicio',
        loadChildren: () =>
          import('./inicio/inicio.module').then((m) => m.InicioModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
