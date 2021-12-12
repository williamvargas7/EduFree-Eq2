import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  rutaActual = '';
  nombrePerfil = '';
  nombreUsuario = '';

  constructor(private router: Router, private backend: BackendService) {}

  cerrarSesion(): void {
    Swal.fire({
      text: 'Confirmar cierre de sesion',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#162440',
      cancelButtonColor: '#f25244',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('tk');
        this.router.navigate(['/login']);
      }else{
        this.backend.token;
      }

    });
  }
}
