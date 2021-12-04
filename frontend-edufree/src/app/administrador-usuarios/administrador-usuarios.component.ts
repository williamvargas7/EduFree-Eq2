import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/services/backend.service';

@Component({
  selector: 'app-administrador-usuarios',
  templateUrl: './administrador-usuarios.component.html',
  styleUrls: ['./administrador-usuarios.component.scss']
})
export class AdministradorUsuariosComponent implements OnInit {

  formUsuario: any;
  listaUsuarios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private Backend: BackendService
  ) {
    this.formUsuario=this.fb.group(
  {
    nombresUsuario: ['', Validators.required],
    apellidosUsuario: ['',  Validators.required],
    tipoIdentificacion: ['',  Validators.required],
    noIdentificacion: ['',  Validators.required],
    correoElectronico: ['',  Validators.compose([Validators.email,Validators.required])],
    telefono: ['',  Validators.required],
    programaAcademicoId: ['',  Validators.required],
    rol: ['',  Validators.required],
    usuario: ['',  Validators.required],
    contrasenia: ['',  Validators.required]
  }

    );
    this.obtenerUsuarios();
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

  crearUsuario():void{
    const usuarioNuevo =this.formUsuario.getRawValue();
    usuarioNuevo.fechaCreacion= "2021-12-04T06:09:59.036Z";
    usuarioNuevo.perfilId= "string";
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
          
        }
      }
    );
  }

}
