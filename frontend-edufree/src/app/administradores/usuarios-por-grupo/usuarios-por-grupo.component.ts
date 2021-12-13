import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import Swal from 'sweetalert2';

interface EstudiantesPorGrupo {
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
interface Docente {
  id: string;
  nombresUsuario: string;
  apellidosUsuario: string;
  noIdentificacion: string;
  rol: string;
}
interface Grupo {
  id: string;
  codigoGrupo: string;
  docenteId: string;
  asignaturaId: string;
}
interface Asignatura {
  id: string;
  nombreAsignatura: string;
}
interface Programa{
  id: string;
  nombrePrograma: string;
}

interface Relacion {
  nombreEstudiante: string;
  rol: string;
  grupo: string;
  asignatura: string;
  nombreDocente: string;
  programa: string;
}


@Component({
  selector: 'app-usuarios-por-grupo',
  templateUrl: './usuarios-por-grupo.component.html',
  styleUrls: ['./usuarios-por-grupo.component.scss']
})
export class UsuariosPorGrupoComponent implements OnInit {

  listaEporGrupo: EstudiantesPorGrupo[] = [];
  listaEstudiantes: Estudiante[] = [];
  listaDocentes: Docente[] = [];
  listaGrupos: Grupo[] = [];
  listaAsignaturas: Asignatura[] = [];
  listaProgramas: Programa[] = [];
  listaRelaciones: Relacion[] = [];
  formEstudiantesPorGrupo: any;
  modoCrud = 'crear';
  idCalificacion!: '';

  constructor(
    private fb: FormBuilder,
    private backend: BackendService
  ) {
    this.formEstudiantesPorGrupo = this.fb.group({
      usuarioId: ['', Validators.required],
      grupoId: ['', Validators.required],
      calificacion: ['', Validators.required],
      fechaCreacion: ['', Validators.required]
    });
    this.getEstudiantesPorGrupo();
    this.getGrupos();
    this.getEstudiantes();

  }

  ngOnInit(): void {
  }

  getEstudiantesPorGrupo() {
    this.backend.get('/usuarios-por-grupo').subscribe(
      {
        next: (data) => {
          this.listaEporGrupo = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log(this.listaEporGrupo);
        }
      }
    );
  }

  getGrupos() {
    this.backend.get('/grupos').subscribe(
      {
        next: (data) => {
          this.listaGrupos = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Completado');
        }
      }
    );
  }

  getEstudiantes() {
    const filter = { "where": { "rol": "Estudiante" } };

    this.backend.getRequestFilter('usuarios', JSON.stringify(filter)).subscribe(
      {
        next: (data) => {
          this.listaEstudiantes = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Completado');
        }
      }
    );
  }

  getDocentes() {
    const filter = { "where": { "rol": "Docente" } };

    this.backend.getRequestFilter('usuarios', JSON.stringify(filter)).subscribe(
      {
        next: (data) => {
          this.listaDocentes = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Completado');
        }
      }
    );
  }

  getAsignaturas() {
    this.backend.get('/asignaturas').subscribe(
      {
        next: (data) => {
          this.listaAsignaturas = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Completado');
        }
      }
    );
  }

  getProgramas() {
    this.backend.get('/programas-academicos').subscribe(
      {
        next: (data) => {
          this.listaProgramas = data;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Completado');
        }
      }
    );
  }

  getUsuariosPorGrupo() {
    this.backend.get('/usuarios-por-grupo').subscribe(
      {
        next: (data) => {
          this.listaEporGrupo = data;
        },
      }
    );
    const id = this.listaEporGrupo.usuarioId.toString();
    const filter = { "where": { "id":  } };

    this.backend.getRequestFilter('usuarios', JSON.stringify(filter)).subscribe(
      {
        next: (data) => {
          this.listaEstudiantes = data;
          const
        }
      }
    );

    // nombreEstudiante: string;
    // rol: string;
    // grupo: string;
    // asignatura: string;
    // nombreDocente: string;
    // programa: string;

    // this.listaRelaciones = [
    //   {
    //     nombreEstudiante: nombreEstudiante.nombresUsuario,
    //   }
    // ];
  }

  crear() {
    this.modoCrud = 'crear';
  }

  postEstudiantesPorGrupo() {
    const nuevoEstudiantePorGrupo = this.formEstudiantesPorGrupo.getRawValue();
    nuevoEstudiantePorGrupo['fechaCreacion'] = new Date();

    this.backend.postRequest(
      '/usuarios-por-grupo',
      JSON.stringify(nuevoEstudiantePorGrupo)
    ).subscribe(
      {
        next: (data) => {
          Swal.fire({
            title: `Estudiante agregado al grupo ${nuevoEstudiantePorGrupo.grupoId}`,
            text: `El estudiante ${nuevoEstudiantePorGrupo.usuarioId} ha sido relacionado al grupo ${nuevoEstudiantePorGrupo.grupoId} correctamente`,
            icon: 'success'
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'La relacion estudiante - grupo no ha sido creada',
            icon: 'error'
          });
        },
        complete: () => {
          this.getGrupos();
        }
      }
    );
  }

  deleteRow(id: number): void {
    let table = document.getElementById("#tabla")! as HTMLTableElement;
    table.deleteRow(id);
  }

  addRow(): void{
    let table = document.getElementById("#tabla")! as HTMLTableElement;
    let x = table.rows.length;
    let id = "tbl" + x;
    let row = table.insertRow(x);
    row.id = id;

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.outerHTML = `<th> ${x} </th>`;
    cell2.innerHTML = `<select name="" id="" placeholder="Estudiante" class="form-control form-select"2
                            *ngFor="let e of listaEstudiantes">
                            <option value="" disabled selected hidden>Estudiante</option>
                            <option value="{{e.id}}">{{e.nombresUsuario}} - {{e.apellidosUsuario}} {{e.nombresUsuario}} [{{e.rol}}]</option>
                        </select>`;
    cell3.innerHTML = `<select name="" id="" placeholder="Grupo" class="form-control form-select"
                        *ngFor="let g of listaGrupos">
                            <option value="" disabled selected hidden>Estudiante</option>
                            <option value="{{g.id}}">{{g.codigoGrupo}} - {{g.docenteId}}</option>
                        </select>`;
    cell4.innerHTML = `<a type="button" class="mx-2 text-success" title="Agregar Relación">
                            <i class="h4 bi bi-person-plus-fill"></i>
                        </a>
                        <a type="button" class="mx-2 text-danger" title="Eliminar Relación">
                            <i class="h4 bi bi-person-dash-fill"></i>
                        </a>`;
    cell5.innerHTML = `<a type="button" class="mx-2 text-danger" title="Agregar Fila" (click)="addRow()">
                            <i class="h4 bi bi-plus-lg"></i>
                        </a>
                        <a type="button" class="mx-2 text-danger" title="Eliminar Fila" >
                            <i class="h4 bi bi-dash-lg"></i>
                        </a>`;
  }

}
