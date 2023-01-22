import type * as T from '@/platforms/vtex/clients/search/types'

interface Product {
  productId: string
}

export const normalizers = () => {
  const productVtex = (product: T.Product): Product => {
    const convertedProduct: Product = {
      productId: product.items[0].itemId,
    }

    return convertedProduct as Product
  }

  return {
    vtex: {
      product: productVtex,
    },
  }
}
