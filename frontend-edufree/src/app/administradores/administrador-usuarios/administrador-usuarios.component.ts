import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { Md5 } from 'ts-md5';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';


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
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

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

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json'
      }
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  obtenerUsuarios(): void {
    this.Backend.get('usuarios').subscribe({
      next: (data) => {
        this.listaUsuarios = data;
        this.dtTrigger.next(data);
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
    usuarioNuevo['fechaCreacion'] = new Date();

    if (usuarioNuevo['rol'] === 'Estudiante' || usuarioNuevo['rol'] === 'Docente') {
      usuarioNuevo['programaAcademicoId'] = this.formUsuario.controls.programaAcademicoId.value;
      usuarioNuevo['contrasenia'] = contraseniaEncriptada;
      usuarioNuevo['perfilId'] = usuarioNuevo.rol.id;

      if (usuarioNuevo['rol'] === 'Estudiante') {
        usuarioNuevo['foto'] = 'https://cdn-icons.flaticon.com/png/512/3152/premium/3152937.png?token=exp=1639234571~hmac=77b14c009018da439e2789344e8f0685';
      } else {
        usuarioNuevo['foto'] = 'https://cdn-icons-png.flaticon.com/512/2784/2784445.png';
      }
    } else {
      usuarioNuevo['programaAcademicoId'] = 'No Aplica';
      usuarioNuevo['foto'] = 'https://cdn-icons-png.flaticon.com/512/2291/2291833.png';
      usuarioNuevo['contrasenia'] = contraseniaEncriptada;
      usuarioNuevo['perfilId'] = usuarioNuevo.rol.id;
    }

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
    editarUsuario['fechaCreacion'] = new Date();

    if (editarUsuario['rol'] === 'Estudiante' || editarUsuario['rol'] === 'Docente') {
      editarUsuario['programaAcademicoId'] = this.formUsuario.controls.programaAcademicoId.value;
      editarUsuario['contrasenia'] = contraseniaEncriptada;
      editarUsuario['perfilId'] = editarUsuario.rol.id;

      if (editarUsuario['rol'] === 'Estudiante') {
        editarUsuario['foto'] = 'https://cdn-icons.flaticon.com/png/512/3152/premium/3152937.png?token=exp=1639234571~hmac=77b14c009018da439e2789344e8f0685';
      } else {
        editarUsuario['foto'] = 'https://cdn-icons-png.flaticon.com/512/2784/2784445.png';
      }
    } else {
      editarUsuario['programaAcademicoId'] = 'No Aplica';
      editarUsuario['foto'] = 'https://cdn-icons-png.flaticon.com/512/2291/2291833.png';
      editarUsuario['contrasenia'] = contraseniaEncriptada;
      editarUsuario['perfilId'] = editarUsuario.rol.id;
    }

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
