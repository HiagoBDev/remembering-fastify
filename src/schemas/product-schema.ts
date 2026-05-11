import z from "zod";


export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  stock: z.number().int().min(0).default(0),
  categoryId: z.uuid()
})

export const updateProductSchema =  z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  stock: z.number().int().min(0).optional(),
  categoryId: z.uuid().optional(),
})

export const productParamsSchema = z.object({
  id: z.uuid()
})

export const productQuerySchema = z.object({
  categoryId: z.uuid().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
})

export type CreateProductDTO = z.infer<typeof createProductSchema>
export type UpdateProductDTO = z.infer<typeof updateProductSchema>
export type FindAllFilters = z.infer<typeof productQuerySchema>
