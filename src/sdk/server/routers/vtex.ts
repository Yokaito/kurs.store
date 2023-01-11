import env from '@/sdk/env'
import { publicProcedure, router } from '../trpc'
import { z } from 'zod'

const vtexBaseUrl = `https://${env.vtex.store.storeId}.${env.vtex.store.environment}.com.br`
const getProductUrl = `${vtexBaseUrl}/api/io/_v/api/intelligent-search/product_search/`

export const vtex = router({
  product: publicProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams({
        locale: 'pt-BR',
        query: `product:${input.productId}`,
        page: '1',
        count: '1',
      })

      const response = await fetch(`${getProductUrl}?${params.toString()}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())

      return {
        ...response,
      }
    }),
})
