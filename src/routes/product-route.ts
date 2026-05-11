import { FastifyInstance } from "fastify";
import { productController } from "../controllers/product-controller";
import { authMiddleware } from "../middlewares/auth-middleware";


export async function productRoute(app: FastifyInstance) {
  const controller = productController(app)

  app.get('/products', controller.getAll)
  app.get('/products/:id', controller.getById)

  app.post('/products', { preHandler: authMiddleware }, controller.create)
  app.put('/products/:id', { preHandler: authMiddleware }, controller.update)
  app.delete('/products/:id', { preHandler: authMiddleware }, controller.remove)
}