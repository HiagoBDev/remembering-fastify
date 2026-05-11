import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { env } from '../lib/env'

async function jwt(app: FastifyInstance) {
  app.register(require('@fastify/jwt'), {
    secret: env.JWT_SECRET,
  })
}

export const jwtPlugin = fp(jwt)