import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Grupos, GruposRelations, Asignatura, Usuario, UsuarioPorGrupo} from '../models';
import {AsignaturaRepository} from './asignatura.repository';
import {UsuarioPorGrupoRepository} from './usuario-por-grupo.repository';
import {UsuarioRepository} from './usuario.repository';

export class GruposRepository extends DefaultCrudRepository<
  Grupos,
  typeof Grupos.prototype.id,
  GruposRelations
> {

  public readonly asignatura: HasOneRepositoryFactory<Asignatura, typeof Grupos.prototype.id>;

  public readonly usuarios: HasManyThroughRepositoryFactory<Usuario, typeof Usuario.prototype.id,
          UsuarioPorGrupo,
          typeof Grupos.prototype.id
        >;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('AsignaturaRepository') protected asignaturaRepositoryGetter: Getter<AsignaturaRepository>, @repository.getter('UsuarioPorGrupoRepository') protected usuarioPorGrupoRepositoryGetter: Getter<UsuarioPorGrupoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Grupos, dataSource);
    this.usuarios = this.createHasManyThroughRepositoryFactoryFor('usuarios', usuarioRepositoryGetter, usuarioPorGrupoRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.asignatura = this.createHasOneRepositoryFactoryFor('asignatura', asignaturaRepositoryGetter);
    this.registerInclusionResolver('asignatura', this.asignatura.inclusionResolver);
  }
}
