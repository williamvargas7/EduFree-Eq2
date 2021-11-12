import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class ProgramaAcademico extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  NombrePrograma: string;

  @property({
    type: 'string',
    required: true,
  })
  CodigoPrograma: string;

  @property({
    type: 'number',
    required: true,
  })
  Duracion: number;

  @property({
    type: 'number',
    required: true,
  })
  TotalCreditos: number;

  @property({
    type: 'string',
    required: true,
  })
  Nivel: string;

  @property({
    type: 'string',
    required: true,
  })
  Modalidad: string;

  @property({
    type: 'date',
  })
  FechaCreacion?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ProgramaAcademico>) {
    super(data);
  }
}

export interface ProgramaAcademicoRelations {
  // describe navigational properties here
}

export type ProgramaAcademicoWithRelations = ProgramaAcademico & ProgramaAcademicoRelations;
