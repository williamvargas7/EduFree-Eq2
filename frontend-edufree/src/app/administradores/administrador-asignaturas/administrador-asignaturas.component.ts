import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

interface Asignatura {
  nombreAsignatura: string;
  componente: string;
  cantidadCreditos: number;
  codigoAsignatura: string;
  programaAcademicoId: string;
  fechaCreacion: string;
}

interface Programa {
  id: string;
  nombrePrograma: string;
}

@Component({
  selector: 'app-administrador-asignaturas',
  templateUrl: './administrador-asignaturas.component.html',
  styleUrls: ['./administrador-asignaturas.component.scss']
})
export class AdministradorAsignaturasComponent implements OnInit, OnDestroy {

  listaAsignaturas: Asignatura[] = [];
  listaProgramas: Programa[] = [];
  formAsignaturas: any;
  modoCrud = 'crear';
  idAsignatura!: '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private fb: FormBuilder,
    private backend: BackendService
  ) {
    this.formAsignaturas = this.fb.group({
      nombreAsignatura: ['', Validators.required],
      componente: ['', Validators.required],
      cantidadCreditos: ['', Validators.required],
      codigoAsignatura: ['', Validators.required],
      programaAcademicoId: ['', Validators.required]
    });
    this.getAsignaturas();
    this.getProgramas();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
      }
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getAsignaturas() {
    this.backend.get('/asignaturas').subscribe(
      {
        next: (data) => {
          this.listaAsignaturas = data;
          this.dtTrigger.next(data);
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
    this.backend.get('/programas-academicos').subscribe({
      next: (data) => {
        this.listaProgramas = data;
      },
      error: (err) => {
      },
      complete: () => {
      },
    });
  }

  crear() {
    this.modoCrud = 'crear';
  }

  postAsignaturas() {
    const asignaturaNueva = this.formAsignaturas.getRawValue();
    asignaturaNueva['cantidadCreditos'] = parseInt(asignaturaNueva['cantidadCreditos']);

    this.backend.postRequest(
      '/asignaturas',
      JSON.stringify(asignaturaNueva)
    ).subscribe(
      {
        next: () => {
          Swal.fire(
            'Asignatura creada',
            'La asignatura se ha creado correctamente',
            'success'
          );
          this.getAsignaturas();
          this.limpiarFormulario();
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

  actualizar(asignatura: any): void {
    this.formAsignaturas.patchValue(asignatura)
    this.idAsignatura = asignatura.id;
    this.modoCrud = 'actualizar';
  }

  patchAsignaturas(): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "La Asignatura se actualizara y los datos anteriores no podrán ser recuperados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#162440',
      cancelButtonColor: '#f25244',
      confirmButtonText: 'Modificar'
    }).then((result) => {
      if (result.isConfirmed) {

        const asignaturaActualizada = this.formAsignaturas.getRawValue();
        asignaturaActualizada['cantidadCreditos'] = parseInt(asignaturaActualizada['cantidadCreditos']);

        this.backend.patchRequest(
          '/asignaturas',
          this.idAsignatura,
          asignaturaActualizada
        ).subscribe(
          {
            next: (data) => {
              Swal.fire(
                'Programa editado',
                `El programa ${asignaturaActualizada.nombreAsignatura} se ha editado correctamente`,
                'success'
              );
              this.getAsignaturas();
              this.limpiarFormulario();
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
    })
  }

  deleteAsignaturas(asignatura: any): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "El programa se eliminará y no podrá ser recuperado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#162440',
      cancelButtonColor: '#f25244',
      confirmButtonText: '¡Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.backend.deleteRequest(
          '/asignaturas',
          asignatura.id
        ).subscribe(
          {
            next: () => {
              Swal.fire(
                '¡Eliminado!',
                `La asignatura ${asignatura.nombreAsignatura} - ${asignatura.codigoAsignatura} ha sido eliminado correctamente`,
                'success'
              )
              this.getAsignaturas();
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
    })
  }

  limpiarFormulario(): void {
    this.formAsignaturas.reset();
  }

}
