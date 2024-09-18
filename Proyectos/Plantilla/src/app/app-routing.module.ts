// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { usuariosGuardGuard } from './Guards/usuarios-guard.guard';

const routes: Routes = [
  {
    path: '', //url
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent),
        canActivate: [usuariosGuardGuard]
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'ninos',
        loadComponent: () => import('./ninos/ninos.component').then((m) => m.NinosComponent),
      },
      {
        path: 'nuevonino',
        loadComponent: () => import('./ninos/nuevonino/nuevonino.component').then((m) => m.NuevoninoComponent),
      },
      {
        path: 'editarnino/:ninoId',
        loadComponent: () => import('./ninos/nuevonino/nuevonino.component').then((m) => m.NuevoninoComponent),
      }
      ,
      {
        path: 'cuidadores',
        loadComponent: () => import('./cuidadores/cuidadores.component').then((m) => m.CuidadoresComponent),
      },
      {
        path: 'nuevocuidador',
        loadComponent: () => import('./cuidadores/nuevocuidador/nuevocuidador.component').then((m) => m.NuevocuidadorComponent),
      },
      {
        path: 'editarcuidador/:cuidadorId',
        loadComponent: () => import('./cuidadores/nuevocuidador/nuevocuidador.component').then((m) => m.NuevocuidadorComponent),
      }
      ,
      {
        path: 'asignaciones',
        loadComponent: () => import('./asignaciones/asignaciones.component').then((m) => m.AsignacionesComponent),
      },
      {
        path: 'nuevaasignacion',
        loadComponent: () => import('./asignaciones/nuevaasignacion/nuevaasignacion.component').then((m) => m.NuevaAsignacionComponent),
      },
      {
        path: 'editarasignacion/:asignacionId',
        loadComponent: () => import('./asignaciones/nuevaasignacion/nuevaasignacion.component').then((m) => m.NuevaAsignacionComponent),
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'login/:id',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
