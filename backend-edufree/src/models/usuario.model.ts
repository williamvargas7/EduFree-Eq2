import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Grupo} from './grupo.model';
import {UsuarioPorGrupo} from './usuario-por-grupo.model';
import {Perfil} from './perfil.model';

@model()
export class Usuario extends Entity {
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
  codigoUniversitario: string;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasenia: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoDocumento: string;

  @property({
    type: 'string',
    required: true,
  })
  noIdentificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  correoElectronico: string;

  @property({
    type: 'string',
    required: true,
  })
  programaAcademico: string;

  @property({
    type: 'string',
    required: true,
  })
  idPerfil: string;

  @property({
    type: 'number',
    required: true,
  })
  creditos: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @hasMany(() => Grupo, {through: {model: () => UsuarioPorGrupo}})
  grupos: Grupo[];

  @belongsTo(() => Perfil)
  perfilId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
