import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

async function swagger(app: FastifyInstance) {
  app.register(require('@fastify/swagger'), {
    openapi: {
      info: {
        title: 'Fastify Study API',
        version: '1.0.0',
      },
    },
  })

  app.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
  })
}

export const swaggerPlugin = fp(swagger)