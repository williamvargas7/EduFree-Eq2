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
  Grupos,
  Asignatura,
} from '../models';
import {GruposRepository} from '../repositories';

export class GruposAsignaturaController {
  constructor(
    @repository(GruposRepository) protected gruposRepository: GruposRepository,
  ) { }

  @get('/grupos/{id}/asignatura', {
    responses: {
      '200': {
        description: 'Grupos has one Asignatura',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Asignatura),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Asignatura>,
  ): Promise<Asignatura> {
    return this.gruposRepository.asignatura(id).get(filter);
  }

  @post('/grupos/{id}/asignatura', {
    responses: {
      '200': {
        description: 'Grupos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Asignatura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Grupos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {
            title: 'NewAsignaturaInGrupos',
            exclude: ['id'],
            optional: ['gruposId']
          }),
        },
      },
    }) asignatura: Omit<Asignatura, 'id'>,
  ): Promise<Asignatura> {
    return this.gruposRepository.asignatura(id).create(asignatura);
  }

  @patch('/grupos/{id}/asignatura', {
    responses: {
      '200': {
        description: 'Grupos.Asignatura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asignatura, {partial: true}),
        },
      },
    })
    asignatura: Partial<Asignatura>,
    @param.query.object('where', getWhereSchemaFor(Asignatura)) where?: Where<Asignatura>,
  ): Promise<Count> {
    return this.gruposRepository.asignatura(id).patch(asignatura, where);
  }

  @del('/grupos/{id}/asignatura', {
    responses: {
      '200': {
        description: 'Grupos.Asignatura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Asignatura)) where?: Where<Asignatura>,
  ): Promise<Count> {
    return this.gruposRepository.asignatura(id).delete(where);
  }
}
