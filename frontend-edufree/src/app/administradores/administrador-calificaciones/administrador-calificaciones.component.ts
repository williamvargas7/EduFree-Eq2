import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import Swal from 'sweetalert2';

interface Calificacion {
  usuarioId: string;
  grupoId: string;
  calificacion: number;
  fechaCreacion: string;
}
interface Estudiante {
  id: string;
  nombresUsuario: string;
  apellidosUsuario: string;
  noIdentificacion: string;
  rol: string;
}
interface Grupo {
  codigoGrupo: string;
  docenteId: string;
}
@Component({
  selector: 'app-administrador-calificaciones',
  templateUrl: './administrador-calificaciones.component.html',
  styleUrls: ['./administrador-calificaciones.component.scss']
})
export class AdministradorCalificacionesComponent implements OnInit {

  listaCalificaciones: Calificacion[] = [];
  listaEstudiantes: Estudiante[] = [];
  listaGrupos: Grupo[] = [];
  formCalificaciones: any;
  modoCrud = 'crear';
  idCalificacion!: '';

  constructor(
    private fb: FormBuilder,
    private backend: BackendService
  ) {
    this.formCalificaciones = this.fb.group({
      usuarioId: ['', Validators.required],
      grupoId: ['', Validators.required],
      calificacion: ['', Validators.required],
      fechaCreacion: ['', Validators.required]
    });
  }
  

  ngOnInit(): void {
  }

}
