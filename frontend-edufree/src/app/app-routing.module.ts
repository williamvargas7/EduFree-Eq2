import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { ProgramasComponent } from './programas/programas.component';
import { AdministradorUsuariosComponent } from './administradores/administrador-usuarios/administrador-usuarios.component';
import { AdministradorProgramasComponent } from './administradores/administrador-programas/administrador-programas.component';
import { AdministradorAsignaturasComponent } from './administradores/administrador-asignaturas/administrador-asignaturas.component';
import { AdministradorCalificacionesComponent } from './administradores/administrador-calificaciones/administrador-calificaciones.component';
import { AdministradorGruposComponent } from './administradores/administrador-grupos/administrador-grupos.component';
import { IndexComponent } from './index/index.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AutorizacionGuard } from './guards/autorizacion.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'login', component: LoginComponent },
      { path: 'programas-ofertados', component: ProgramasComponent },
      { path: 'inscripciones', component: InscripcionesComponent },
    ],
  },
  {
    path: 'administradores',
    component: UserLayoutComponent,
    children: [
      {
        path: 'administrador-usuarios',
        canActivate: [AutorizacionGuard],
        component: AdministradorUsuariosComponent,
      },
      {
        path: 'administrador-programas',
        canActivate: [AutorizacionGuard],
        component: AdministradorProgramasComponent,
      },
      {
        path: 'administrador-asignaturas',
        component: AdministradorAsignaturasComponent,
      },
      {
        path: 'administrador-calificaciones',
        component: AdministradorCalificacionesComponent,
      },
      { path: 'administrador-grupos', component: AdministradorGruposComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
