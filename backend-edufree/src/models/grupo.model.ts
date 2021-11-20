import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Asignatura} from './asignatura.model';

@model()
export class Grupo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoGrupo: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidadEstudiantes: number;

  @property({
    type: 'string',
    required: true,
  })
  idDocente: string;

  @belongsTo(() => Asignatura)
  asignaturaId: string;

  constructor(data?: Partial<Grupo>) {
    super(data);
  }
}

export interface GrupoRelations {
  // describe navigational properties here
}

export type GrupoWithRelations = Grupo & GrupoRelations;
