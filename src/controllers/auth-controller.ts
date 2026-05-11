import { FastifyInstance, FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import { loginSchema, registerSchema } from "../schemas/auth-schema";
import { loginService, registerService } from "../services/auth-service";


export function authController(app: FastifyInstance) {
  async function register(request: FastifyRequest, reply: FastifyReply) {
    const body = registerSchema.parse(request.body)
    const user = await registerService(body)
    return reply.status(201).send(user)
  }
  async function login(request: FastifyRequest, reply: FastifyReply) {
    const body = loginSchema.parse(request.body)
    const result = await loginService(body, app)
    return reply.status(200).send(result)
  }

  return { register, login }
}