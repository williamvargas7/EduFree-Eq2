import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { ProgramasComponent } from './programas/programas.component';
import { AdministradorUsuariosComponent } from './administrador-usuarios/administrador-usuarios.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'programas-ofertados', component: ProgramasComponent},
  {path: 'inscripciones', component: InscripcionesComponent},
  {path: 'admin', component: UserLayoutComponent},
  {path: 'docente', component: UserLayoutComponent},
  {path: 'estudiante', component: UserLayoutComponent},
  {path: 'administrador-usuarios', component: AdministradorUsuariosComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
