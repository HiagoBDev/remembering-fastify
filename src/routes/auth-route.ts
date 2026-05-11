import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth-controller";


export async function authRoute(app:FastifyInstance) {
  const controller = authController(app)

  app.post("/auth/register", controller.register)
  app.post("/auth/login", controller.login)
}