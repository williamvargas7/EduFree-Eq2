import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Asignatura,
  Grupos,
} from '../models';
import {AsignaturaRepository} from '../repositories';

export class AsignaturaGruposController {
  constructor(
    @repository(AsignaturaRepository) protected asignaturaRepository: AsignaturaRepository,
  ) { }

  @get('/asignaturas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Array of Asignatura has many Grupos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Grupos>,
  ): Promise<Grupos[]> {
    return this.asignaturaRepository.grupos(id).find(filter);
  }

  @post('/asignaturas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Asignatura model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grupos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Asignatura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupos, {
            title: 'NewGruposInAsignatura',
            exclude: ['id'],
            optional: ['asignaturaId']
          }),
        },
      },
    }) grupos: Omit<Grupos, 'id'>,
  ): Promise<Grupos> {
    return this.asignaturaRepository.grupos(id).create(grupos);
  }

  @patch('/asignaturas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Asignatura.Grupos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grupos, {partial: true}),
        },
      },
    })
    grupos: Partial<Grupos>,
    @param.query.object('where', getWhereSchemaFor(Grupos)) where?: Where<Grupos>,
  ): Promise<Count> {
    return this.asignaturaRepository.grupos(id).patch(grupos, where);
  }

  @del('/asignaturas/{id}/grupos', {
    responses: {
      '200': {
        description: 'Asignatura.Grupos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grupos)) where?: Where<Grupos>,
  ): Promise<Count> {
    return this.asignaturaRepository.grupos(id).delete(where);
  }
}
