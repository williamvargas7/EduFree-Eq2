import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/services/backend.service';
import { Md5 } from 'ts-md5';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

interface Usuario {
  id: string;
  nombresUsuario: string;
  apellidosUsuario: string;
  tipoIdentificacion: string;
  noIdentificacion: string;
  correoElectronico: string;
  telefono: string;
  programaAcademicoId: string;
  rol: string;
  usuario: string;
  contrasenia: string;
  fechaCreacion: string;
}

interface Programa {
  id: string;
  nombrePrograma: string;
}

interface Rol {
  id: string;
  nombrePerfil: string;
}

@Component({
  selector: 'app-administrador-usuarios',
  templateUrl: './administrador-usuarios.component.html',
  styleUrls: ['./administrador-usuarios.component.scss'],
})
export class AdministradorUsuariosComponent implements OnInit {
  formUsuario: any;
  listaUsuarios: Usuario[] = [];
  listaProgramas: Programa[] = [];
  listaRoles: Rol[] = [];
  idUsuarioEdit = '';
  modoCrud = 'adicion';

  constructor(private fb: FormBuilder, private Backend: BackendService) {
    this.formUsuario = this.fb.group({
      nombresUsuario: ['', Validators.required],
      apellidosUsuario: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      noIdentificacion: ['', Validators.required],
      correoElectronico: [
        '',
        Validators.compose([Validators.email, Validators.required]),
      ],
      telefono: ['', Validators.required],
      programaAcademicoId: ['', Validators.required],
      rol: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      perfilId: ['', Validators.required],
    });
    this.obtenerUsuarios();
    this.obtenerProgramas();
    this.obtenerRoles();
  }

  ngOnInit(): void {}

  obtenerUsuarios(): void {
    this.Backend.get('usuarios').subscribe({
      next: (data) => {
        this.listaUsuarios = data;
        console.log(data);
      },
      error: (e) => {
        console.log('error');
      },
      complete: () => {
        console.log('completo');
      },
    });
  }

  obtenerProgramas(): void {
    this.Backend.get('/programas-academicos').subscribe({
      next: (data) => {
        this.listaProgramas = data;
      },
      error: (err) => {
      },
      complete: () => {
      },
    });
  }

  obtenerRoles(): void {
    this.Backend.get('/perfiles').subscribe({
      next: (data) => {
        // alert(data+"Datos Obtenidos correctamente");
        this.listaRoles = data;
      },
      error: (err) => {
        //alert(err);
      },
      complete: () => {
        // alert("Completado");
      },
    });
  }

  iniciarAdicion(): void {
    this.modoCrud = 'adicion';
  }

  crearUsuario(): void {
    const usuarioNuevo = this.formUsuario.getRawValue();
    const contraseniaEncriptada = Md5.hashStr(
      this.formUsuario.controls.contrasenia.value
    );
    usuarioNuevo.contrasenia = contraseniaEncriptada;
    usuarioNuevo.foto =
      'https://cdn-icons-png.flaticon.com/512/2784/2784445.png';

    usuarioNuevo.perfilId = usuarioNuevo.rol;

    this.Backend.postRequest(
      'usuarios',
      JSON.stringify(usuarioNuevo)
    ).subscribe({
      next: (data) => {
        this.listaUsuarios.unshift(data);
        swal.fire('Felicidades', 'Usuario Creado', 'success');
        this.formUsuario.reset();
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  IniciarEdicion(usuario: any): void {
    this.formUsuario.patchValue(usuario);
    this.idUsuarioEdit = usuario.id;
    this.modoCrud = 'edicion';
  }

  Editar(): void {
    const editarUsuario = this.formUsuario.getRawValue();
    const contraseniaEncriptada = Md5.hashStr(
      this.formUsuario.controls.contrasenia.value
    );
    editarUsuario.contrasenia = contraseniaEncriptada;

    this.Backend.patchRequest(
      'usuarios',
      this.idUsuarioEdit,
      editarUsuario
    ).subscribe({
      next: (data) => {
        this.obtenerUsuarios();
        swal.fire('Felicidades', 'Usuario Editado', 'success');
        this.formUsuario.reset();
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }

  Limpiar(): void {
    this.formUsuario.reset();
  }

  EmininarUsuario(usuario: any) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'El usuario se eliminará y no podrá ser recuperado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#162440',
      cancelButtonColor: '#f25244',
      confirmButtonText: '¡Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.Backend.deleteRequest('usuarios', usuario.id).subscribe({
          next: () => {
            this.obtenerUsuarios();
            swal.fire(
              '!!!',
              'Usuario Eliminado ' +
                usuario.nombresUsuario +
                ' ' +
                usuario.apellidosUsuario,
              'success'
            );
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {},
        });
      }
    });
  }
}
