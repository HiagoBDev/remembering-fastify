import fastify from 'fastify'
import { AppError } from './utils/app-error'
import { jwtPlugin } from './plugins/jwt'
import { swaggerPlugin } from './plugins/swagger'
import { healthRoute } from './routes/health'
import { authRoute } from './routes/auth-route'
import { productRoute } from './routes/product-route'

export const app = fastify({
  logger: true,
})

app.register(jwtPlugin)
app.register(swaggerPlugin)

app.register(healthRoute)
app.register(authRoute)
app.register(productRoute)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: error.message,
    })
  }

  app.log.error(error)
  return reply.status(500).send({
    error: 'Erro interno do servidor',
  })
})