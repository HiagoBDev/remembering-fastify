import { prisma } from "../lib/prisma";
import { CreateProductDTO, FindAllFilters, UpdateProductDTO } from "../schemas/product-schema";


export async function findAllProducts(filters: FindAllFilters = {}) {
  return prisma.product.findMany({
    where: {
      categoryId: filters.categoryId,
      price: {
        gte: filters.minPrice,
        lte: filters.maxPrice,
      },
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' }
  })
}

export async function findProductById(id: string) {
  return prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  })
}

export async function createProduct(data:CreateProductDTO) {
  return prisma.product.create({
    data,
    include: {
      category: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
}

export async function updateProduct(id: string, data:UpdateProductDTO) {
  return prisma.product.update({
    where: { id },
    data,
    include: {
      category: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  })
}