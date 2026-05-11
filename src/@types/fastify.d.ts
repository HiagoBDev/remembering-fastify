import { FastifyRequest } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    jwt: import('@fastify/jwt').JWT
  }

  interface FastifyRequest {
    jwtVerify: () => Promise<void>
    user: { sub: string }
  }
}