import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Asignatura} from './asignatura.model';
import {Usuario} from './usuario.model';
import {UsuarioPorGrupo} from './usuario-por-grupo.model';

@model()
export class Grupos extends Entity {
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
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidad: number;

  @property({
    type: 'string',
    required: true,
  })
  idPrograma: string;

  @property({
    type: 'string',
    required: true,
  })
  idDocente: string;

  @property({
    type: 'string',
  })
  asignaturaId?: string;

  @hasOne(() => Asignatura)
  asignatura: Asignatura;

  @hasMany(() => Usuario, {through: {model: () => UsuarioPorGrupo}})
  usuarios: Usuario[];

  constructor(data?: Partial<Grupos>) {
    super(data);
  }
}

export interface GruposRelations {
  // describe navigational properties here
}

export type GruposWithRelations = Grupos & GruposRelations;
