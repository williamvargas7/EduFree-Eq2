import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/services/backend.service';
import Swal from 'sweetalert2';


interface Programa {
  nombrePrograma: string;
  codigoPrograma: string;
  cantidadSemestres: number;
  cantidadCreditos: number;
  nivelAcademico: string;
  modalidad: string;
  costo: number;
  imagen: string;
  descripcion: string;
  fechaCreacion: string;
}

@Component({
  selector: 'app-administrador-programas',
  templateUrl: './administrador-programas.component.html',
  styleUrls: ['./administrador-programas.component.scss']
})
export class AdministradorProgramasComponent implements OnInit {
  listaProgramas: Programa[] = [];
  formProgramas: any;
  // estadoCRUD!: 'Agregar';
  idProgramaActual!: '';

  constructor(private fb: FormBuilder,private backend: BackendService){
    this.getProgramas();
    this.formProgramas = this.fb.group({
      nombrePrograma: ['', Validators.required],
      codigoPrograma: ['', Validators.required],
      cantidadSemestres: ['', Validators.required],
      cantidadCreditos: ['', Validators.required],
      nivelAcademico: ['', Validators.required],
      modalidad: ['', Validators.required],
      costo: ['', Validators.required],
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaCreacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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

  // iniciarAgregacion() {
  //   this.estadoCRUD = 'Agregar';
  // }

  postPrograma() {
    const programaNuevo = this.formProgramas.getRawValue();
    programaNuevo['fechaCreacion'] = new Date().toString();
    programaNuevo['cantidadCreditos'] = parseInt(programaNuevo['cantidadCreditos']);
    programaNuevo['cantidadSemestres'] = parseInt(programaNuevo['cantidadCreditos']);
    programaNuevo['costo'] = parseInt(programaNuevo['costo']);


    this.backend.postRequest('programas-academicos', JSON.stringify(programaNuevo)).subscribe(
      {
        next: () => {
          this.getProgramas();
          Swal.fire('Programa creado','El programa se ha creado correctamente','success');
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

  // iniciarEdicion(programa: any): void {
  //   this.formProgramas.patchValue(programa)
  //   this.idProgramaActual = programa.id;
  //   this.estadoCRUD = 'Actualizar';
  // }

  patchPrograma(): void{
    Swal.fire({
      title: '¿Está seguro?',
      text: "El programa se actualizara y los datos anteriores no podrán ser recuperados",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#162440',
      cancelButtonColor: '#f25244',
      confirmButtonText: 'Modificar!'
    }).then((result) => {
      if (result.isConfirmed) {

        const programaActualizado = this.formProgramas.getRawValue();
        this.backend.patchRequest('programas-academicos', this.idProgramaActual, programaActualizado).subscribe(
          {
            next: (data) => {
              this.getProgramas();
              Swal.fire('Programa editado', `El programa ${programaActualizado.nombrePrograma} se ha editado correctamente`,'success');
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

  deletePrograma(programa: any): void {
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
        this.backend.deleteRequest('programas-academicos', programa.id).subscribe(
          {
            next: () => {
              this.getProgramas();
              Swal.fire(
                '¡Eliminado!',
                'El programa '+programa.nombrePrograma+' - '+programa.codigoPrograma+' ha sido eliminado correctamente',
                'success'
              )
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

}
