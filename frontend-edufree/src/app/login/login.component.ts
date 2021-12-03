import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/services/backend.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';

interface credenciales {
  usuario: string;
  contrasenia: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin : any;

  constructor(private fb: FormBuilder,private backend: BackendService) {

    this.formLogin = this.fb.group(
      {
        usuario: ['', Validators.required],
        contrasenia: ['', Validators.required]
      }
    );
  }

  ngOnInit(): void {
  }

  mostrarLogin() {
    const contrasenia = this.formLogin.controls.contrasenia.value;
    const usuario = this.formLogin.controls.usuario.value;
    const credentials = this.formLogin.getRawValue();
    alert(JSON.stringify(credentials));
  }

  autenticacion() {
    const contraseniaEncriptada = Md5.hashStr(this.formLogin.controls.contrasenia.value) // Encriptar la informacion ingresada por el usuario  
    const credentials = this.formLogin.getRawValue();
    credentials.contrasenia=contraseniaEncriptada;
    credentials.usuario=this.formLogin.controls.usuario.value;
    this.backend.autenticar(JSON.stringify(credentials)).subscribe(
      {
        next: (data) => { 
          // console.log(Object.values(data));
          console.log(data);
          //alert('Credenciales Ingresadas: '+JSON.stringify(credentials));
          //alert('Credenciales Consultadas: '+JSON.stringify(data));

           var usuario = JSON.stringify(data);
           //alert(usuario);
           //alert(usuario.length);
           alert(data.length);

          if (data.length>0){ 
            alert('Usuario encontrado en la base de datos!!!');
            
          }else{
            alert('Las credenciales son incorrectas');
          }
          console.log(data);
        },
        error: (err) => {
          //alert(err);
        },
        complete: () => {
          //alert("Completado");
        }
      }
    );
    //alert(JSON.stringify(credentials));
  }
}
