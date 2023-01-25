import type * as T from '@/platforms/vtex/clients/search/types'

interface Product {
  productId: string
  name: string
}

export const normalizers = () => {
  const productVtex = (product: T.Product): Product => {
    const convertedProduct: Product = {
      productId: product.productId,
      name: product.productName,
    }

    return convertedProduct as Product
  }

  return {
    vtex: {
      product: productVtex,
    },
  }
}
