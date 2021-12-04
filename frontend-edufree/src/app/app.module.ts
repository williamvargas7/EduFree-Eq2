import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProgramasComponent } from './programas/programas.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { MainFooterComponent } from './componentes/main-footer/main-footer.component';
import { MainSidebarComponent } from './componentes/main-sidebar/main-sidebar.component';
import { MainNavbarComponent } from './componentes/main-navbar/main-navbar.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { CrearAsignaturaComponent } from './layouts/crud-asignaturas/crear-asignatura/crear-asignatura.component';
import { ModificarAsignaturaComponent } from './layouts/crud-asignaturas/modificar-asignatura/modificar-asignatura.component';
import { LeerAsignaturaComponent } from './layouts/crud-asignaturas/leer-asignatura/leer-asignatura.component';
import { EliminarAsignaturaComponent } from './layouts/crud-asignaturas/eliminar-asignatura/eliminar-asignatura.component';
import { CrearDocenteComponent } from './layouts/crud-docentes/crear-docente/crear-docente.component';
import { ModificarDocenteComponent } from './layouts/crud-docentes/modificar-docente/modificar-docente.component';
import { LeerDocenteComponent } from './layouts/crud-docentes/leer-docente/leer-docente.component';
import { EliminarDocenteComponent } from './layouts/crud-docentes/eliminar-docente/eliminar-docente.component';
import { CrearEstudianteComponent } from './layouts/crud-estudiantes/crear-estudiante/crear-estudiante.component';
import { EliminarEstudianteComponent } from './layouts/crud-estudiantes/eliminar-estudiante/eliminar-estudiante.component';
import { LeerEstudianteComponent } from './layouts/crud-estudiantes/leer-estudiante/leer-estudiante.component';
import { ModificarEstudianteComponent } from './layouts/crud-estudiantes/modificar-estudiante/modificar-estudiante.component';
import { CrearProgramaComponent } from './layouts/crud-programas/crear-programa/crear-programa.component';
import { EliminarProgramaComponent } from './layouts/crud-programas/eliminar-programa/eliminar-programa.component';
import { LeerProgramaComponent } from './layouts/crud-programas/leer-programa/leer-programa.component';
import { ModificarProgramaComponent } from './layouts/crud-programas/modificar-programa/modificar-programa.component';
import { CrearGrupoComponent } from './layouts/crud-grupos/crear-grupo/crear-grupo.component';
import { EliminarGrupoComponent } from './layouts/crud-grupos/eliminar-grupo/eliminar-grupo.component';
import { LeerGrupoComponent } from './layouts/crud-grupos/leer-grupo/leer-grupo.component';
import { ModificarGrupoComponent } from './layouts/crud-grupos/modificar-grupo/modificar-grupo.component';
import { AdministradorUsuariosComponent } from './administrador-usuarios/administrador-usuarios.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProgramasComponent,
    InscripcionesComponent,
    MainFooterComponent,
    MainSidebarComponent,
    MainNavbarComponent,
    MainLayoutComponent,
    UserLayoutComponent,
    CrearAsignaturaComponent,
    ModificarAsignaturaComponent,
    LeerAsignaturaComponent,
    EliminarAsignaturaComponent,
    CrearDocenteComponent,
    ModificarDocenteComponent,
    LeerDocenteComponent,
    EliminarDocenteComponent,
    CrearEstudianteComponent,
    EliminarEstudianteComponent,
    LeerEstudianteComponent,
    ModificarEstudianteComponent,
    CrearProgramaComponent,
    EliminarProgramaComponent,
    LeerProgramaComponent,
    ModificarProgramaComponent,
    CrearGrupoComponent,
    EliminarGrupoComponent,
    LeerGrupoComponent,
    ModificarGrupoComponent,
    AdministradorUsuariosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
