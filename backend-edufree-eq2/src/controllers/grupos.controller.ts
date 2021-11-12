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
import {Grupos} from '../models';
import {GruposRepository} from '../repositories';

export class GruposController {
  constructor(
    @repository(GruposRepository)
    public gruposRepository : GruposRepository,
  ) {}

  @post('/grupos')
  @response(200, {
    description: 'Grupos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Grupos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupos, {
            title: 'NewGrupos',
            exclude: ['id'],
          }),
        },
      },
    })
    grupos: Omit<Grupos, 'id'>,
  ): Promise<Grupos> {
    return this.gruposRepository.create(grupos);
  }

  @get('/grupos/count')
  @response(200, {
    description: 'Grupos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Grupos) where?: Where<Grupos>,
  ): Promise<Count> {
    return this.gruposRepository.count(where);
  }

  @get('/grupos')
  @response(200, {
    description: 'Array of Grupos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Grupos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Grupos) filter?: Filter<Grupos>,
  ): Promise<Grupos[]> {
    return this.gruposRepository.find(filter);
  }

  @patch('/grupos')
  @response(200, {
    description: 'Grupos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupos, {partial: true}),
        },
      },
    })
    grupos: Grupos,
    @param.where(Grupos) where?: Where<Grupos>,
  ): Promise<Count> {
    return this.gruposRepository.updateAll(grupos, where);
  }

  @get('/grupos/{id}')
  @response(200, {
    description: 'Grupos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Grupos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Grupos, {exclude: 'where'}) filter?: FilterExcludingWhere<Grupos>
  ): Promise<Grupos> {
    return this.gruposRepository.findById(id, filter);
  }

  @patch('/grupos/{id}')
  @response(204, {
    description: 'Grupos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupos, {partial: true}),
        },
      },
    })
    grupos: Grupos,
  ): Promise<void> {
    await this.gruposRepository.updateById(id, grupos);
  }

  @put('/grupos/{id}')
  @response(204, {
    description: 'Grupos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() grupos: Grupos,
  ): Promise<void> {
    await this.gruposRepository.replaceById(id, grupos);
  }

  @del('/grupos/{id}')
  @response(204, {
    description: 'Grupos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gruposRepository.deleteById(id);
  }
}
