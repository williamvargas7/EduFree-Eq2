import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Grupo, UsuarioPorGrupo, Perfil} from '../models';
import {UsuarioPorGrupoRepository} from './usuario-por-grupo.repository';
import {GrupoRepository} from './grupo.repository';
import {PerfilRepository} from './perfil.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly grupos: HasManyThroughRepositoryFactory<Grupo, typeof Grupo.prototype.id,
          UsuarioPorGrupo,
          typeof Usuario.prototype.id
        >;

  public readonly perfil: BelongsToAccessor<Perfil, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('UsuarioPorGrupoRepository') protected usuarioPorGrupoRepositoryGetter: Getter<UsuarioPorGrupoRepository>, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>, @repository.getter('PerfilRepository') protected perfilRepositoryGetter: Getter<PerfilRepository>,
  ) {
    super(Usuario, dataSource);
    this.perfil = this.createBelongsToAccessorFor('perfil', perfilRepositoryGetter,);
    this.registerInclusionResolver('perfil', this.perfil.inclusionResolver);
    this.grupos = this.createHasManyThroughRepositoryFactoryFor('grupos', grupoRepositoryGetter, usuarioPorGrupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
  }
}
