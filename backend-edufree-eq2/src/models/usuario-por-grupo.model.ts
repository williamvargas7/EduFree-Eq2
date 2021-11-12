import {Model, model, property} from '@loopback/repository';

@model()
export class UsuarioPorGrupo extends Model {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  idGrupo: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario: string;

  @property({
    type: 'number',
    required: true,
  })
  calificacion: number;

  @property({
    type: 'string',
  })
  gruposId?: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;

  constructor(data?: Partial<UsuarioPorGrupo>) {
    super(data);
  }
}

export interface UsuarioPorGrupoRelations {
  // describe navigational properties here
}

export type UsuarioPorGrupoWithRelations = UsuarioPorGrupo & UsuarioPorGrupoRelations;
