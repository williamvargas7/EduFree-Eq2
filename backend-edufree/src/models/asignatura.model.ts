import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {ProgramaAcademico} from './programa-academico.model';
import {Grupo} from './grupo.model';

@model({settings: {strict: false}})
export class Asignatura extends Entity {
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
  nombreAsignatura: string;

  @property({
    type: 'string',
    required: true,
  })
  componente: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidadCreditos: number;

  @property({
    type: 'string',
    required: true,
  })
  codigoAsignatura: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @belongsTo(() => ProgramaAcademico)
  programaAcademicoId: string;

  @hasMany(() => Grupo)
  grupos: Grupo[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Asignatura>) {
    super(data);
  }
}

export interface AsignaturaRelations {
  // describe navigational properties here
}

export type AsignaturaWithRelations = Asignatura & AsignaturaRelations;
