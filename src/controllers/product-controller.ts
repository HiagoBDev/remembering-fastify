import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createProductSchema, productParamsSchema, productQuerySchema, updateProductSchema } from "../schemas/product-schema";
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from "../services/product-service";


export function productController(_app: FastifyInstance) {
  async function getAll(request: FastifyRequest, reply: FastifyReply) {
    const body = productQuerySchema.parse(request.query)
    const products = await getAllProductsService(body)
    return reply.status(200).send(products)
  }
  async function getById(request:FastifyRequest, reply: FastifyReply) {
    const { id } = productParamsSchema.parse(request.params)
    const product = await getProductByIdService(id)
    return reply.status(200).send(product)
  }
  async function create(request:FastifyRequest, reply: FastifyReply) {
    const body = createProductSchema.parse(request.body)
    const product = await createProductService(body)
    return reply.status(201).send(product)
  }
  async function update(request:FastifyRequest, reply: FastifyReply) {
    const { id } = productParamsSchema.parse(request.params)
    const body = updateProductSchema.parse(request.body)
    const product = await updateProductService(id, body)
    return reply.status(200).send(product)
  }
  async function remove(request: FastifyRequest, reply: FastifyReply) {
    const { id } = productParamsSchema.parse(request.params)
    await deleteProductService(id)
    return reply.status(204).send()
  }

  return { getAll, getById, create, update, remove }
}