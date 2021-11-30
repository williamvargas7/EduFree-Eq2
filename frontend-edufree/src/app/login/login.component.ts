import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/services/backend.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

interface Credenciales {
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

  constructor(private fb: FormBuilder) {
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
}
