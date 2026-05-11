import { prisma } from "../lib/prisma";
import { createProduct, deleteProduct, findAllProducts, findProductById, updateProduct } from "../repositories/product-repository";
import { CreateProductDTO, FindAllFilters, UpdateProductDTO } from "../schemas/product-schema";
import { AppError } from "../utils/app-error";



export async function getAllProductsService(filters: FindAllFilters) {
  return findAllProducts(filters)
}

export async function getProductByIdService(id:string) {
  const product = await findProductById(id)

  if(!product) {
    throw new AppError("Produto não encontrado", 404)
  }

  return product
}

export async function createProductService(data:CreateProductDTO) {
  const category = await prisma.category.findUnique({
    where: { id: data.categoryId },
  })

  if(!category) {
    throw new AppError("A categoria selecionada para o produto não foi encontrada", 404)
  }

  return createProduct(data)
}

export async function updateProductService(id:string, data:UpdateProductDTO) {
  const product = await findProductById(id)

  if(!product){
    throw new AppError("O produto não foi encontrado", 404)
  }

  if(data.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    })
    if(!category) {
      throw new AppError("A categoria selecionada para o produto não foi encontrada", 404)
    }
  }
  
  return updateProduct(id, data)
}

export async function deleteProductService(id:string) {
  const product = await findProductById(id)
  if(!product) {
    throw new AppError("Produto não encontrado", 404)
  }

  return deleteProduct(id)
}

