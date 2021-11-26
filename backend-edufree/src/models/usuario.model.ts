import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Grupo} from './grupo.model';
import {Perfil} from './perfil.model';
import {UsuarioPorGrupo} from './usuario-por-grupo.model';

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
  nombresUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidosUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoIdentificacion: string;

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
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  programaAcademicoId: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

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
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @belongsTo(() => Perfil)
  perfilId: string;

  @hasMany(() => Grupo, {through: {model: () => UsuarioPorGrupo}})
  grupos: Grupo[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
