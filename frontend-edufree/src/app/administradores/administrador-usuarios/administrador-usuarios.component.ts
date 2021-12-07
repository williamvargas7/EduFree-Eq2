import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { timestamp } from 'rxjs';
import { BackendService } from 'src/services/backend.service';
import { Md5 } from 'ts-md5';
import swal from 'sweetalert2';

interface Usuario {
  nombresUsuario: string,
  apellidosUsuario: string,
  tipoIdentificacion: string,
  noIdentificacion: string,
  correoElectronico: string,
  telefono: string,
  programaAcademicoId: string,
  rol: string,
  usuario: string,
  contrasenia: string,
  fechaCreacion: string
}

interface Programa {
  id: string,
  nombrePrograma: string
}

interface Rol {
  id: string,
  nombrePerfil: string
}

@Component({
  selector: 'app-administrador-usuarios',
  templateUrl: './administrador-usuarios.component.html',
  styleUrls: ['./administrador-usuarios.component.scss']
})
export class AdministradorUsuariosComponent implements OnInit {

  formUsuario: any;
  listaUsuarios: Usuario[] = [];
  listaProgramas: Programa[] = [];
  listaRoles: Rol[] = [];
  idUsuarioEdit = '';
  modoCrud = 'adicion';

  constructor(
    private fb: FormBuilder,
    private Backend: BackendService
  ) {
    this.formUsuario = this.fb.group(
      {
        nombresUsuario: ['', Validators.required],
        apellidosUsuario: ['', Validators.required],
        tipoIdentificacion: ['', Validators.required],
        noIdentificacion: ['', Validators.required],
        correoElectronico: ['', Validators.compose([Validators.email, Validators.required])],
        telefono: ['', Validators.required],
        programaAcademicoId: ['', Validators.required],
        rol: ['', Validators.required],
        usuario: ['', Validators.required],
        contrasenia: ['', Validators.required]
      }
    );
    this.obtenerUsuarios();
    this.obtenerProgramas();
    this.obtenerRoles();
    // this.limpiarFomrulario();
  }

  ngOnInit(): void {
  }

  obtenerUsuarios(): void {

    this.Backend.get('usuarios').subscribe(
      {
        next: (data) => {
          this.listaUsuarios = data;
          console.log(data);
        },
        error: (e) => {
          console.log('error');
        },
        complete: () => {
          console.log('completo');
        }
      }
    );
  }

  obtenerProgramas(): void {
    this.Backend.get('/programas-academicos').subscribe(
      {
        next: (data) => {
          // alert(data+"Datos Obtenidos correctamente");
          this.listaProgramas = data;
        },
        error: (err) => {
          //alert(err);
        },
        complete: () => {
          // alert("Completado");
        }
      }
    );
  }

  obtenerRoles(): void {
    this.Backend.get('/perfiles').subscribe(
      {
        next: (data) => {
          // alert(data+"Datos Obtenidos correctamente");
          this.listaRoles = data;
        },
        error: (err) => {
          //alert(err);
        },
        complete: () => {
          // alert("Completado");
        }
      }
    );
  }

  crearUsuario():void{
    const usuarioNuevo = this.formUsuario.getRawValue();
    usuarioNuevo.fechaCreacion= timestamp;
    usuarioNuevo.perfilId= usuarioNuevo.rol;
    usuarioNuevo.rol= "string";
    usuarioNuevo.programaAcademicoId= "string";

    this.Backend.postRequest('usuarios',JSON.stringify(usuarioNuevo)).subscribe(
      {
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('complete');
        }
      }

    );
  }

  iniciarAdicion(): void {
    this.modoCrud = 'adicion';
  }

  IniciarEdicion(usuario: any): void {
    this.formUsuario.patchValue(usuario);
    this.idUsuarioEdit = usuario.id;
    this.modoCrud = 'edicion';
  }

  Editar(): void {
    const nuevoUsuario = this.formUsuario.getRawValue();
    const contraseniaEncriptada = Md5.hashStr(this.formUsuario.controls.contrasenia.value)
    nuevoUsuario.contrasenia = contraseniaEncriptada;
    this.Backend.patchRequest('usuarios', this.idUsuarioEdit, nuevoUsuario).subscribe(
      {
        next: (data) => {
          this.obtenerUsuarios();
          swal.fire('Felicidades', 'Usuario Editado', 'success');
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {

        }
      }
    );
  }

  Limpiar(): void {
    this.formUsuario.reset();
  }

  EmininarUsuario(usuario: any) {
    this.Backend.deleteRequest('usuarios', usuario.id).subscribe(
      {
        next: () => {
          this.obtenerUsuarios();
          swal.fire('!!!', 'Usuario Eliminado ' + usuario.nombresUsuario + ' ' + usuario.apellidosUsuario, 'success');
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {

        }
      }

    );
  }
}
