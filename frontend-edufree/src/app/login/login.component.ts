import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface credenciales {
  usuario: string;
  contrasenia: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: any;
  titulo = 'Login';
  token = '';

  constructor(
    private fb: FormBuilder,
    private backend: BackendService,
    private servicioGlobal: GlobalService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.servicioGlobal.rutaActual = 'sesion/login';
  }

  mostrarLogin() {
    const contrasenia = this.formLogin.controls.contrasenia.value;
    const usuario = this.formLogin.controls.usuario.value;
    const credentials = this.formLogin.getRawValue();
    alert(JSON.stringify(credentials));
  }

  autenticacion(): void {
    const contraseniaEncriptada = Md5.hashStr(
      this.formLogin.controls.contrasenia.value
    ); // Encriptar la informacion ingresada por el usuario
    const credentials = this.formLogin.getRawValue();
    credentials.contrasenia = contraseniaEncriptada;
    credentials.usuario = this.formLogin.controls.usuario.value;
    this.backend.autenticar(JSON.stringify(credentials)).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if (respuesta && respuesta.data) {
          if (respuesta.tk) {
            Swal.fire(
              '!!!!!',
              'Inicio de sesion correcto',
              'success'
            );
            this.backend.token = respuesta.tk;
            localStorage.setItem('tk', respuesta.tk);
            localStorage.setItem(
              'perfil',
              JSON.stringify(respuesta.data.perfil)
            );
            localStorage.setItem('nombreUsuario', respuesta.data.nombre);
            this.router.navigate(['/administradores/administrador-usuarios']);
          }
          alert('Credenciales correctas!!!!');

        }else{
          Swal.fire(
            '!!!!!',
            'Credenciales incorrectas, verifiquelas y vuelva a ingresar',
            'error'
          );
          alert('Credenciales incorrectas, verifiquelas y vuelva a ingresar');
        }

        // console.log(data);
      },
      error: (err) => {
        //alert(err);
      },
      complete: () => {
        //alert("Completado");
      },
    });
    //alert(JSON.stringify(credentials));
  }

}
