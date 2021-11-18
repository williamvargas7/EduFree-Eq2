import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {UsuarioPorGrupo} from '../models';
import {UsuarioPorGrupoRepository} from '../repositories';

export class UsuarioPorGrupoController {
  constructor(
    @repository(UsuarioPorGrupoRepository)
    public usuarioPorGrupoRepository : UsuarioPorGrupoRepository,
  ) {}

  @post('/usuarios-por-grupo')
  @response(200, {
    description: 'UsuarioPorGrupo model instance',
    content: {'application/json': {schema: getModelSchemaRef(UsuarioPorGrupo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPorGrupo, {
            title: 'NewUsuarioPorGrupo',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarioPorGrupo: Omit<UsuarioPorGrupo, 'id'>,
  ): Promise<UsuarioPorGrupo> {
    return this.usuarioPorGrupoRepository.create(usuarioPorGrupo);
  }

  @get('/usuarios-por-grupo/count')
  @response(200, {
    description: 'UsuarioPorGrupo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UsuarioPorGrupo) where?: Where<UsuarioPorGrupo>,
  ): Promise<Count> {
    return this.usuarioPorGrupoRepository.count(where);
  }

  @get('/usuarios-por-grupo')
  @response(200, {
    description: 'Array of UsuarioPorGrupo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UsuarioPorGrupo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UsuarioPorGrupo) filter?: Filter<UsuarioPorGrupo>,
  ): Promise<UsuarioPorGrupo[]> {
    return this.usuarioPorGrupoRepository.find(filter);
  }

  @patch('/usuarios-por-grupo')
  @response(200, {
    description: 'UsuarioPorGrupo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPorGrupo, {partial: true}),
        },
      },
    })
    usuarioPorGrupo: UsuarioPorGrupo,
    @param.where(UsuarioPorGrupo) where?: Where<UsuarioPorGrupo>,
  ): Promise<Count> {
    return this.usuarioPorGrupoRepository.updateAll(usuarioPorGrupo, where);
  }

  @get('/usuarios-por-grupo/{id}')
  @response(200, {
    description: 'UsuarioPorGrupo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UsuarioPorGrupo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UsuarioPorGrupo, {exclude: 'where'}) filter?: FilterExcludingWhere<UsuarioPorGrupo>
  ): Promise<UsuarioPorGrupo> {
    return this.usuarioPorGrupoRepository.findById(id, filter);
  }

  @patch('/usuarios-por-grupo/{id}')
  @response(204, {
    description: 'UsuarioPorGrupo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UsuarioPorGrupo, {partial: true}),
        },
      },
    })
    usuarioPorGrupo: UsuarioPorGrupo,
  ): Promise<void> {
    await this.usuarioPorGrupoRepository.updateById(id, usuarioPorGrupo);
  }

  @put('/usuarios-por-grupo/{id}')
  @response(204, {
    description: 'UsuarioPorGrupo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarioPorGrupo: UsuarioPorGrupo,
  ): Promise<void> {
    await this.usuarioPorGrupoRepository.replaceById(id, usuarioPorGrupo);
  }

  @del('/usuarios-por-grupo/{id}')
  @response(204, {
    description: 'UsuarioPorGrupo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioPorGrupoRepository.deleteById(id);
  }
}
