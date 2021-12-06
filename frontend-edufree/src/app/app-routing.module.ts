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


const routes: Routes = [
  {path: '', component: MainLayoutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'programas-ofertados', component: ProgramasComponent},
  {path: 'inscripciones', component: InscripcionesComponent},
  {path: 'administrador-usuarios', component: AdministradorUsuariosComponent},
  {path: 'administrador-programas', component: AdministradorProgramasComponent},
  {path: 'administrador-asignaturas', component: AdministradorAsignaturasComponent},
  {path: 'administrador-calificaciones', component: AdministradorCalificacionesComponent},
  {path: 'administrador-grupos', component: AdministradorGruposComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
