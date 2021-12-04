import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  {path: 'administrador-usuarios', component: AdministradorUsuariosComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
